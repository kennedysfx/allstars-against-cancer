import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';       
import { useAuth } from '../context/AuthContext';
import styles from '../styles/admin.module.css';

export default function AdminLayout({ children }) {
  // Start open on large screens, closed on mobile
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { setIsAuthenticated } = useAuth();   
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);                
    router.push('/admin');                  
  };

  if (!mounted) return null;

  return (
    <div className={styles.adminLayoutContainer}>
      
      {/* 1. SIDEBAR (Side-by-side, no overlay) */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarInner}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>Admin Panel</h2>
            {/* Collapse icon at the top right of the sidebar */}
            <button className={styles.collapseBtn} onClick={() => setIsOpen(false)} title="Collapse menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </button>
          </div>
          
          <nav className={styles.nav}>
            <Link href="/admin" className={styles.navLink}>Dashboard</Link>
            <Link href="/admin/donations" className={styles.navLink}>Crypto</Link>
            <Link href="/admin/gift-cards" className={styles.navLink}>Gift Cards</Link>
            <Link href="/admin/emails" className={styles.navLink}>Email Subscribers</Link>
            <Link href="/admin/history" className={styles.navLink}>History</Link>
          </nav>

          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT (Expands when sidebar collapses) */}
      <main className={styles.mainContent}>
        
        {/* Open Hamburger Menu - Only shows when sidebar is closed */}
        {!isOpen && (
          <button className={styles.hamburgerBtn} onClick={() => setIsOpen(true)} title="Expand menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}

        <div className={`${styles.contentWrapper} ${!isOpen ? styles.contentWithHamburgerSpace : ''}`}>
          {children}
        </div>
      </main>
      
    </div>
  );
}