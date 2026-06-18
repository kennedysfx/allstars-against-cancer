import styles from '../styles/events.module.css';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';


const useScrollFade = () => {
  const elementRef = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.isVisible);
        }
      });
    }, { threshold: 0.1 });
    
    elementRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return elementRef;
};

const eventLinks = [
  { name: 'Events & Fundraisers', path: '/events' },
  { name: 'Relive the Impact', path: '#relive' }, // Use hash for same-page scroll
  { name: 'Headline Events', path: '#headlines' }, // Use hash for same-page scroll
  { name: 'Fundraise for the Cause', path: '#fundraise-cta' },
];


const eventPhotos = [
  {
    src: '/images/events1.jpg',
    title: 'Los Angeles Wine Dinner',
    date: 'January 29, 2026',
    linkText: 'As Seen at the Event'
  },
  {
    src: '/images/events2.jpg',
    title: '2026 Nashville Best Cellars',
    date: 'April 14, 2026',
    linkText: 'As Seen at the Event'
  },
  {
    src: '/images/events3.jpg',
    title: 'The New York Honors Gala',
    date: 'March 4, 2022',
    linkText: 'As Seen at the Event'
  },
  {
    src: '/images/events4.jpg',
    title: 'Napas Best Cellar Dinner',
    date: 'febuary 20, 2025',
    linkText: 'As Seen at the Event'
  },
  {
    src: '/images/events5.jpg',
    title: 'The New York Honors Gala - Kickoff Breakfastr',
    date: 'September 13, 2024',
    linkText: 'As Seen at the Event'
  },
  {
    src: '/images/events6.jpg',
    title: 'Los Angeles Wine Dinner',
    date: 'March 20, 2025',
    linkText: 'As Seen at the Event'
  },
  
  // Add more as needed
];

const pressItems = [
  { pub: 'Billboard Country Update', title: 'Celebrity Performers Unite with Allstars Against Cancer to Support Life-Saving Research', link: '#' },
  { pub: 'Country Insider', title: 'Allstars Against Cancer 2026 Nashville Gala Highlights Musical Impact in the Fight Against Cancer', link: '#' },
  { pub: 'People', title: 'Star-Studded Performances', link: '#' },
  { pub: 'The Hollywood Reporter', title: 'Allstars Against Cancer Annual Benefit', link: '#' },
  { pub: 'The Morning Hangover', title: 'Allstars Against Cancer Best Cellars Dinner Honored in "On the Bar Wall" Recap', link: '#' },
  { pub: 'Kicks', title: 'Fans are Freaking Out Over What Morgan Wallen Wore to Perform', link: '#' },
  { pub: 'Celebrity Access', title: 'MOrgan Wallen, Ernest and Hardy set to perform at AllStars Aginst Cancer Gala Honoring Seth England', link: '#' },
  { pub: 'HITS Daily Double', title: 'Its Too Late to Get This Hits Photo Gallery Thrown Off the Ballot', link: '#' },
];

const archiveItems = [
  { pub: 'Music Row', title: 'Allstars Against Cancer Hosts 22nd Annual Nashville’s Best Cellars Dinner', link: '#' },
  { pub: 'Yahoo!', title: 'Celebrity Guests Shine at Allstars Against Cancer Benefit Dinner', link: '#' },
  { pub: 'People', title: 'Allstars Against Cancer Gala Highlights', link: '#' },
  { pub: 'Women\'s Wear Daily', title: 'Red Carpet Styles at Allstars Against Cancer Nashville Benefit', link: '#' },
  { pub: 'People', title: 'Best Red Carpet Style Photos', link: '#' }
];

const napaArchiveItems = [
  { pub: 'Wine Industry Advisor', title: 'The Allstars Against Cancer Foundation to Host Napa’s Best Cellars Wine Dinner: A Night of Music, Wine, and Unmatched Excellence', link: '#' },
  { pub: 'Napa Valley Register', title: 'The Allstars Against Cancer Foundation to Host Napa’s Best Cellars Wine Dinner', link: '#' }
];

