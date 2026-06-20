import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCampaign } from '../context/CampaignContext';
import styles from '../styles/PersistentDonationBar.module.css';

export default function PersistentDonationBar() {
  const [isMounted, setIsMounted] = useState(false);
  const { setDonationInProgress, lastSelectedAmount } = useCampaign();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={styles.barContainer}>


      <div className={styles.contentWrapper}>
        <span className={styles.heartIcon}>♡</span>
        <div className={styles.textContainer}>
          <h4 className={styles.title}>Make a difference!</h4>
          {/* Dynamically insert the amount here */}
          <p className={styles.description}>
            Finish your ${lastSelectedAmount.toLocaleString()} gift to create an impact today.
          </p>
          </div>
      </div>
      
      <div className={styles.buttonGroup}>
        <button 
          className={styles.giveButton} 
          onClick={() => router.push('/donate')}
        >
          Give Now
        </button>

         <button className={styles.closeButton} onClick={() => setDonationInProgress(false)}>
        ✕
      </button>
        
    </div>
    </div>
  );
}