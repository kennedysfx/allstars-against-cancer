import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/how-to-help.module.css';
import { useCampaign } from '../context/CampaignContext';

export default function HowToHelpPage() {
  const router = useRouter();
  const sectionRef = useRef(null);
  const [isIntersecting, setIntersecting] = useState(false);

  // 2. EXTRACT YOUR MODAL'S STATE SETTER FUNCTION FROM CONTEXT
  // (Use whatever your context exposes, e.g., setDonationAmount or updateDonationAmount)
  const { setLastSelectedAmount } = useCampaign();

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Form State
  const [billingCycle, setBillingCycle] = useState('one-time');
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const presetAmounts = [50, 100, 500, 1000, 5000, 10000];
  const currentDisplayAmount = selectedAmount === 'other' ? (customAmount || 0) : selectedAmount;

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    setSelectedAmount('other');
  };

  const handleDonateSubmit = () => {
  if (Number(currentDisplayAmount) > 0) {
    
   setLastSelectedAmount(Number(currentDisplayAmount)); 

    router.push({
      pathname: '/donate',
      query: { 
        amount: currentDisplayAmount, 
        cycle: billingCycle,
        autoAdvance: 'true' 
      },
    });
  }
};

  return (
    <>
      <section className={styles.helpSection}>
        <div className={styles.overlay}>
          <div className={styles.contentWrapper}>
            <div className={styles.textContainer}>
              <h4 className={styles.subHeading}>THE POWER OF GIVING</h4>
              <h2 className={styles.mainHeading}>MAKE A GREATER DIFFERENCE</h2>
              <p className={styles.description}>
                You have the power to advance lifesaving cancer research. Explore the many ways you can join the music community in our mission to find a cure. Give with confidence, knowing your contribution directly fuels innovative science and early-stage breakthroughs.
              </p>
              <p className={styles.efficiency}>
                With a fundraising efficiency ratio of just $0.08, that means 92 cents of every dollar goes directly to our mission.
              </p>
              <div className={styles.badgeContainer}>
                <img src="/candid-platinum.png" alt="Platinum Transparency 2026" className={styles.badge} />
                <img src="/charity-navigator.png" alt="Charity Navigator Four-Star 2026" className={styles.badge} />
              </div>
            </div>

            <div className={styles.donationFormWrapper}>
              <div className={styles.donationModalContainer}>
                <div className={styles.formPanelSide}>
                  <div className={styles.cycleToggleTrack}>
                    <button type="button" className={`${styles.toggleButton} ${billingCycle === 'one-time' ? styles.activeCycleButton : ''}`} onClick={() => setBillingCycle('one-time')}>
                      {billingCycle === 'one-time' && <span className={styles.checkmarkIcon}>✓</span>} One-time
                    </button>
                    <button type="button" className={`${styles.toggleButton} ${billingCycle === 'monthly' ? styles.activeCycleButton : ''}`} onClick={() => setBillingCycle('monthly')}>
                      {billingCycle === 'monthly' && <span className={styles.checkmarkIcon}>✓</span>} Monthly
                    </button>
                  </div>

                  <h2 className={styles.sectionDirectiveText}>Choose an amount to donate{billingCycle === 'monthly' ? ' monthly' : ''}</h2>

                  <div className={styles.amountsGridSystem}>
                    {presetAmounts.map((amount) => (
                      <button key={amount} type="button" className={`${styles.amountSelectionCell} ${selectedAmount === amount ? styles.activeAmountCell : ''}`} onClick={() => handleAmountSelect(amount)}>
                        ${amount.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  {billingCycle === 'monthly' && (
                    <div className={styles.monthlyDateWrapper}>
                      <label className={styles.fieldLabelText}>End date (optional)</label>
                      <input type="date" className={styles.dateFieldInput} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                  )}

                  <div className={`${styles.customAmountFieldRow} ${selectedAmount === 'other' ? styles.activeCustomRow : ''}`}>
                    <div className={styles.currencyPrefixCell}><span>USD</span></div>
                    <input type="text" className={styles.rawNumericInput} placeholder="Other" value={customAmount} onChange={handleCustomInputChange} />
                  </div>

                  <button type="button" className={styles.primaryActionStep1SubmitCTA} onClick={handleDonateSubmit}>
                    {Number(currentDisplayAmount) > 0 ? `Donate $${Number(currentDisplayAmount).toLocaleString()}` : 'Choose an amount'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={sectionRef} 
        className={styles.testimonialSplitSection}
      >
        <div className={`${styles.splitContentSide} ${isIntersecting ? styles.animateIn : ''}`}>
          <p className={styles.quoteText}>
            We need your help. I need your help. We need money for research. It may not save my life. It may save my children’s life. It may save someone you love. And it’s very important.
          </p>
          <div className={styles.accentLine}></div>
          <p className={styles.authorName}>LUKE WALTER</p>
        </div>
        <div className={styles.splitImageSide}></div>
      </section>
    </>
  );
}