import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/admin.module.css';

export default function EmailsPage() {
  const [subscribers, setSubscribers] = useState([]);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Auth Guard
    if (!isAuthenticated) {
      router.push('/admin');
      return;
    }

    // Fetch data only if authenticated
    fetch('/api/subscribers')
      .then(res => res.json())
      .then(setSubscribers)
      .catch(err => console.error("Failed to fetch subscribers:", err));
  }, [isAuthenticated, router]);

  // Don't render until authentication is confirmed
  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <h1>Email Subscribers</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Date Subscribed</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((s) => (
            <tr key={s.id}>
              <td>{s.email}</td>
              <td>{new Date(s.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}