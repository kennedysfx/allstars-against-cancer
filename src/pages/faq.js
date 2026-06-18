import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/donate.module.css';

export default function FAQPage() {
  const router = useRouter();
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const faqData = [
    {
      question: "Is my donation secure?",
      answer: "Yes. Your security and privacy is our highest priority. We use industry-standard SSL technology to keep your information safe and secure."
    },
    {
      question: "Is my donation tax deductible?",
      answer: "AllStars Against Cancer is a 501(c)(3) tax-exempt organization, and your donation is tax deductible within the guidelines of U.S. law. Please keep your receipt as your official record. We'll email it to you upon successful completion of your donation."
    }
  ];

  const toggleFaqAccordion = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <div className={styles.isolatedPageViewportOverride}>
      <main className={styles.pageWrapper}>
        
        {/* CENTRAL CONTAINER BOX MODAL FRAMEWORK */}
        <div className={styles.donationModalContainer}>
          <div className={styles.faqPanelSide}>
            
            <div className={styles.faqHeaderBar}>
              <h2 className={styles.faqTitleText}>Frequently asked questions</h2>
              <button 
                type="button" 
                className={styles.faqCloseCircleButton} 
                // Inside DonatePage.js
              onClick={() => {
                window.history.length > 1 ? router.back() : router.push('/');
              }}
              >
                ✕
              </button>
            </div>

            <div className={styles.accordionContainerList}>
              {faqData.map((item, index) => {
                const isOpen = activeFaqIndex === index;
                return (
                  <div key={index} className={styles.accordionCardWrapper}>
                    <button
                      type="button"
                      className={styles.accordionHeaderTrigger}
                      onClick={() => toggleFaqAccordion(index)}
                    >
                      <span className={styles.accordionQuestionText}>{item.question}</span>
                      <span className={`${styles.accordionIndicatorArrow} ${isOpen ? styles.arrowRotateUp : ''}`}>
                        ▼
                      </span>
                    </button>
                    
                    <div className={`${styles.accordionContentCollapsePanel} ${isOpen ? styles.panelExpanded : ''}`}>
                      <div className={styles.accordionContentInnerBuffer}>
                        <p className={styles.faqAnswerParagraphText}>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}