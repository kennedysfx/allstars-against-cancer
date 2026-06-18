import React from 'react';
import styles from '../styles/research.module.css';

const TestimonialSection = () => {
  return (
    <section className={styles.testimonialWrapper}>
      <div className={styles.testimonialBox}>
        <blockquote className={styles.quote}>
          "Without the AllStars Against Cancer Foundation's support, the innovative breakthroughs we all deserve could not have happened. The foundation takes educated risks supporting early-stage research, resulting in a new understanding of cancer, new treatments, and, ultimately, the great promise of saving lives."
        </blockquote>
        <p className={styles.author}>
          — Mitchell C. Benson, M.D. <br />
          <span className={styles.title}>
            Herbert and Florence Irving Professor, Emeritus Chair of Urology, 
            Columbia University Irving Medical Center, New York Presbyterian Hospital
          </span>
        </p>
      </div>
    </section>
  );
};

export default TestimonialSection;
