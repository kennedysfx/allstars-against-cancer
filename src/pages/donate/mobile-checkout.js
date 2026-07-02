import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './mobile-checkout.module.css';

export default function MobileCheckout() {
  const router = useRouter();
  const { amount, method, email } = router.query;
  
  // Track UI states: 'loading', 'active', or 'cancelled'
  const [paymentStatus, setPaymentStatus] = useState('loading');

  const handleFlutterwavePayment = () => {
    if (!amount) return;
    setPaymentStatus('active');

    window.FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: `donation-${Date.now()}`,
      amount: parseFloat(amount),
      currency: 'USD',
      payment_options: method === 'card' ? 'card' : 'ussd, mobilemoneyghana, card',
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
        // Smoothly update state to show recovery options instead of a harsh alert box
        setPaymentStatus('cancelled');
      }
    });
  };

  useEffect(() => {
    if (window.FlutterwaveCheckout && amount && paymentStatus === 'loading') {
      handleFlutterwavePayment();
    }
  }, [amount, method, email, paymentStatus]);

  // RENDER STATE 1: User closed the window (Cancelled / Recovery UI)
  if (paymentStatus === 'cancelled') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Payment Not Completed</h2>
          <p style={{ marginBottom: '24px' }}>
            It looks like the secure checkout window was closed before completing your ${amount} donation.
          </p>
          
          {/* Action buttons allowing them to instantly recover */}
          <button 
            onClick={() => setPaymentStatus('loading')} 
            className={styles.primaryButton}
          >
            Re-open Secure Checkout
          </button>
          
          <button 
            onClick={() => router.push('/donate')} 
            className={styles.secondaryButton}
          >
            Change Payment Details
          </button>
        </div>
      </div>
    );
  }

  // RENDER STATE 2: Standard Connecting/Processing Loader Layout
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.spinner}></div>
        <h2>Connecting to Flutterwave...</h2>
        <p>
          Preparing your secure transaction for <span className={styles.amountHighlight}>${amount}</span>. 
          Please do not close this window.
        </p>
      </div>
    </div>
  );
}