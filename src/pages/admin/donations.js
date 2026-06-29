import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/admin.module.css';

export default function DonationsPage() {
  const [donations, setDonations] = useState([]);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin');
      return; // Stop the rest of the code from running
    }
    
    
    fetch('/api/donations')
      .then(res => res.json())
      .then(setDonations);
      }, [isAuthenticated, router]);
      

      if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <h1>Donations</h1>
      
      <table className={styles.table}>
        <thead>
          <tr><th>Donor</th><th>Amount</th><th>Method</th><th>Date</th></tr>
        </thead>
        <tbody>
          {donations.map((d) => (
            <tr key={d.id}>
              <td>{d.donor?.name || 'N/A'}</td>
              <td>${d.amount}</td>
              <td>{d.paymentMethod}</td>
              <td>{new Date(d.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </AdminLayout>

  );
}