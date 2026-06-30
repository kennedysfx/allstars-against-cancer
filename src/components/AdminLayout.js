import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';       
import { useAuth } from '../context/AuthContext';
import styles from '../styles/admin.module.css';

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setIsAuthenticated } = useAuth();   
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);


  const handleLogout = () => {
    setIsAuthenticated(false);                
    router.push('/admin');                   
  };

  return (
    <div className={styles.adminLayoutContainer}>
  
      {!isOpen && (
        <div className={styles.hamburger} onClick={() => setIsOpen(true)}>
          <div className={styles.line} />
          <div className={styles.lineLong} />
          <div className={styles.line} />
        </div>
      )}

      {/* 2. Sidebar Overlay (Visible when open) */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      {/* 3. Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Admin Panel</h2>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>x</button>
        </div>
        
        <nav className={styles.nav} onClick={() => setIsOpen(false)}>
          <Link href="/admin" className={styles.navLink}>Dashboard</Link>
          <Link href="/admin/donations" className={styles.navLink}>Donations</Link>
          <Link href="/admin/gift-cards" className={styles.navLink}>Gift Cards</Link>
          <Link href="/admin/emails" className={styles.navLink}>Email Subscribers</Link>
          <Link href="/admin/history" className={styles.navLink}>History</Link>
        </nav>

        <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        
      </aside>

      <main className={styles.mainContent}>{children}</main>
    </div>
  
  );
}