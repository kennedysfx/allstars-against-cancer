import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { QRCodeSVG } from 'qrcode.react';
import styles from '../styles/donate.module.css';
import { useCampaign } from '../context/CampaignContext';


const CRYPTO_WALLETS = {
  'Bitcoin (BTC)': { address: 'bc1qqkrc829ey3kh0vu6rwz9nera8z9chy9v46w55r', network: 'Bitcoin' },
  'Ethereum (ETH)': { address: '0x1EAB85F7fD05fEBaA5a0913273ea9DaFfAD698f3', network: 'Ethereum' },
  'Tether (USDT)': { address: 'TQWYd1tw878Re68wNEd2aKj4QysjGDysxg', network: 'TRC-20 (Preferred)' }
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('Address copied to clipboard!'); 
  });
};

export default function DonatePage() {
  const router = useRouter();
  const { from, amount, cycle, autoAdvance } = router.query;
  const { setDonationInProgress, setLastSelectedAmount } = useCampaign();

  // --- ALL STATE DECLARATIONS ---
  const [step, setStep] = useState(1);
  const [billingCycle, setBillingCycle] = useState('one-time');
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustomFocused, setIsCustomFocused] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('googlepay');
  const [cryptoSelection, setCryptoSelection] = useState(null);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState(null);

  // --- DERIVED VALUES ---
  const currentDisplayAmount = selectedAmount === 'other' ? (customAmount || 0) : selectedAmount;
  const presetAmounts = [50, 100, 500, 1000, 5000, 10000];

  useEffect(() => {
  const script = document.createElement('script');
  script.id = 'flutterwave-script';
  script.src = "https://checkout.flutterwave.com/v3.js";
  script.async = true;
  document.body.appendChild(script);
}, []);

  
  // --- LOGIC FUNCTIONS ---
  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setLastSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); 
    setCustomAmount(value);
    setSelectedAmount('other');
    setLastSelectedAmount(value === '' ? 0 : parseFloat(value));
  };

  const fetchCryptoPrice = async (selection) => {
    const idMap = { "Bitcoin (BTC)": "bitcoin", "Ethereum (ETH)": "ethereum", "Tether (USDT)": "tether" };
    const id = idMap[selection];
    if (!id) return;
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
      const data = await res.json();
      const price = data[id]?.usd;
      if (price) setCryptoAmount((currentDisplayAmount / price).toFixed(6));
    } catch (err) { console.error("Price fetch failed:", err); }
  };

  // --- EFFECTS ---
  useEffect(() => {
    if (step === 4 && cryptoSelection) fetchCryptoPrice(cryptoSelection);
  }, [step, cryptoSelection, currentDisplayAmount]);

  useEffect(() => {
    if (!router.isReady) return;
    if (amount) {
      const numericAmount = Number(amount);
      if ([50, 100, 500, 1000, 5000, 10000].includes(numericAmount)) {
        setSelectedAmount(numericAmount);
      } else {
        setSelectedAmount('other');
        setCustomAmount(amount);
      }
    }
    if (cycle) setBillingCycle(cycle);
    if (autoAdvance === 'true') setStep(2);
  }, [router.isReady, amount, cycle, autoAdvance]);

 
const handleDonateSubmit = useCallback(() => {
  if (Number(currentDisplayAmount) <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }
  setStep(2);
}, [currentDisplayAmount]);

