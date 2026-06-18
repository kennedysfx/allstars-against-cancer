import React, { useState } from 'react';
import styles from '../styles/donate.module.css';

export default function DonateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [billingCycle, setBillingCycle] = useState('one-time'); 
  const [selectedAmount, setSelectedAmount] = useState(100); 
  const [customAmount, setCustomAmount] = useState('');
  const [isCustomFocused, setIsCustomFocused] = useState(false);

  const presetAmounts = [50, 100, 500, 1000, 5000, 10000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(''); 
  };

  const handleCustomInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); 
    setCustomAmount(value);
    setSelectedAmount('other');
  };

  const currentDisplayAmount = selectedAmount === 'other' ? (customAmount || 0) : selectedAmount;

  return (
    <div className={styles.isolatedPageViewportOverride}>
      <main className={styles.pageWrapper}>
        
        <div className={styles.topControlBar}>
          <button onClick={onClose} className={styles.closeButton}>
            Close ✕
          </button>
        </div>

        <div className={styles.donationModalContainer}>
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

            <h2 className={styles.sectionDirectiveText}>Choose an amount to donate</h2>

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

            <div className={`${styles.customAmountFieldRow} ${selectedAmount === 'other' ? styles.activeCustomRow : ''}`}>
              <div className={styles.currencyPrefixCell}>
                <span>USD</span>
                <span className={styles.dropdownCaretIcon}>▼</span>
              </div>
              <div className={styles.inputWrapperBlock}>
                <span className={styles.currencySymbolInline}>$</span>
                <input
                  type="text"
                  className={styles.rawNumericInput}
                  placeholder={isCustomFocused ? "" : "Other"}
                  value={customAmount}
                  onFocus={() => {
                    setIsCustomFocused(true);
                    setSelectedAmount('other');
                  }}
                  onBlur={() => setIsCustomFocused(false)}
                  onChange={handleCustomInputChange}
                />
              </div>
            </div>

            <button type="button" className={styles.primaryActionSubmitCTA}>
              {Number(currentDisplayAmount) > 0 ? `Donate $${Number(currentDisplayAmount).toLocaleString()}` : 'Choose an amount'}
            </button>

            <span className={styles.faqFooterLinkBlock}>Frequently asked questions</span>
          </div>
        </div>
      </main>
    </div>
  );
}