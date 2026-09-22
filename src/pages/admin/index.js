import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext'; 
import AdminLayout from '../../components/AdminLayout';
import styles from './index.module.css'; // Make sure this points to your new CSS file

export default function AdminDashboard() {
  const { isAuthenticated, setIsAuthenticated } = useAuth(); 
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // State for Rebranded UI Data
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Authentication and Hydration effect
  useEffect(() => {
    setMounted(true); 
    if (!isAuthenticated) {
      setPassword(''); 
    }
  }, [isAuthenticated]);

  // 2. Fetch REAL Data from your existing API endpoints
  useEffect(() => {
    if (mounted && isAuthenticated) {
      const loadDashboardData = async () => {
        setIsLoading(true);
        try {
          // Fetch all data concurrently
          const [cryptoRes, giftRes, emailRes] = await Promise.all([
            fetch('/api/donations').then(res => res.json()).catch(() => []),
            fetch('/api/gift-card-donations').then(res => res.json()).catch(() => []),
            fetch('/api/subscribers').then(res => res.json()).catch(() => [])
          ]);

          // Safely ensure data is arrays to prevent .map crashes
          const cryptoData = Array.isArray(cryptoRes) ? cryptoRes : [];
          const giftData = Array.isArray(giftRes) ? giftRes : [];
          const emailData = Array.isArray(emailRes) ? emailRes : [];

          // --- CALCULATE TOTAL STATS ---
          const totalCrypto = cryptoData.reduce((sum, d) => sum + Number(d.amount || 0), 0);
          const totalGiftCards = giftData.length;
          const totalEmails = emailData.length;

          setStats({
            cryptoDonations: { 
              total: `$${totalCrypto.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 
              change: 'Live', linkText: 'See details' 
            },
            giftCardDonations: { 
              total: `${totalGiftCards} cards`, 
              change: 'Live', linkText: 'View summary' 
            },
            emailSubscribers: { 
              total: `${totalEmails} subs`, 
              change: 'Live', linkText: 'Manage list' 
            },
          });

          // --- COMPILE RECENT ACTIVITIES ---
          let allActivities = [];

          // Format Crypto
          cryptoData.forEach(d => {
            allActivities.push({
              type: 'coins',
              text: `Verified ${d.paymentMethod || 'Crypto'} Donation: $${d.amount}`,
              rawDate: new Date(d.date || Date.now()),
              status: 'Completed',
              statusClass: styles.statusBadgeGreen
            });
          });

          // Format Gift Cards
          giftData.forEach(d => {
            let badgeClass = styles.statusBadge;
            let displayStatus = d.status === 'PENDING' ? 'New' : (d.status || 'New');
            
            if(d.status === 'APPROVED') { badgeClass = styles.statusBadgeGreen; displayStatus = 'Approved'; }
            if(d.status === 'DECLINED') { badgeClass = styles.statusBadgeRed; displayStatus = 'Declined'; }
            
            allActivities.push({
              type: 'gift',
              text: `New ${d.cardType || 'Gift'} Card ($${d.amount}) from ${d.donorName || 'Anonymous'}`,
              rawDate: new Date(d.createdAt || d.date || Date.now()),
              status: displayStatus,
              statusClass: badgeClass
            });
          });

          // Format Emails
          emailData.forEach(d => {
            allActivities.push({
              type: 'envelope',
              text: `New subscriber: ${d.email}`,
              rawDate: new Date(d.createdAt || Date.now()),
              status: 'New',
              statusClass: styles.statusBadge
            });
          });

          // Sort all activities by date (newest first)
          allActivities.sort((a, b) => b.rawDate - a.rawDate);

          // Format dates nicely for the table and set the top 5
          const formattedActivities = allActivities.slice(0, 5).map(a => ({
            ...a,
            date: a.rawDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })
          }));

          setActivities(formattedActivities);

        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadDashboardData();
    }
  }, [mounted, isAuthenticated]);

  const checkPassword = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/check-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      setIsAuthenticated(true); 
    } else {
      alert('Incorrect password');
      setPassword('');
    }
  };

  if (!mounted) {
    return null; 
  }

  // --- LOGIN FORM ---
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

  // --- REBRANDED DASHBOARD VIEW (Authenticated) ---
  return (
    <AdminLayout>
      <div className={`${styles.container} ${styles.dashboardMainContainer}`}>
        
        <div className={styles.adminHeaderBox}>
           <h2 className={styles.adminGreeting}>Welcome, Admin Kennedy</h2>
           <h1 className={styles.adminMainHeadline}>This Hustle is Blessed</h1>
           <p className={styles.adminAmenMessage}>In Jesus name, Amen</p>
        </div>

        {isLoading ? (
          <div className={styles.loadingMessage}>Loading real-time data...</div>
        ) : (
          <>
{/* Top 3 Stats Section */}
            <div className={styles.dashboardStatsRow}>
              {stats ? (
                <>
                  <div className={`${styles.statCardBox} ${styles.statCardPurpleActive}`} onClick={() => router.push('/admin/donations')} style={{ cursor: 'pointer' }}>
                     <div className={styles.statCardHeaderInfo}>
                        <div className={styles.statCardIconCircle}>
                          {/* Native Crypto/Coin SVG Icon */}
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                            <path d="M12 18V6"></path>
                          </svg>
                        </div>
                        <div>
                           <h3 className={styles.statCardTitleText}>Crypto Donations</h3>
                           <p className={styles.statCardSubtitleText}>Total wallet value</p>
                        </div>
                     </div>
                     <div className={styles.statCardMainValueText}>{stats.cryptoDonations.total}<span className={styles.statPercentValue}>{stats.cryptoDonations.change}</span></div>
                     <button className={styles.statCardActionButton}>{stats.cryptoDonations.linkText} <i className="fas fa-arrow-right"></i></button>
                  </div>

                  <div className={`${styles.statCardBox}`} onClick={() => router.push('/admin/gift-cards')} style={{ cursor: 'pointer' }}>
                     <div className={styles.statCardHeaderInfo}>
                        <div className={styles.statCardIconCircle}>
                          {/* Native Gift Card/Box SVG Icon */}
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="8" width="18" height="4" rx="1"></rect>
                            <path d="M12 8v13"></path>
                            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
                            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
                          </svg>
                        </div>
                        <div>
                           <h3 className={styles.statCardTitleText}>Gift Card Donations</h3>
                           <p className={styles.statCardSubtitleText}>Total cards submitted</p>
                        </div>
                     </div>
                     <div className={styles.statCardMainValueText}>{stats.giftCardDonations.total}<span className={styles.statPercentValue}>{stats.giftCardDonations.change}</span></div>
                     <button className={styles.statCardActionButton}>{stats.giftCardDonations.linkText} <i className="fas fa-arrow-right"></i></button>
                  </div>

                  <div className={`${styles.statCardBox}`} onClick={() => router.push('/admin/emails')} style={{ cursor: 'pointer' }}>
                     <div className={styles.statCardHeaderInfo}>
                        <div className={styles.statCardIconCircle}>
                          {/* Native Email SVG Icon */}
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                          </svg>
                        </div>
                        <div>
                           <h3 className={styles.statCardTitleText}>Email Subscribers</h3>
                           <p className={styles.statCardSubtitleText}>Total list count</p>
                        </div>
                     </div>
                     <div className={styles.statCardMainValueText}>{stats.emailSubscribers.total}<span className={styles.statPercentValue}>{stats.emailSubscribers.change}</span></div>
                     <button className={styles.statCardActionButton}>{stats.emailSubscribers.linkText} <i className="fas fa-arrow-right"></i></button>
                  </div>
                </>
              ) : (
                <div className={styles.loadingMessage}>Failed to load dashboard statistics.</div>
              )}
            </div>

            {/* Recent Activities Box */}
            <div className={styles.recentActivitiesContainerBox}>
              <div className={styles.recentActivitiesSectionHeader}>
                <h3>Recent Activities</h3>
                <div className={styles.headerControlsWrapper}>
                  <input type="search" placeholder="Search activities..." className={styles.headerSearchInput} />
                  <button className={styles.headerFilterButton}>Filter <i className="fas fa-filter"></i></button>
                </div>
              </div>

              {activities.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table className={styles.recentActivitiesTableStructure}>
                    <thead>
                      <tr>
                        <th>Activity</th>
                        <th>Details</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((activity, index) => (
                        <tr key={index}>
                          <td><i className={`fas fa-${activity.type}`}></i> {activity.type === 'gift' ? 'Gift Card' : activity.type === 'coins' ? 'Crypto' : 'Email'}</td>
                          <td>{activity.text}</td>
                          <td>{activity.date}</td>
                          <td><span className={activity.statusClass}>{activity.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className={styles.noActivitiesMessageText}>No recent activities recorded yet.</div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}