import { useEffect, useState } from 'react';
import styles from '../styles/admin.module.css';

export default function AdminPage() {
  const [donations, setDonations] = useState([]);
  const [subscribers, setSubscribers] = useState([]); // State for subscribers
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [giftCardDonations, setGiftCardDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [declineTarget, setDeclineTarget] = useState(null);
  const [selectedReason, setSelectedReason] = useState("Invalid or Used Code");

  // 1. Updated this function to receive the form event (e)
  const checkPassword = async (e) => {
    e.preventDefault(); // <-- Prevents Enter key from reloading your page
    
    const res = await fetch('/api/check-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }), // Sends the password to our new API route
    });

    const data = await res.json();

    if (data.success) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

 const handleGiftCardAction = async (id, status, reason = null) => {
  const res = await fetch('/api/update-donation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status, declineReason: reason }),
  });

  const data = await res.json();

  if (data.success) {
    alert(`Donation ${status.toLowerCase()} successfully.`);
    setDeclineTarget(null); // Reset the view
    setGiftCardDonations(prev => 
      prev.map(g => g.id === id ? { ...g, status: status } : g)
    );
  } else {
    alert(`Failed to update: ${data.message}`);
  }
};


 useEffect(() => {
    if (isAuthenticated) {
      // 2. Fetch all data at once to be efficient
      Promise.all([
        fetch('/api/donations').then(res => res.json()),
        fetch('/api/subscribers').then(res => res.json()),
        fetch('/api/gift-card-donations').then(res => res.json())
      ])
      .then(([d, s, g]) => {
        setDonations(d);
        setSubscribers(s);
        setGiftCardDonations(g);
      })
      .catch(err => console.error("Fetch error:", err))
      .finally(() => setIsLoading(false)); // 3. Turn off loading when finished
    } else {
      setIsLoading(false); // Stop loading if not even logged in
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div className={styles.container}><h1>Loading Dashboard Data...</h1></div>;
  }

  if (!isAuthenticated) {
    return (
      // 2. Swapped the wrapper div here to a <form> element hooked to your checkPassword submit handler
      <form onSubmit={checkPassword} className={styles.loginBox}>
        <h1>ADMIN ACCESS</h1>
        <input 
          type="password" 
          placeholder="ENTER AUTHORIZATION KEY" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {/* 3. Changed this to type="submit" so hitting Enter fires the form action */}
        <button type="submit">Login</button>
      </form>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.adminGreeting}>Welcome, Admin Kennedy</h2>
      <h1>Donation Dashboard</h1>
      <table className={styles.table}>
         <thead>
          <tr>
            <th>Donor Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(donations) && donations.map((d) => (
            <tr key={d.id}>
              <td>{d.donor?.name || 'N/A'}</td>
              <td>{d.donor?.email || 'N/A'}</td>
              <td>${d.amount}</td>
              <td>{d.paymentMethod}</td>
              <td>{new Date(d.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>


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
    {Array.isArray(giftCardDonations) && giftCardDonations.map((g) => (
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
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#000;">
              <img src="${g.imageUrl}" style="max-width:100%; max-height:100%;" />
            </body>
          </html>
        `);
      }
    }}
    style={{
      color: 'blue',
      textDecoration: 'underline',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0
    }}
  >
    View Snapshot
  </button>
</td>
       <td>
  {g.status === 'PENDING' ? (
    declineTarget === g.id ? (
      // DECLINE MODE: Show dropdown and confirm button
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <select onChange={(e) => setSelectedReason(e.target.value)} style={{ padding: '5px' }}>
          <option value="Invalid or Used Code">Invalid or Used Code</option>
          <option value="Already Redeemed">Already Redeemed</option>
          <option value="Security/Fraud Flag">Security/Fraud Flag</option>
          <option value="Unsupported Image Content">Unsupported Image Content</option>
        </select>
        <button 
          onClick={() => handleGiftCardAction(g.id, 'DECLINED', selectedReason)} 
          className={styles.declineBtn}
        >
          Confirm Decline
        </button>
      </div>
    ) : (
      // NORMAL MODE: Show Approve and Decline buttons
      <div style={{ display: 'flex', gap: '5px' }}>
        <button onClick={() => handleGiftCardAction(g.id, 'APPROVED')} className={styles.approveBtn}>Approve</button>
        <button onClick={() => setDeclineTarget(g.id)} className={styles.declineBtn}>Decline</button>
      </div>
    )
  ) : (
    <strong>{g.status}</strong>
  )}
</td>
      </tr>
    ))}
  </tbody>
</table>



      <h1>Email Subscribers</h1>
      <table className={`${styles.table} ${styles.subscriberTable}`}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Date Subscribed</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(subscribers) && subscribers.map((s) => (
            <tr key={s.id}>
              <td>{s.email}</td>
              <td>{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}