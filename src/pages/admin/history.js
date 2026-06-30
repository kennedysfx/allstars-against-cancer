import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/admin.module.css';
import dynamic from 'next/dynamic'; // 1. Import Next's dynamic tool

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin');
      return;
    }

    const fetchData = async () => {
      try {
        const [donations, giftCards, subscribers] = await Promise.all([
          fetch('/api/donations').then(res => res.json()),
          fetch('/api/gift-card-donations').then(res => res.json()),
          fetch('/api/subscribers').then(res => res.json())
        ]);
        
        const allEvents = [
          ...donations.map(d => ({ type: 'Donation', detail: `Received $${d.amount}`, date: d.date })),
          ...giftCards.map(g => ({ type: 'GiftCard', detail: `Status: ${g.status} ($${g.amount})`, date: g.createdAt })),
          ...subscribers.map(s => ({ type: 'Subscriber', detail: `New email: ${s.email}`, date: s.createdAt }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        setHistory(allEvents);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <h1>Activity History</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="3">Loading...</td></tr>
          ) : history.length > 0 ? (
            history.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.type}</td>
                <td>{item.detail}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3">No history found.</td></tr>
          )}
        </tbody>
      </table>
    </AdminLayout>
  );
}

// 2. Export the page with SSR completely disabled
export default dynamic(() => Promise.resolve(HistoryPage), { ssr: false });