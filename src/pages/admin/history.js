import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/admin.module.css';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. Auth Guard
    if (!isAuthenticated) {
      router.push('/admin');
      return;
    }

    // 2. Fetch all logs
    Promise.all([
      fetch('/api/donations').then(res => res.json()),
      fetch('/api/gift-card-donations').then(res => res.json()),
      fetch('/api/subscribers').then(res => res.json())
    ]).then(([donations, giftCards, subscribers]) => {
      
      const allEvents = [
        ...donations.map(d => ({ type: 'Donation', detail: `Received $${d.amount}`, date: d.date })),
        ...giftCards.map(g => ({ type: 'GiftCard', detail: `Status: ${g.status} ($${g.amount})`, date: g.createdAt })),
        ...subscribers.map(s => ({ type: 'Subscriber', detail: `New email: ${s.email}`, date: s.createdAt }))
      ].sort((a, b) => new Date(b.date) - new Date(a.date));

      setHistory(allEvents);
    }).catch(err => console.error("Failed to fetch history:", err));
  }, [isAuthenticated, router]);

  // 3. Prevent rendering until auth is confirmed
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
          {history.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.type}</td>
              <td>{item.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}