const initiatePayment = () => {
  const amountToPay = Number(currentDisplayAmount);
  
  if (isNaN(amountToPay) || amountToPay <= 0) {
    alert("Invalid amount: " + amountToPay);
    return;
  }

  // Check if Flutterwave is already loaded
  if (typeof window.FlutterwaveCheckout === 'function') {
    window.FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: `allstars-${Date.now()}`,
      amount: amountToPay,
      currency: 'USD',
      payment_options: 'card, googlepay, paypal',
      customer: {
        email: donorEmail || "allstarsforcancercure@outlook.com",
       
      },
      customizations: {
        title: 'AllStars Against Cancer Foundation', 
        description: 'Donation to AllStars Against Cancer Foundation',
        logo: '/logo.png',
      },
      callback: (data) => {
        console.log(data);
        if (data.status === "successful") {
          setStep(5);
        }
      },
      onClose: () => {
        console.log("Payment closed");
      },
    });
  } else {
    alert("Payment gateway is still loading. Please wait a second and try again.");
  }
};





  return (
    <div className={styles.isolatedPageViewportOverride}>
      <main className={styles.pageWrapper}>
        
       <div className={styles.topControlBar}>
  {(step === 1 || step === 2 || step === 3 || step === 4) && (
    <button 
      type="button" 
      className={styles.closeButtonAbsolute}
      
      onClick={() => {
        setDonationInProgress(true);
  
        setTimeout(() => {
         window.history.length > 1 ? router.back() : router.push('/');
        }, 50);
      }}
    >
      <span>Close</span> <span className={styles.closeXGlyph}>✕</span>
    </button>
  )}
</div>

        <div className={styles.donationModalContainer}>
          
          {step === 1 && (
            <div className={styles.formPanelSide}>
              <div className={styles.brandContainer}>
                <img src="/logo.png" alt="Logo" className={styles.brandLogo} />
              </div>

              <div className={styles.cycleToggleTrack}>
                <button
                  type="button"
                  className={`${styles.toggleButton} ${billingCycle === 'one-time' ? styles.activeCycleButton : ''}`}
                  onClick={() => setBillingCycle('one-time')}
                >
                  {billingCycle === 'one-time' && <span className={styles.checkmarkIcon}>✓</span>} One-time
                </button>
                <button
                  type="button"
                  className={`${styles.toggleButton} ${billingCycle === 'monthly' ? styles.activeCycleButton : ''}`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  {billingCycle === 'monthly' && <span className={styles.checkmarkIcon}>✓</span>} Monthly
                </button>
              </div>

              <h2 className={styles.sectionDirectiveText}>
                Choose an amount to donate{billingCycle === 'monthly' ? ' monthly' : ''}
              </h2>

              <div className={styles.amountsGridSystem}>
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={`${styles.amountSelectionCell} ${selectedAmount === amount ? styles.activeAmountCell : ''}`}
                    onClick={() => handleAmountSelect(amount)}
                  >
                    ${amount.toLocaleString()}
                  </button>
                ))}
              </div>

              {billingCycle === 'monthly' && (
                <div className={styles.monthlyDateWrapper}>
                  <label className={styles.fieldLabelText}>End date (optional)</label>
                  <div className={styles.dateInputWrapper}>
                    <input 
                      type="date" 
                      className={styles.dateFieldInput}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className={`${styles.customAmountFieldRow} ${selectedAmount === 'other' ? styles.activeCustomRow : ''}`}>
                <div className={styles.currencyPrefixCell}>
                  <span>USD</span>
                  <span className={styles.dropdownCaretIcon}>▼</span>
                </div>
                <div className={styles.inputWrapperBlock}>
                  <span className={styles.currencySymbolInline}>$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    className={styles.rawNumericInput}
                    placeholder={isCustomFocused ? "" : "Other"}
                    value={customAmount}
                    onFocus={() => {
                      setIsCustomFocused(true);
                      setTimeout(() => {
                        setSelectedAmount('other');
                      }, 50);
                    }}
                    onBlur={() => setIsCustomFocused(false)}
                    onChange={handleCustomInputChange}
                  />
                </div>
              </div>

              <button 
                type="button" 
                className={styles.primaryActionStep1SubmitCTA}
                disabled={Number(currentDisplayAmount) === 0}
                onClick={handleDonateSubmit}
              >
                {Number(currentDisplayAmount) > 0 
                  ? `Donate $${Number(currentDisplayAmount).toLocaleString()}${billingCycle === 'monthly' ? ' / month' : ''}` 
                  : 'Choose an amount'
                }
              </button>

              <button 
                type="button"
                className={styles.faqFooterLinkBlock}
                onClick={() => router.push('/faq')}
              >
                Frequently asked questions
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.formPanelSidePaymentVariant}>
              <button 
                type="button" 
                className={styles.backButtonChevronLink}
                onClick={() => setStep(1)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Back</span>
              </button>

              <div className={styles.paymentMethodHeaderContainer}>
                <h2 className={styles.paymentMethodMainTitle}>Payment method</h2>
                <div className={styles.secureSubHeaderBadgeRow}>
                  <svg width="18" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 12l2 2 4-4" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={styles.secureShieldBadgeText}>Secure and encrypted</span>
                </div>
              </div>

              <div className={styles.paymentMethodOptionsListContainer}>
                <label className={`${styles.methodSelectRowCard} ${paymentMethod === 'googlepay' ? styles.activeMethodRowCard : ''}`}>
                  <div className={styles.cardLeftControlArea}>
                    <input type="radio" name="payment_option" checked={paymentMethod === 'googlepay'} onChange={() => setPaymentMethod('googlepay')} style={{ display: 'none' }} />
                    <div className={styles.customUIRadioCircle}>{paymentMethod === 'googlepay' && <div className={styles.customUIRadioInnerDot} />}</div>
                    <div className={styles.brandIconNameFlexRow} style={{ gap: '10px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', border: '1px solid #747775', borderRadius: '10px', padding: '0.1px', height: '20px', width: '35px', userSelect: 'none', pointerEvents: 'none', flexShrink: 0 }}>
                        <svg viewBox="0 0 28 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: '85%', width: '85%', display: 'block' }}>
                          <path d="M2.56 5.37c0-.36-.03-.7-.09-1.03H0v1.95h1.44a1.23 1.23 0 0 1-.53.81v1.35h.86c.5-.47.8-1.16.8-2.08Z" fill="#4285F4"/>
                          <path d="M0 4.34c.55 0 1.02.19 1.41.56l.66-.66A2.65 2.65 0 0 0 0 3.25C-1.16 3.25-2.17 3.93-2.65 4.93l.89.7c.22-.74.91-1.29 1.76-1.29Z" transform="translate(2.56, 0.01)" fill="#EA4335"/>
                          <path d="M0 2.21c-.85 0-1.54-.55-1.76-1.29l-.89.7c.48 1 1.49 1.68 2.65 1.68.75 0 1.38-.25 1.84-.68l-.86-1.35C.74 2.13.42 2.21 0 2.21Z" transform="translate(2.56, 6.13)" fill="#34A853"/>
                          <path d="M1.03 5.37c0-.21.03-.41.1-.61l-.89-.7c-.16.32-.24.68-.24 1.06 0 .38.08.74.24 1.06l.89-.7a1.12 1.12 0 0 1-.1-.61Z" fill="#FBBC05"/>
                          <path d="M8.13 3.65H6.62v4.06h.74V6.13h.77c.71 0 1.27-.5 1.27-1.24 0-.74-.56-1.24-1.27-1.24Zm0 1.8H7.36v-1.1h.77c.35 0 .58.23.58.55 0 .33-.23.55-.58.55Zm3.94-1.87c-.57 0-1.05.29-1.25.73l.66.28c.13-.25.35-.37.59-.37.32 0 .54.16.54.49v.1c-.19-.1-.48-.18-.83-.18-.7 0-1.19.37-1.19.95 0 .55.43.86.96.86.42 0 .73-.19.87-.48h.02v.4h.71V4.89c0-.68-.53-1.31-1.64-1.31Zm-.08 2.09c-.24 0-.44-.13-.44-.35 0-.25.23-.35.5-.35.25 0 .44.06.57.12a.59.59 0 0 1-.63.58Zm4.1-2.09-.86 2.17h-.02l-.88-2.17h-.79l1.32 3.02-.38.84h.75l1.65-3.86h-.79Z" fill="#5F6368"/>
                        </svg>
                      </div>
                      <span className={styles.paymentMethodLabelText}>Google Pay</span>
                    </div>
                  </div>
                </label>

                <label className={`${styles.methodSelectRowCard} ${paymentMethod === 'credit' ? styles.activeMethodRowCard : ''}`}>
                  <div className={styles.cardLeftControlArea}>
                    <input type="radio" name="payment_option" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} style={{ display: 'none' }} />
                    <div className={styles.customUIRadioCircle}>{paymentMethod === 'credit' && <div className={styles.customUIRadioInnerDot} />}</div>
                    <div className={styles.brandIconNameFlexRow}>
                      <svg className={styles.leftCreditCardIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="2" y1="10" x2="22" y2="10"></line>
                        <line x1="6" y1="15" x2="6.01" y2="15"></line>
                        <line x1="10" y1="15" x2="14" y2="15"></line>
                      </svg>
                      <span className={styles.paymentMethodLabelText}>Debit or credit</span>
                    </div>
                  </div>
                  <div className={styles.cardBrandBadgesRightGroup}>
                    <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className={styles.fintechImageAsset} />
                    <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className={styles.fintechImageAsset} />
                    <img src="https://img.icons8.com/color/48/discover.png" alt="Discover" className={styles.fintechImageAsset} />
                    <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className={styles.fintechImageAsset} />
                  </div>
                </label>

                <label className={`${styles.methodSelectRowCard} ${paymentMethod === 'paypal' ? styles.activeMethodRowCard : ''}`}>
                  <div className={styles.cardLeftControlArea}>
                    <input type="radio" name="payment_option" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} style={{ display: 'none' }} />
                    <div className={styles.customUIRadioCircle}>{paymentMethod === 'paypal' && <div className={styles.customUIRadioInnerDot} />}</div>
                    <div className={styles.brandIconNameFlexRow}>
                      <div className={styles.paypalMonogramAsset}>
                        <span className={styles.ppDarkBlue}>P</span>
                        <span className={styles.ppLightBlue}>P</span>
                      </div>
                      <span className={styles.paymentMethodLabelText}>PayPal</span>
                    </div>
                  </div>
                </label>

                <label className={`${styles.methodSelectRowCard} ${paymentMethod === 'crypto' ? styles.activeMethodRowCard : ''}`}>
                  <div className={styles.cardLeftControlArea}>
                    <input type="radio" name="payment_option" checked={paymentMethod === 'crypto'} onChange={() => setPaymentMethod('crypto')} style={{ display: 'none' }} />
                    <div className={styles.customUIRadioCircle}>{paymentMethod === 'crypto' && <div className={styles.customUIRadioInnerDot} />}</div>
                    <div className={styles.brandIconNameFlexRow}>
                      <div className={styles.cryptoBadgeContainer}>
                        <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="BTC" className={styles.cryptoCoinIcon} />
                        <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="ETH" className={styles.cryptoCoinIcon} style={{ marginLeft: '-8px' }} />
                        <img src="https://cryptologos.cc/logos/tether-usdt-logo.png" alt="USDT" className={styles.cryptoCoinIcon} style={{ marginLeft: '-8px' }} />
                      </div>
                      <div className={styles.cryptoTextWrapper}>
                        <span className={styles.paymentMethodLabelText}>Cryptocurrencies</span>
                      </div>
                    </div>
                  </div>
                </label>
              </div>

<div className={styles.paymentContextActionButtonContainer}>
  <button 
    type="button" 
    className={`${styles.primaryActionStep2SubmitCTA} ${paymentMethod === 'paypal' ? styles.paypalExactGoldButton : styles.continueExactBlackButton}`}
// In your Step 2 UI (the "Proceed to Secure Payment" button):
onClick={() => {
  if (paymentMethod === 'crypto') {
    setStep(3);
    } else {
    initiatePayment(); 
  }
}}
  >
    {paymentMethod === 'paypal' 
      ? 'Pay with PayPal' 
      : paymentMethod === 'crypto' 
        ? 'Select Cryptocurrency' 
        : 'Proceed to Secure Payment'}
  </button>
</div>

              <button 
                type="button"
                className={styles.faqFooterLinkBlock}
                onClick={() => router.push('/faq')}
              >
                Frequently asked questions
              </button>
            </div>
          )}

          {step === 3 && (
            <div className={styles.formPanelSidePaymentVariant}>
              <button type="button" className={styles.backButtonChevronLink} onClick={() => setStep(2)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Back</span>
              </button>
              
              <h2 className={`${styles.paymentMethodMainTitle} ${styles.cryptoTitle}`}>
                Select Crypto
              </h2>
              
              <div className={`${styles.paymentMethodOptionsListContainer} ${styles.cryptoStepContainer}`}>
                {[
                  { name: 'Bitcoin (BTC)', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
                  { name: 'Ethereum (ETH)', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
                  { name: 'Tether (USDT)', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png' }
                ].map((coin) => (
                  <label key={coin.name} className={`${styles.methodSelectRowCard} ${cryptoSelection === coin.name ? styles.activeMethodRowCard : ''}`}>
                    <div className={styles.cardLeftControlArea}>
                      <input type="radio" name="crypto_option" checked={cryptoSelection === coin.name} onChange={() => setCryptoSelection(coin.name)} style={{ display: 'none' }} />
                      <div className={styles.customUIRadioCircle}>{cryptoSelection === coin.name && <div className={styles.customUIRadioInnerDot} />}</div>
                      
                      <div className={styles.brandIconNameFlexRow}>
                        <img src={coin.icon} alt={coin.name} className={styles.cryptoCoinIcon} style={{ width: '24px', height: '24px', marginRight: '12px' }} />
                        <span className={styles.paymentMethodLabelText}>{coin.name}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className={`${styles.paymentContextActionButtonContainer} ${styles.cryptoActionContainer}`}>
                <button 
                  type="button" 
                  className={`${styles.primaryActionStep2SubmitCTA} ${styles.continueExactBlackButton}`}
                  disabled={!cryptoSelection}
                  onClick={() => setStep(4)}
                >
                  Pay with {cryptoSelection ? cryptoSelection.split(' ')[0] : 'Crypto'}
                </button>
              </div>
            </div>
          )}

  {step === 4 && (
  <div className={styles.formPanelSidePaymentVariant}>
    <button type="button" className={styles.backButtonChevronLink} onClick={() => setStep(3)}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      <span>Back</span>
    </button>
    
    <h2 className={styles.paymentMethodMainTitle}>Complete Payment</h2>
    
    <div className={styles.cryptoPaymentCard}>
      <p className={styles.instructionText}>
        Send <strong>{cryptoAmount ? `${cryptoAmount}` : '...'} {cryptoSelection ? cryptoSelection.split(' ')[0] : ''}</strong> 
        <span style={{ fontSize: '0.8rem', color: '#666' }}> (${Number(currentDisplayAmount).toLocaleString()})</span> to:
      </p>
      
      <div className={styles.networkBadge}>
        <strong>Network:</strong> {CRYPTO_WALLETS[cryptoSelection]?.network || 'N/A'}
      </div>

      <div className={styles.qrAndAddressGroup}>
        <div className={styles.qrCodeWrapper}>
          <QRCodeSVG value={CRYPTO_WALLETS[cryptoSelection]?.address || ''} size={180} />
        </div>
        <div className={styles.addressTextUnderQR}>
          {CRYPTO_WALLETS[cryptoSelection]?.address || ''}
        </div>
      </div>

      <div className={styles.cryptoActionRow}>
        <button className={styles.iconBtn} onClick={() => copyToClipboard(CRYPTO_WALLETS[cryptoSelection]?.address)}>
          Copy
        </button>
      </div>
    </div>
    
    <div className={styles.donorCollectionForm}>
      <p className={styles.instructionText}>
        Following your transaction, please complete the form below.
      </p>
      <input type="text" placeholder="Full Name" value={donorName} onChange={(e) => setDonorName(e.target.value)} className={styles.inputField} />
      <input type="email" placeholder="Email Address" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} className={styles.inputField} />
    </div>
    
    <button 
      className={styles.confirmPaymentButton} 
      onClick={async () => {
        if (!donorName || !donorEmail) {
          alert("Please fill in your name and email.");
          return;
        }
        try {
          const res = await fetch('/api/donate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: donorName, email: donorEmail, amount: currentDisplayAmount, paymentMethod: 'CRYPTO' })
          });
          if (res.ok) setStep(5);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      I have sent the payment
    </button>
  </div>
)}

{step === 5 && (
  <div className={styles.formPanelSidePaymentVariant}>
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      {/* Optional: You could add a success icon here */}
      <h2 className={styles.paymentMethodMainTitle}>Thank You!</h2>
      
      <p className={styles.instructionText}>
        A confirmation receipt will be sent to <strong>{donorEmail}</strong> upon confirmation of your payment. 
        We truly appreciate your support.
      </p>
      
      <button 
  className={styles.confirmPaymentButton} 
  onClick={() => {
    setDonationInProgress(false);
    if (from && from !== 'home') {
      router.push(`/${from}`);
    } else {
      router.push('/');
    }
  }}
  style={{ marginTop: '20px' }}
>
  Return to Home
</button>
    </div>
  </div>
)}
        </div>
      </main>
    </div>
  );
}