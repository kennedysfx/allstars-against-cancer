import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/stories.module.css'; // Ensure this matches your file path

export default function Stories() {
  const [isExpanded, setIsExpanded] = useState(false);
  const ctaRef = useRef(null); 
 const [isCtaVisible, setIsCtaVisible] = useState(false);

 useEffect(() => {
    // 1. Smooth Scroll Logic: Runs only once on load
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        // Delay slightly to ensure elements are rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }

    // 2. Intersection Observer Logic: Watches for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains(styles.ctaSection)) {
              setIsCtaVisible(true);
            } else {
              const elements = entry.target.querySelectorAll(`.${styles.animateSlideUp}`);
              elements.forEach(el => el.classList.add(styles.isVisible));
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);


  return (
    <div className={styles.pageContainer}>
      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
        <div className={`${styles.heroContent} ${styles.animateSlideUp}`}>
          <h1 className={styles.title}>Patient Stories</h1>
          <p className={styles.description}>
            We are one team, dedicated to achieving Victory Over Cancer®. Discover inspiring journeys from those whose lives have been touched by cancer and learn about the experts leading the charge in modern research.
          </p>
          <div className={styles.accentBar}></div>
        </div>
      </section>

      {/* 2. Story Card Section */}
      <section id="patient-stories" className={styles.storyCard}>
        <div className={`${styles.textContainer} ${styles.animateSlideUp}`}>
          <div className={styles.accentLine}></div>
          <h2 className={styles.storyTitle}>Alison Diminuco: Two Weddings, Honoring Her Mom, and Living Fearlessly</h2>
          <p className={styles.storyExcerpt}>How Alison Diminuco Honored her Mom at Both her Wedding Celebrations</p>
          </div>
        
        

        <div className={styles.bottomText}>
        <div className={styles.storyBody}>
    <p>In the spring of 2024, Denise was diagnosed with stage 4 lung cancer. The diagnosis was shocking, and the following year was a rollercoaster. Denise persistently sought and applied for clinical trials but was unable to find one that she qualified for.</p>
    
    <p>Throughout the year of treatment, there were times when the scans improved and showed the tumors were shrinking, but ultimately the family was given devastating news in early 2025: the cancer had spread to her brain and spinal cord.</p>

    
    </div>
    </div>

    <div className={`${styles.imageContainer} ${styles.animateSlideUp}`}>
          <img src="/images/story-one.jpg" alt="Alison Diminuco and her mom" />
        </div>

<div className={styles.titleWrapper}>
        <h3 className={styles.storyTitleExtra}>Two Wedding Ceremonies: Timeless Memories</h3>

{/* Add the See More button directly below it */}
{!isExpanded && (
  <button className={styles.toggleButton} onClick={() => setIsExpanded(true)}>
    See More
  </button>
)}
</div>
  </section>

<section className={`${styles.fullWidthStory} ${isExpanded ? styles.expanded : styles.collapsed}`}>
  <div className={styles.storyBody}>

    <p>While Denise was in her cancer journey, Alison was engaged and planning a wedding for August 2025. Denise was incredibly excited for her daughter and loved being involved in the planning, sending countless texts and emails and going with Alison to pick out a dress.</p>

    <blockquote className={styles.quote}>
      “My mom loved my husband, Zack. Sometimes I think she loved him more than me. She was really excited about us getting married,” Alison said with a smile. “I definitely think it was helping to get her mind off stuff.”
    </blockquote>

    <p>But, when Denise’s health began to decline and she was not accepted into any clinical trials, Alison was faced with a difficult choice. Uncertain of what the future held, she and Zack decided to postpone their large celebration to March 2026. Instead, Alison planned an intimate backyard wedding at her parents’ home.</p>
    
    <p>Alison and Zack were married on August 14, 2025, her parents’ 32nd wedding anniversary. Denise attended the ceremony outside and witnessed her daughter get married before returning to bed and resting during the small reception.</p>

    <blockquote className={styles.quote}>
      “It was honestly better than I could have ever expected. My parents’ backyard looked absolutely beautiful that day,” Alison said. “I just feel so lucky that my mom got to see me get married. I wouldn’t change it for the world, even if it is how it had to happen.”
    </blockquote>

    <p>Denise passed away at home surrounded by family just 11 days later.</p>

    <p>In March 2026, Alison and Zack celebrated their originally planned wedding with an abundance of friends and family. But there was a big piece missing. The newlyweds decided to honor Alison’s mom by generously donating their whole honeymoon fund, over $3,000, to the Allstars Against Cancer for Cancer Research.</p>

    <blockquote className={styles.quote}>
     <h3>“We know that cancer touches far too many families, including ours, and supporting research just felt like the best way to honor her memory,” Alison said. “We don’t want anyone else to have to go through what we did, and we know that this will help carry her love forward and help others have more time together.”</h3>
    </blockquote>
    <button className={styles.toggleButton} onClick={() => setIsExpanded(false)}>
              See Less
            </button>
  </div>
   </section>

{/* 3. New Reverse Section */}

<section className={styles.storyCardReverse}>
  {/* 1. Image first = Left on Desktop */}
  <div className={`${styles.imageContainer} ${styles.animateSlideUp}`}>
    <img src="/images/story1.jpg" alt="Mechalle" />
  </div>
  
  {/* 2. Text second = Right on Desktop */}
  <div className={`${styles.textContainer} ${styles.animateSlideUp}`}>
    <div className={styles.accentLine}></div>
    <h2 className={styles.storyTitle}>Mechalle</h2>
    
    <div className={styles.storyBody}>
      <p>“When I was diagnosed, I was paralyzed I didn’t know what to do. I didn’t even know what was next.”</p>
      
      <p>A friend recommended that I call the Allstars Against Cancer. I was familiar with their work because of their partnership with CMA and their solid reputation in the entertainment industry.</p>
      
      <p>The Allstars Against Cancer provided quick referrals to specialists at Vanderbilt-Ingram Cancer Center.</p>
      
      <p>The Foundation got me out of being paralyzed and moved me in the direction I needed to go, seeing the doctors I needed to see. I would have never been able to make these connections. I’m eternally grateful to the Allstars Against Cancer for their love, support, direction, compassion, and expertise. I will always do anything I can to help them.</p>
    </div>
  </div>
</section>

{/* New Story Section - Image on Right (Desktop), Column (Mobile) */}
<section className={styles.paulSection}>
  {/* Text on LEFT */}
  <div className={`${styles.textContainer} ${styles.animateSlideUp}`}>
    <div className={styles.accentLine}></div>
    <h2 className={styles.storyTitle}>Paul</h2>
    <div className={styles.storyBody}>
      <p>“It was quite a shock being diagnosed with cancer at 27, and I felt like I'd been thrown into entirely uncharted waters.”</p>
      <p>Thankfully, the Allstars Against Cancer referred me to Mount Sinai in New York, and they took fantastic care of me.</p>
      <p>It was clear from the start that they were the experts in their field. When another team first recommended an aggressive course of chemo that could have been debilitating, Dr. James Holland reviewed my case. He recommended a less invasive procedure of oral chemo, so I never missed a day of work because of side effects.</p>
      <p>They took such good care of me, and I've now been in remission for almost nine years. The advances in treatment have allowed me to preserve my active lifestyle and be the dad I always wanted to be to my three children.</p>
    </div>
  </div>

  {/* Image is second in code, so it appears on the RIGHT on desktop */}
  <div className={`${styles.imageContainer} ${styles.animateSlideUp}`}>
    <img src="/images/paul-story.jpg" alt="Paul" />
  </div>
</section>


<section className={styles.royceSection}>
  {/* 1. Title is now at the top level */}
  <h2 className={styles.royceTitle}>Royce</h2>

  {/* 2. Image */}
  <div className={`${styles.imageContainer} ${styles.animateSlideUp}`}>
    <img src="/images/royce-story.jpg" alt="Royce" />
  </div>
  
  {/* 3. Text Body */}
  <div className={`${styles.textContainer} ${styles.animateSlideUp}`}>
    <div className={styles.storyBody}>
      <p>“When my 8-year-old with autism was diagnosed with cancer, it was overwhelming. We had just been transported by ambulance over 80 miles away from home to Children's Hospital Los Angeles. We left in the middle of the night with no notice and didn't even have an overnight bag!”</p>
      <p>"Oncology" was going to become a central focus of our lives though I didn't know anything about cancer treatment, and my son Royce had never even heard the word cancer before.</p>
      <p>We were so overwhelmed by the numerous invasive medical treatments our son received that we didn't know where to begin or what questions to ask. The T.J. Martell Foundation...</p>
    </div>
  </div>
</section>

{/* New "Our Stories" Section */}
<section id="our-stories" className={styles.ourStoriesSection}>
  <div className={`${styles.animateSlideUp}`}>
    <h2 className={styles.ourStoriesTitle}>Our Stories</h2>
    <p className={styles.ourStoriesDescription}>
      Every life touched by cancer represents a call to action. At the Allstars Against Cancer, we don't just witness these journeys, we actively transform them through strategic research funding and expert navigation. Explore the real-world impact of our mission and the progress we are achieving together.
    </p>
  </div>
</section>

<section className={styles.drSection}>
  {/* 1. Header Area */}
  <div className={`${styles.drHeader} ${styles.animateSlideUp}`}>
    <div className={styles.accentLine}></div>
    <h2 className={styles.storyTitle}>Understanding How Protective Factors in Breast Milk Could Assist Cancer Prevention</h2>
    <h3 className={styles.storyExcerpt}>How Allstars Against Cancer grantee Dr. Deepshika Ramanan’s research in breast milk could impact colorectal cancer prevention</h3>
  </div>

  {/* 2. Image Area */}
  <div className={`${styles.drImage} ${styles.imageContainer} ${styles.animateSlideUp}`}>
    <img src="/images/Dr-story.png" alt="Dr. Story" />
  </div>

      <div className={`${styles.drBody} ${styles.storyBody} ${styles.animateSlideUp}`}>
    <p>
      Colorectal cancer was once thought of as a disease that primarily impacted elderly patients. Now, 
      colorectal cancer is the leading cause of cancer-related death for men and second for women 
      under the age of 50 in the U.S. Approximately 154,000 new cases were diagnosed in 2025.
    </p>

    <p>
      These staggering statistics drew career immunologist and Allstars Against Cancerfor Cancer Research 
      grantee Deepshika Ramanan, Ph.D., Assistant Professor at Salk Cancer Center in La Jolla, 
      California, into cancer research. Why is colorectal cancer impacting younger and younger 
      patients? How can patients’ immune systems influence future colorectal cancer risk? 
      How do environmental influences play a role in patients’ immune systems and colorectal cancer? 
      These questions are the basis of Dr. Ramanan’s work.
    </p>

    <p>
      “My research looks at early life exposures such as breast milk, and then as you grow older 
      other factors in the environment such as infection and how that changes your intestine and 
      your intestinal immune system?” Dr. Ramanan said. “Then, it was a very natural transition 
      into looking at how these environmental changes, including changes to the microbes that 
      live in your intestines, impacts susceptibility to colorectal cancer?”
    </p>
  </div>
  

 
</section>


<section className={styles.doctorsSection}>
  {/* 1. Header Area */}
  <div className={`${styles.doctorsHeader} ${styles.animateSlideUp}`}>
    <div className={styles.accentLine}></div>
    <h2 className={styles.storyTitle}>Going Big Against Cancer</h2>
    <h3 className={styles.storyExcerpt}>How Chrystal Paulos is tuning bold T cells science into hope for patients.</h3>
  </div>

  {/* 2. Image Area */}
  <div className={`${styles.doctorsImage} ${styles.imageContainer} ${styles.animateSlideUp}`}>
    <img src="/images/Doctors-story.png" alt="Dr. Story" />
  </div>

      <div className={`${styles.doctorsBody} ${styles.storyBody} ${styles.animateSlideUp}`}>
    <p>
      Chrystal Paulos, Ph.D., co-leader of the Cancer Immunology Program at Winship Cancer Institute of Emory University, didn’t grow up dreaming of becoming a cancer researcher.
    </p>

    <p>
      When she began her doctorate training in chemistry at Purdue University, her ambitions were far from the clinic. Inspired by her grandmother, Dr. Paulos initially envisioned a career designing perfumes.
    </p>

    <p>
    “As a kid, I always loved the way my grandmother smelled,” Dr. Paulos said. “She would show me all of her perfume bottles. I liked chemistry and was fascinated by molecules. So, I decided to get a Ph.D. in Chemistry, and specifically, I wanted to make new perfumes.”
    </p>

    <p>
    But then life intervened.
    </p>
  </div>
  
</section>

<section className={styles.groupSection}>
  
  {/* Image Area */}
  <div className={`${styles.groupImage} ${styles.imageContainer} ${styles.animateSlideUp}`}>
    <img src="/images/Group-story.png" alt="Group Story" />
  </div>

  {/* Body Area */}
  <div className={`${styles.groupBody} ${styles.storyBody} ${styles.animateSlideUp}`}>
    <p>
      While Dr. Paulos was training in a small molecule lab, her grandmother was diagnosed with breast cancer. 
      That moment reshaped not only her career trajectory, but her sense of purpose.
    </p>

    <p>
      “I was in a lab that made small molecules not just for perfumes, but also small molecules that 
      targeted cancer,” Dr. Paulos said. “So, I really shifted my gears towards that and decided that 
      was much more exciting.”
    </p>

    <p>
      For her, cancer is not an abstract scientific problem. It is deeply personal. That reality 
      continues to drive her work and her determination to rethink how cancer is treated.
    </p>

    <p>
      “Cancer is not just the textbook definition – it’s our families, our friends, and how it shapes 
      us,” Dr. Paulos said. “My goal is really simple and heartfelt: to give people more time with the 
      people that they love. And that’s why I’ve dedicated my career to designing smarter, better, 
      more potent T cells that can stand against these harsh, nasty cancers.”
    </p>
  </div>

</section>


<section className={styles.ctaSection} ref={ctaRef}>
  <div className={`${styles.ctaContentContainer} ${styles.animateSlideUp} ${isCtaVisible ? styles.isVisible : ''}`}>
    <div className={styles.ctaContent}>
      <h2 className={styles.ctaHeading}>HELP US FIND A CURE FOR CANCER.</h2>
      
      {/* THIS IS THE UPDATED LINE */}
      <Link href={`/donate?from=${typeof window !== 'undefined' ? window.location.pathname : '/stories'}`}>
        <button className={styles.ctaButton}>Donate</button>
      </Link>
      
    </div>
  </div>
</section>



    </div>
  );
}