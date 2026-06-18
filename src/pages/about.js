import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/about.module.css';
import { useCampaign } from '../context/CampaignContext';
import Link from 'next/link';


export default function About() {
  const [openSection, setOpenSection] = useState(null);
  const { activeSlug } = useCampaign();
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const storyRef = useRef(null);
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const factsRef = useRef(null); 
  const [areFactsVisible, setAreFactsVisible] = useState(false);
  const [isLeadershipVisible, setIsLeadershipVisible] = useState(false);
  const leadershipRef = useRef(null);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const ctaRef = useRef(null);

  const principles = [
  { title: "PROGRESSIVE", text: "We stay fluid and forward-focused, embracing the change necessary to act, react, and pivot in ways that match the urgency of the moment." },
  { title: "INNOVATIVE", text: "We ensure our organization stays ahead of the curve by funding pioneering research focused entirely on advancing early detection methods, screenings, and new treatment options." },
  { title: "COURAGEOUS", text: "We fund research that is unconventional and perhaps goes unnoticed. Research that has a seed of possibility. We’re willing to fail because we know that when we succeed, the results are life-changing." },
  { title: "TRANSPARENT", text: "We believe that trust is built through absolute clarity. We are committed to showing exactly where every donation goes, ensuring our community sees the direct, real-world impact of their generosity on cancer research and patient support." },
  { title: "HONORABLE", text: "We are guided by an unwavering ethical compass. From administrative choices to research grants, we ensure our actions reflect a profound sense of responsibility, transparency, and institutional honor." },
  { title: "IMPACTFUL", text: "We focus our resources exactly where they matter most. By targeting high-potential research and pioneering clinical programs, we maximize every single dollar to ensure it directly accelerates life-saving outcomes." },
  ]

  const cancerFacts = [
  { id: "01", title: "2,001,140", text: "The number of people in the U.S. who are projected to be diagnosed with cancer in 2024." },
  { id: "02", title: "42% and 40%", text: "In the U.S., an estimated 42 out of 100 men and 40 out of 100 women will develop cancer in their lifetime." },
  { id: "03", title: "9,620 Children", text: "In 2024, an estimated 9,620 children ages 0-14 in the United States will be diagnosed with cancer." },
  { id: "04", title: "Types of Cancer", text: "There are more than 100 types of cancer." },
  { id: "05", title: "Common Cancers", text: "The most common cancers (listed in descending order according to estimated new cases in 2024) are for men: prostate cancer, lung & bronchus cancer, colorectal cancers, urinary bladder cancer and melanoma of the skin; for women: breast cancer, lung and bronchus cancer, colorectal cancer, uterine cancer and melanoma of the skin." },
  { id: "06", title: "Stages", text: "Most cancers are categorized by stage. “Stage 0” cancer is called “in situ.” This means abnormal cells have stayed with the originating cell layer. “Stage I” is localized and easiest to treat. “Stage IV” means abnormal cells have spread the farthest. This is the most difficult stage to treat." },
  { id: "07", title: "Survival Rates", text: "There are an estimated 18.1 million cancer survivors in the United States. The number of survivors is expected to increase to 22.5 million by 2032." },
  { id: "08", title: "611,720", text: "In 2024, an estimated 611,720 will die of cancer, an average of almost 1,680 people per day." },
  ]
   
  const leadershipData = {
  label: "LEADERSHIP",
  title: "Icons Who Direct the Rhythm of Change",
  intro: "For years, we’ve united the voices of the entertainment world to demand more for patients. We aren’t just funding research; we are fueling a revolution in early detection and personalized treatment.",
  subtext: "We are powered by a collective of industry leaders the trailblazers, creators, and visionaries who turn their global influence into a life-saving engine.",
  verticalsTitle: "The Industry, Unified",
  verticalsText: "From the sound booth to the boardroom, we bridge the gap between media, management, and live entertainment to ensure that no stage is left without a mission.",
  savingLivesTitle: "From the Limelight to the Laboratory",
  savingLivesText: "Our expertise drives music forward, but today, it drives progress. We are taking the influence, the networks, and the relentless passion of the entertainment industry to the front lines of cancer research.",
  savingLivesSubtext: "Music elevates the human experience. Now, we are using that same power to save lives funding the high-risk, high-reward breakthroughs that will turn 'cancer' into a memory.",
  trusteesTitle: "The Architects of Hope",
  trusteesText: "This is the power of a movement. This is the power of community. Our leaders aren't just shaping the future of music; they are rewriting the future of medicine."
};

const boardData = {
  executiveCommittee: [
    { id: 1, name: "Julian Vane", title: "Lead Strategic Architect & Board Chair" },
    { id: 2, name: "Marcus Thorne", title: "Brand Visionary & Industry Liaison" },
    { id: 3, name: "Elena Sterling", title: "Creative Growth Strategist" },
    { id: 4, name: "Silas Vance", title: "Operational Impact Lead" },
    { id: 5, name: "Nadia Moretti", title: "Artist Advocacy & Network Director" },
    { id: 6, name: "Arthur Kensington", title: "Global Policy & Research Advocate" },
    { id: 7, name: "Jaxon Reed", title: "Digital Innovation & Equity Liaison" },
    { id: 8, name: "Sienna Bishop", title: "Foundation Outreach Director" }
  ],
  trustees: [
    { id: 9, name: "Liam Fitzgerald", title: "Media & Awareness Ambassador" },
    { id: 10, name: "Chloe St. James", title: "Live Event & Experience Partner" },
    { id: 11, name: "Dr. Aris Thorne", title: "Scientific Advisory Liaison" },
    { id: 12, name: "Caleb Halloway", title: "Broadcasting & Reach Strategist" },
    { id: 13, name: "Maya Rivera", title: "Partnership & Engagement Lead" },
    { id: 14, name: "Derek ", title: "Artist Relations & Community Lead" },
    { id: 15, name: "Tess Montgomery", title: "Tech-Forward Awareness Catalyst" },
    { id: 16, name: "Simone Gable", title: "Copyright & Foundation Advocate" },
    { id: 17, name: "Victor Cross", title: "Global Touring & Impact Lead" },
    { id: 18, name: "Kairo Banks", title: "Next-Gen Cultural Liaison" },
    { id: 19, name: "Fiona Prescott", title: "Strategic Partnership Catalyst" },
    { id: 20, name: "Grant Sterling", title: "Venue & Operational Strategist" }
  ]
};


 useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Intersecting:", entry.target);
          if (entry.target === textRef.current) setIsVisible(true);
          if (entry.target === storyRef.current) setIsStoryVisible(true);
          if (entry.target === factsRef.current) setAreFactsVisible(true);
          if (entry.target === leadershipRef.current) setIsLeadershipVisible(true);
          if (entry.target === ctaRef.current) setIsCtaVisible(true);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (textRef.current) observer.observe(textRef.current);
  if (storyRef.current) observer.observe(storyRef.current);
  if (factsRef.current) observer.observe(factsRef.current);
  if (leadershipRef.current) observer.observe(leadershipRef.current);
  if (ctaRef.current) observer.observe(ctaRef.current);

  return () => observer.disconnect();
}, []);

  return (
    
    <div className={styles.aboutContainer}>
      <section id="about-us" className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h3 className={styles.label}>WHO WE ARE</h3>
          <h1 className={styles.title}>
            ICONS AND FANS UNITED TO FIGH<span className={styles.mobileAccent}>T</span> CAN<span className={styles.mobileAccent}>CE</span>R.
          </h1>
          <p className={styles.description}>
            Innovation is our rhythm. We empower the researchers wh<span className={styles.mobileAccent}>o are pu</span>
            shing the boundaries of early detection and personalized treatment. 
            Through many years of dedicated grants, we are not just funding science; 
            we are rewriting the future of cancer care.
          </p>
        </div>
        {/* The background image is handled via CSS for better responsiveness */}
      </section>
    

    
  <section className={styles.impactSection}>
        <div className={styles.impactBox}>
          {/* Attributes fixed below: */}
          <h2 
            ref={textRef} 
            className={`${styles.impactText} ${isVisible ? styles.animateSlideUp : ''}`}
          >
            "THERE IS A CURE SOMEWHERE. WE JUST HAVEN'T FOUND IT YET, BUT WE WILL."
          </h2>
          {activeSlug && (
        <p className={`${styles.slugSubtext} ${isVisible ? styles.animateSlideUp : ''}`}>
        - {activeSlug.replace(/-/g, ' ').toUpperCase()}
        </p>
         )}
          <div className={styles.patternOverlay}></div>
        </div>
      </section>


      <section id="mission" className={styles.missionSection}>
         <div className={styles.missionContent}>
           <h2 className={styles.missionHeading}>OUR MISSION</h2>
            <p className={styles.missionSubtext}>
               To cure cancer by uniting global icons and fan communities
                to fund high-risk, high-reward research that could lead to 
              trailblazing advancements in early detection, screening, and treatment.
             </p>
          </div>
        </section>

        <section id="principles" className={styles.principlesSection}>
         <h3 className={styles.principlesHeader}>OUR PRINCIPLES</h3>
         <div className={styles.principlesBox}>
           {principles.map((p, index) => (
           <div key={index} className={styles.principleItem}>
             <h2 className={styles.principleTitle}>{p.title}</h2>
               <p className={styles.principleText}>{p.text}</p>
               </div>
                 ))}
             </div>
          </section>


         <section id="story" ref={storyRef} className={styles.storySection}>
         <div className={`${styles.storyContent} ${isStoryVisible ? styles.animateSlideUp : ''}`}>
          <h2 className={styles.storyHeading}>OUR STORY</h2>
         <p className={styles.storyText}>
         Years ago, a legendary entertainer sat with a friend who had just received a diagnosis that would change everything. 
         The conversation was brief, but the weight of it was immense. In the face of uncertainty, a simple, raw promise was made: 
         “We will not stand by. We will use the voices we’ve been given to find the answers that don’t exist yet.”
         That night, the stage felt different. The music played, the lights shone, but there was a new, urgent purpose in the air. 
         That promise became the blueprint for All Stars Against Cancer.
</p>

<p className={styles.storyText}>
    We were born from the realization that while some stars are destined to shine on stage, others are destined to shine in the 
    laboratory the researchers, the unsung heroes who push past the "impossible" to find the cure. We realized that if we could unite the
     passion of the entertainment world with the brilliance of scientific minds, we could do more than just fund research; we could accelerate hope.
</p>

     <img 
      src="/images/about-story-two.jpg" 
      className={styles.mobileVisibleImg}
      alt="Story 1" 
    />
   
    <p className={styles.storyText}>
    We are coming from a place of deep, personal connection. We know what it means to lose, but more importantly, 
    we know what it means to fight. Today, All Stars Against Cancer stands as a bridge between the front row and the
     front line of cancer research. 
    </p>

    <p className={styles.storyText}>
      Every grant we fund, every breakthrough we champion, is a testament to that original promise.
    We are here because we believe that while the cure might be hidden, it is not lost. And as long as we have a voice, 
    we will keep singing, keep fighting, and keep pushing until the day that "cancer" is a word found only in history books.
    </p>

     <img 
      src="/images/about-story-one.jpg" 
      className={styles.mobileVisibleImg} 
      alt="Story 2" 
     /> 
  </div>
  
  
  <div className={`${styles.storyImages} ${isStoryVisible ? styles.animateSlideRight : ''}`}>
  
    <img src="/images/about-story-two.jpg" alt="About Story 1" className={styles.mainImg} />
    <img src="/images/about-story-one.jpg" alt="About Story 2" className={styles.subImg} />
  </div>
  
</section>


<section id="leadership"className={styles.lsLeadershipSection}>
      <div className={styles.lsContainer}>
        {/* Change .label to .lsLabel */}
        <h3 className={styles.lsLabel}>{leadershipData.label}</h3>
        
        <div 
      ref={leadershipRef} 
      className={`${styles.lsContentContainer} ${isLeadershipVisible ? styles.animateSlideUp : ''}`}
    >
        <h2 className={styles.lsTitle}>{leadershipData.title}</h2>
        
        {/* Change .text to .lsText */}
        <p className={styles.lsText}>{leadershipData.intro}</p>
        <p className={styles.lsText}>{leadershipData.subtext}</p>
        
        <h2 className={styles.lsVerticalsTitle}>{leadershipData.verticalsTitle}</h2>
        <p className={styles.lsText}>{leadershipData.verticalsText}</p>

        <h2 className={styles.lsVerticalsTitle}>{leadershipData.savingLivesTitle}</h2>
        <p className={styles.lsText}>{leadershipData.savingLivesText}</p>
        <p className={styles.lsText}>{leadershipData.savingLivesSubtext}</p>
        
        <h2 className={styles.lsVerticalsTitle}>{leadershipData.trusteesTitle}</h2>
        <p className={styles.lsText}>{leadershipData.trusteesText}</p>

        {/* --- Board of Trustees Section --- */}
<h2 className={styles.lsVerticalsTitle}>Board of Trustees</h2>

{/* DESKTOP VIEW */}
<div className={styles.desktopView}>
  <div className={styles.col}>
    <h3 className={styles.boardSubHeader}>Executive Committee</h3>
    <ul className={styles.boardList}>
      {boardData.executiveCommittee.map((m) => (
        <li key={m.id}><strong>{m.name}</strong>, {m.title}</li>
      ))}
    </ul>
  </div>
  <div className={styles.col}>
    <h3 className={styles.boardSubHeader}>Trustees</h3>
    <ul className={styles.boardList}>
      {boardData.trustees.map((m) => (
        <li key={m.id}><strong>{m.name}</strong>, {m.title}</li>
      ))}
    </ul>
  </div>
</div>

{/* MOBILE/TABLET ACCORDION */}
<div className={styles.mobileAccordionView}>
  {[
    { title: "Executive Committee", key: 'executiveCommittee' },
    { title: "Trustees", key: 'trustees' }
  ].map((section) => (
    <div key={section.key} className={styles.accordionWrapper}>
      <div className={styles.accordionItem} onClick={() => setOpenSection(openSection === section.key ? null : section.key)}>
        <span>{section.title}</span>
        <span>{openSection === section.key ? '-' : '+'}</span>
      </div>
      {openSection === section.key && (
        <ul className={styles.accordionContent}>
          {boardData[section.key].map((m) => (
            <li key={m.id}><strong>{m.name}</strong>, {m.title}</li>
          ))}
        </ul>
      )}
    </div>
  ))}
</div>
</div>
      </div>
    </section>



<section id="facts" ref={factsRef} className={styles.factsSection}>
  <h2 className={styles.sectionHeading}>Cancer Facts</h2>
  
  
  <div className={`${styles.factsGrid} ${areFactsVisible ? styles.animateFadeIn : ''}`}>
  {cancerFacts.map((fact, index) => (
    <div 
      key={fact.id} 
      className={styles.factCard}
      // This delay makes them appear one after another
      style={{ transitionDelay: `${index * 0.5}s` }} 
    >
      <span className={styles.factNumber}>{fact.id}</span>
      <h3 className={styles.factTitle}>{fact.title}</h3>
      <p className={styles.factText}>{fact.text}</p>
    </div>
  ))}
</div>
</section>

<section className={styles.ctaSection} ref={ctaRef}>
  <div className={`${styles.ctaContentContainer} ${isCtaVisible ? styles.animateSlideUp : ''}`}>
    <div className={styles.ctaContent}>
      <h2 className={styles.ctaHeading}>HELP US FIND A CURE FOR CANCER.</h2>
     
      <Link href={`/donate?from=/about`}>
      <button className={styles.ctaButton}>Donate</button>
      </Link>
    </div>
  </div>
</section>
    </div>
  );
}