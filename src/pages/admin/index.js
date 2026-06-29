import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext'; // 1. Import the hook
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/admin.module.css';

export default function AdminDashboard() {
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // 2. Use global state
  const [password, setPassword] = useState('');
  const router = useRouter();

  const checkPassword = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/check-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      setIsAuthenticated(true); // 3. Updates global state, unlocking all other pages
      alert('Login successful!');
    } else {
      alert('Incorrect password');
    }
  };

  // If not authenticated, show the login form
  if (!isAuthenticated) {
    return (
      <form onSubmit={checkPassword} className={styles.loginBox}>
        <h1>ADMIN ACCESS</h1>
        <input 
          type="password" 
          placeholder="ENTER AUTHORIZATION KEY" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
    );
  }

  // If authenticated, show the dashboard
  return (
    <AdminLayout>
      <div className={styles.container}>
        <h2 className={styles.adminGreeting}>Welcome, Admin Kennedy</h2>
        <h1>This Hussle is Blessed</h1>
        <p>In Jesus name, Amen</p>
        
        <div style={{ marginTop: '20px', padding: '20px', background: '#fff', borderRadius: '8px' }}>
            <h3>System Status</h3>
            <p>All systems operational.</p>
        </div>
      </div>
    </AdminLayout>
  );
}