const napaArchive = {
  title: "May 2025: Napa's Best Cellars Dinner",
  preGala: [
    { pub: 'Wine Industry Advisor', title: 'The Allstars Against Cancer Foundation to Host Napa’s Best Cellars Wine Dinner: A Night of Music, Wine, and Unmatched Excellence', link: '#' },
    { pub: 'Napa Valley Life', title: 'Celebrity Chefs and Musicians Set for Napa Fundraiser', link: '#' },
    { pub: 'Culinary Monthly', title: 'A Peek Inside the Upcoming Best Cellars Dinner', link: '#' }
  ],
  postGala: [
    { pub: 'Napa Valley Register', title: 'The Allstars Against Cancer Foundation to Host Napa’s Best Cellars Wine Dinner', link: '#' },
    { pub: 'Wine Spectator', title: 'Music and Fine Wine Unite at Napa Gala', link: '#' },
    { pub: 'Local Gazette', title: 'A Memorable Evening for Cancer Research in Napa', link: '#' }
  ]
};

const gala2024Archive = {
  title: "September 2024: New York Honors Gala",
  preGala: [
    { pub: 'New York Times', title: 'Honoring Leaders in Cancer Research', link: '#' },
    { pub: 'Event Daily', title: 'Gala Preparations Underway', link: '#' }
  ],
  postGala: [
    { pub: 'Billboard', title: 'Record-Breaking Night for Research', link: '#' },
    { pub: 'Variety', title: 'Stars Align for a Cause', link: '#' }
  ]
};

export default function EventsPage() {
 const refs = useScrollFade(); 
  const addToRefs = (el) => { if (el && !refs.current.includes(el)) refs.current.push(el); };

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroContainer}>
        <div className={`${styles.heroContent} ${styles.fadeUp}`} ref={addToRefs}>
        <h1 className={styles.heroHeading}>
          Events & Fundraiser
        </h1>
        </div>
      </section>

      <section className={styles.descriptionSection}>
        <div className={`${styles.descriptionSection} ${styles.fadeUp}`} ref={addToRefs}>
  <p className={styles.descriptionText}>
    The AllStars Against Cancer Foundation and our collaborators organize many events throughout the year 
    to help raise money for cancer research. From Signature Events like our formal 
    galas, to marathons and DIY efforts, each one is integral in raising funds in 
    the fight to achieve Victory Over Cancer.
  </p>
  </div>
</section>

<section id="relive" className={styles.reliveSection}>
  <div className={`${styles.heroContent} ${styles.fadeUp}`} ref={addToRefs}>
  <h2 className={styles.reliveTitle}>Relive the Impact</h2>
  <p className={styles.reliveDescription}>
    Explore the highlights from our recent gatherings. Dive into event photos, watch recap videos, and flip through our digital journals to see the difference we're making together.
  </p>
  

  <div className={`${styles.imageGrid} ${styles.fadeUp}`} ref={addToRefs}>
  {eventPhotos.map((item, index) => (
    <div key={index} className={styles.eventCard}>
      <img src={item.src} alt={item.title} className={styles.eventImage} />
      <h3 className={styles.eventTitle}>{item.title}</h3>
      <p className={styles.eventDate}>{item.date}</p>
      <a href="#" className={styles.eventLink}>{item.linkText} · View Event Photos</a>
    </div>
  ))}
</div>
</div>
</section>

<section id="headlines" className={styles.headlinesSection}>
 <div className={`${styles.contentBox} ${styles.fadeUp}`} ref={addToRefs}>
  <h2 className={styles.headlinesTitle}>Our Events Are Making Headlines</h2>
  <p className={styles.headlinesSubtitle}>
    Read how the press is covering our mission, our milestones, and the music community’s commitment to curing cancer.
  </p>

  <h3 className={styles.eventDateHeading}>September 2026: New York Honors Gala</h3>

  <div className={`${styles.pressGrid} ${styles.fadeUp}`} ref={addToRefs}>
    {pressItems.map((item, index) => (
      <div key={index} className={styles.pressItem}>
        <div className={styles.publicationName}>{item.pub}</div>
        <a href={item.link} className={styles.headlineLink}>{item.title}</a>
      </div>
    ))}
  </div>
  </div>
</section>



<section className={styles.headlinesSection}>
  <div className={`${styles.contentBox} ${styles.fadeUp}`} ref={addToRefs}>
  {/* Omitted Title and Subtitle as requested */}
