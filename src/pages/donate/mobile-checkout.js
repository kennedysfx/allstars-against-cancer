import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MobileCheckout() {
  const router = useRouter();
  
  // 1. Grab the email parameter alongside amount and method
  const { amount, method, email } = router.query;

  useEffect(() => {
    if (!amount) return;

    const handleFlutterwavePayment = () => {
      FlutterwaveCheckout({
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: `donation-${Date.now()}`,
        amount: parseFloat(amount),
        currency: 'USD',
        payment_options: method === 'card' ? 'card' : 'ussd, mobilemoneyghana, card',
        customer: {
          // 2. Assign the passed parameter here, with a backup fallback email just in case
          email: email || "anonymous-donor@example.com", 
          name: "Anonymous Donor",
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
          alert("Payment window closed.");
        }
      });
    };

    if (window.FlutterwaveCheckout) {
      handleFlutterwavePayment();
    }
  }, [amount, method, email]); // 3. Added email to dependency array

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Connecting to Flutterwave...</h2>
        <p>Preparing your secure transaction for ${amount}. Please do not close this window.</p>
      </div>
    </div>
  );
}