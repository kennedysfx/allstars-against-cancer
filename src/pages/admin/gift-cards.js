import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/admin.module.css';

export default function GiftCardsPage() {
  const [giftCards, setGiftCards] = useState([]);
  const [declineTarget, setDeclineTarget] = useState(null);
  const [selectedReason, setSelectedReason] = useState("Invalid or Used Code");
  
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. Auth Guard
    if (!isAuthenticated) {
      router.push('/admin');
      return;
    }

    // 2. Fetch data only if authenticated
    fetch('/api/gift-card-donations')
      .then(res => res.json())
      .then(setGiftCards)
      .catch(err => console.error("Error fetching gift cards:", err));
  }, [isAuthenticated, router]);

  const handleGiftCardAction = async (id, status, reason = null) => {
    const res = await fetch('/api/update-donation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, declineReason: reason }),
    });

    const data = await res.json();
    if (data.success) {
      alert(`Donation ${status.toLowerCase()} successfully.`);
      setDeclineTarget(null);
      setGiftCards(prev => prev.map(g => g.id === id ? { ...g, status: status } : g));
    } else {
      alert(`Failed to update: ${data.message}`);
    }
  };

  // 3. Prevent rendering until auth is confirmed
  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <h1>Gift Card Verification</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Donor</th>
            <th>Email</th>
            <th>Card Type</th>
            <th>Amount</th>
            <th>Snapshot</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {giftCards.map((g) => (
            <tr key={g.id}>
              <td>{g.donorName}</td>
              <td>{g.donorEmail}</td>
              <td>{g.cardType}</td>
              <td>${g.amount}</td>
              <td>
                <button 
                  type="button" 
                  onClick={() => {
                    const newWindow = window.open("", "_blank");
                    newWindow?.document.write(`<img src="${g.imageUrl}" style="max-width:100%" />`);
                  }} 
                  className={styles.linkButton}
                >
                  View Snapshot
                </button>
              </td>
              <td>
                {g.status === 'PENDING' ? (
                  declineTarget === g.id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <select onChange={(e) => setSelectedReason(e.target.value)}>
                        <option value="Invalid or Used Code">Invalid or Used Code</option>
                        <option value="Already Redeemed">Already Redeemed</option>
                        <option value="Security/Fraud Flag">Security/Fraud Flag</option>
                      </select>
                      <button 
                        onClick={() => handleGiftCardAction(g.id, 'DECLINED', selectedReason)} 
                        className={styles.declineBtn}
                      >
                        Confirm
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button onClick={() => handleGiftCardAction(g.id, 'APPROVED')} className={styles.approveBtn}>Approve</button>
                      <button onClick={() => setDeclineTarget(g.id)} className={styles.declineBtn}>Decline</button>
                    </div>
                  )
                ) : <strong>{g.status}</strong>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