<h3 className={styles.eventDateHeading}>April 2026: Nashville’s Best Cellars Dinner</h3>
  
  <div className={`${styles.pressGrid} ${styles.fadeUp}`} ref={addToRefs}>
    {/* Map your archived items here */}
    {archiveItems.map((item, index) => (
      <div key={index} className={styles.pressItem}>
        <div className={styles.publicationName}>{item.pub}</div>
        <a href={item.link} className={styles.headlineLink}>{item.title}</a>
      </div>
    ))}
  </div>
  </div>
</section>

<section className={styles.headlinesSection}>
   <div className={`${styles.contentBox} ${styles.fadeUp}`} ref={addToRefs}>
  {/* Omitted Title and Subtitle as requested */}
<h3 className={styles.eventDateHeading}>Febuary 2025: Napas Best Seller Dinner</h3>
  
  <div className={`${styles.pressGrid} ${styles.fadeUp}`} ref={addToRefs}>
    {/* Map your archived items here */}
    {napaArchiveItems.map((item, index) => (
      <div key={index} className={styles.pressItem}>
        <div className={styles.publicationName}>{item.pub}</div>
        <a href={item.link} className={styles.headlineLink}>{item.title}</a>
      </div>
    ))}
  </div>
  </div>
</section>

<section className={styles.headlinesSection}>
  <div className={`${styles.contentBox} ${styles.fadeUp}`} ref={addToRefs}>
  <h3 className={styles.eventDateHeading}>{napaArchive.title}</h3>
  
  <div className={`${styles.pressGrid} ${styles.fadeUp}`} ref={addToRefs}>
    {/* Left Column: Pre-Gala */}
    <div>
      <h4 className={styles.phaseHeader}>Pre-Gala</h4>
      {napaArchive.preGala.map((item, index) => (
        <div key={index} className={styles.pressItem}>
          <div className={styles.publicationName}>{item.pub}</div>
          <a href={item.link} className={styles.headlineLink}>{item.title}</a>
        </div>
      ))}
    </div>


    {/* Right Column: Post-Gala */}
    <div>
      <h4 className={styles.phaseHeader}>Post-Gala</h4>
      {napaArchive.postGala.map((item, index) => (
        <div key={index} className={styles.pressItem}>
          <div className={styles.publicationName}>{item.pub}</div>
          <a href={item.link} className={styles.headlineLink}>{item.title}</a>
        </div>
      ))}
    </div>
  </div>
  </div>
</section>

<section className={styles.headlinesSection}>
  <div className={`${styles.contentBox} ${styles.fadeUp}`} ref={addToRefs}>
  <h3 className={styles.eventDateHeading}>{gala2024Archive.title}</h3>
  
 <div className={`${styles.pressGrid} ${styles.fadeUp}`} ref={addToRefs}>
    {/* Left Column: Pre-Gala */}
    <div>
      <h4 className={styles.phaseHeader}>Pre-Gala</h4>
      {gala2024Archive.preGala.map((item, index) => (
        <div key={index} className={styles.pressItem}>
          <div className={styles.publicationName}>{item.pub}</div>
          <a href={item.link} className={styles.headlineLink}>{item.title}</a>
        </div>
      ))}
    </div>

    {/* Right Column: Post-Gala */}
    <div>
      <h4 className={styles.phaseHeader}>Post-Gala</h4>
      {gala2024Archive.postGala.map((item, index) => (
        <div key={index} className={styles.pressItem}>
          <div className={styles.publicationName}>{item.pub}</div>
          <a href={item.link} className={styles.headlineLink}>{item.title}</a>
        </div>
      ))}
    </div>
  </div>
  </div>
</section>

 <section id="fundraise-cta" className={styles.ctaSection}>
                  <div className={styles.ctaContentContainer}>
                  <div className={`${styles.ctaContent} ${styles.fadeUp}`} ref={addToRefs}>
                    <h2 className={styles.ctaHeading}>HELP US FIND A CURE FOR CANCER.</h2>
      
                     {/* Ensure 'Link' is imported from 'next/link' at the top of your file */}
                     <Link href={`/donate?from=${typeof window !== 'undefined' ? window.location.pathname : '/research'}`}>
                       <button className={styles.ctaButton}>Donate</button>
                     </Link>
                   </div>
                 </div>
               </section>

              

    </div>
  );
}

