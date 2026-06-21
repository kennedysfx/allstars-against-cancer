import { useEffect, useState } from 'react';
import styles from '../styles/admin.module.css';

export default function AdminPage() {
  const [donations, setDonations] = useState([]);
  const [subscribers, setSubscribers] = useState([]); // State for subscribers
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

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

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch both sets of data
      fetch('/api/donations')
        .then((res) => res.json())
        .then((data) => setDonations(data))
        .catch((err) => console.error("Donation fetch error:", err));

      // Inside your useEffect in admin.js
      fetch('/api/subscribers')
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Server returned ${res.status}: ${errorText}`);
          }
          return res.json();
        })
        .then((data) => setSubscribers(data))
        .catch((err) => console.error("Subscriber fetch error:", err));
    }
  }, [isAuthenticated]);

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
          {donations.map((d) => (
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

      <h1>Email Subscribers</h1>
      <table className={`${styles.table} ${styles.subscriberTable}`}>
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
              <td>{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}