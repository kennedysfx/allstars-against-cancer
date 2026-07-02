import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './mobile-checkout.module.css';

export default function MobileCheckout() {
  const router = useRouter();
  const { amount, method, email } = router.query;
  
  const [paymentStatus, setPaymentStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!router.isReady || !amount) return;

    const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;
    if (!publicKey) {
      setErrorMessage("Configuration Error: Missing Flutterwave Public Key.");
      setPaymentStatus('error');
      return;
    }

    const existingScript = document.querySelector('script[src="https://checkout.flutterwave.com/v3.js"]');
    
    const initializePayment = () => {
      if (!window.FlutterwaveCheckout) {
        setErrorMessage("Failed to initialize Flutterwave SDK.");
        setPaymentStatus('error');
        return;
      }

      setPaymentStatus('active');
      
      // Use the standard redirect parameter implementation to bypass iframe blocks
      window.FlutterwaveCheckout({
        public_key: publicKey,
        tx_ref: `donation-${Date.now()}`,
        amount: parseFloat(amount),
        currency: 'USD',
        payment_options: method === 'card' ? 'card' : 'ussd, mobilemoneyghana, card',
        
        // This configuration forces a clean redirect rather than an embedded Iframe popup
        redirect_url: `${window.location.origin}/donate/success`, 
        
        customer: {
          email: email || "allstarsforcancercure@outlook.com", 
          name: "AllStars Against Cancer Team",
        },
        customizations: {
          title: "AllStars Against Cancer Foundation",
          description: "Thank you for your donation!",
        },
        callback: (data) => {
          if (data.status === "successful") {
            router.push('/donate/success');
          }
        },
        onclose: () => {
          setPaymentStatus('cancelled');
        }
      });
    };

    if (window.FlutterwaveCheckout) {
      initializePayment();
    } else if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://checkout.flutterwave.com/v3.js";
      script.async = true;
      script.onload = () => initializePayment();
      script.onerror = () => {
        setErrorMessage("Network Error: Could not load the secure payment gateway script.");
        setPaymentStatus('error');
      };
      document.body.appendChild(script);
    }

  }, [router.isReady, amount, method, email]);

  if (paymentStatus === 'error') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.errorIcon}>❌</div>
          <h2>Unable to Load Checkout</h2>
          <p style={{ color: '#e11d48', margin: '12px 0 24px 0', fontSize: '0.9rem' }}>{errorMessage}</p>
          <button onClick={() => router.push('/donate')} className={styles.secondaryButton}>
            Go Back to Main Site
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'cancelled') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Payment Not Completed</h2>
          <p style={{ marginBottom: '24px' }}>
            It looks like the secure checkout window was closed before completing your ${amount} donation.
          </p>
          <button onClick={() => window.location.reload()} className={styles.primaryButton}>
            Re-open Secure Checkout
          </button>
          <button onClick={() => router.push('/donate')} className={styles.secondaryButton}>
            Change Payment Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.spinner}></div>
        <h2>Connecting to Flutterwave...</h2>
        <p>
          Preparing your secure transaction for <span className={styles.amountHighlight}>${amount || '...'}</span>. 
          Please do not close this window.
        </p>
      </div>
    </div>
  );
}