import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/research.module.css';
import TestimonialSection from '../components/TestimonialSection';

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

const ResearchHero = () => {
  const [openSection, setOpenSection] = useState(null);
  const refs = useScrollFade(); 
  const addToRefs = (el) => { if (el && !refs.current.includes(el)) refs.current.push(el); };

  
const researchData = [
    { 
      id: 1, 
      title: "City of Hope", 
      location: "Duarte, California", 
      desc: "City of Hope’s dedicated research initiatives, supported by our foundation, are pushing the boundaries of bone marrow transplantation and advanced chimeric antigen receptor (CAR) T-cell therapy. Their team is currently leading clinical investigations to improve patient outcomes in hematologic malignancies, focusing on personalized medicine and immunotherapy protocols that aim to maximize treatment efficacy while minimizing long-term toxicity for survivors."
    },
    { 
      id: 2, 
      title: "The Wistar Institute", 
      location: "Philadelphia, Pennsylvania", 
      desc: "As the nation’s first independent biomedical research facility, Wistar focuses on basic research that unveils the fundamental molecular mechanisms of cancer, paving the way for next-generation treatments. Their interdisciplinary teams are actively engaged in dissecting the immune system’s role in tumor progression and developing novel vaccine strategies. Through our partnership, Wistar investigators are translating these complex biological insights into clinical applications that hold the potential to revolutionize how we identify and combat malignant diseases at their earliest stages."
    },
     { 
      id: 3, 
      title: "Vanderbilt-Ingram Cancer Center", 
      location: "Nashville, Tennessee", 
      desc: "Our partnership supports their quest to translate basic science discoveries into new clinical trials, with a specific focus on drug discovery and precision medicine for underserved patient populations. By utilizing advanced genomic profiling and high-throughput screening technologies, their researchers are identifying unique biomarkers that allow for more tailored, effective therapeutic interventions. This collaborative effort ensures that groundbreaking discoveries move swiftly from the laboratory bench to the patient bedside, significantly improving the landscape of care for those battling complex malignancies."
    },
    { 
      id: 4, 
      title: "Dana-Farber Cancer Institute", 
      location: "Boston, Massachusetts", 
      desc: "A world-renowned leader in cancer research, Dana-Farber leverages AllStars Against Cancer Foundation support to accelerate the development of personalized immunotherapies for difficult-to-treat malignancies. Their comprehensive research initiatives focus on harnessing the body's immune system to identify and neutralize cancer cells with unprecedented precision. By integrating state-of-the-art laboratory discoveries with expansive clinical trial networks, they are actively defining the next generation of cancer care, ensuring that innovative, life-saving therapies are accessible to patients facing the most challenging diagnoses."
    },
     { 
      id: 5, 
      title: "The University of Texas MD Anderson Cancer Center", 
      location: "Houston, Texas", 
      desc: "By focusing on high-risk, high-reward research initiatives, our support enables investigators at MD Anderson to explore the complexities of immune intra-tumor heterogeneity. Their pioneering research digs deep into how diverse cell populations within a single tumor evolve and resist conventional therapies. Through this granular understanding of the tumor microenvironment, the center is developing innovative, adaptive therapeutic strategies that promise to overcome treatment resistance and provide more durable, long-term remission for patients facing aggressive forms of cancer."
    },
    { 
      id: 6, 
      title: "UCSF Helen Diller Family Comprehensive Cancer Center", 
      location: "San Francisco, California", 
      desc: "The foundation has supported critical studies at UCSF that have led to a new, deeper understanding of brain tumor biology, opening doors to previously unexplored therapeutic pathways. Their dedicated team of neuro-oncologists and laboratory scientists are working to map the complex genetic landscapes of neurological malignancies, allowing for the development of targeted therapies that can penetrate the blood-brain barrier more effectively. This research is instrumental in transforming brain cancer treatment from a field of limited options to one defined by precision diagnostics and highly effective, personalized patient care strategies."
    },
    { 
      id: 7, 
      title: "Tisch Cancer Institute", 
      location: "New York, New York", 
      desc: "Focusing on highly innovative early-stage research, the institute works to turn bold scientific ideas into viable clinical breakthroughs for patients in need of new options. By fostering a collaborative environment that integrates laboratory scientists with expert oncologists, they are able to rapidly accelerate the development of novel therapies for a wide spectrum of malignancies. Their work is centered on bridging the critical gap between basic scientific discovery and real-world clinical application, ultimately ensuring that patients have access to the most advanced, life-saving medical advancements as quickly as possible."
    },
    { 
      id: 8, 
      title: "Memorial Sloan-Kettering Cancer Center", 
      location: "New York, New York", 
      desc: "Lung cancer investigators have discovered that immune cell populations in different regions within the same tumors are distinct, a phenomenon that is leading to new, more targeted treatment approaches. This breakthrough in understanding intra-tumoral heterogeneity reveals why some areas of a tumor may respond to therapy while others continue to grow. By mapping these complex immune landscapes, their researchers are developing sophisticated strategies to overcome treatment resistance, aiming to deliver more precise, effective interventions that address the unique biological characteristics of every patient’s cancer."
    },
    { 
      id: 9, 
      title: "Herbert Irving Comprehensive Cancer Center", 
      location: "New York, New York", 
      desc: "AllStars Against Cancer Foundation has been a driving force behind innovative research here, helping researchers bridge the gap between initial discovery and securing large-scale institutional funding. By providing essential early-stage support, we empower their scientists to conduct the high-impact pilot studies necessary to prove the feasibility of revolutionary medical hypotheses. This partnership creates a vital pipeline of discovery, ensuring that promising laboratory concepts are successfully matured into comprehensive clinical trials that ultimately expand treatment options for patients worldwide."
    },
    {
      id: 10, 
      title: "Children's Hospital Los Angeles", 
      location: "Los Angeles, California", 
      desc: "The Pediatric Cancer Research Program at CHLA brings together laboratory and clinical investigators to focus on the most challenging childhood cancers, concentrating on the biology and therapy of tumor cells interacting with surrounding normal cells. By fostering an environment where bench-side discovery directly informs bedside care, their experts are unlocking the mechanisms that drive pediatric tumor growth and resilience. This comprehensive approach enables the development of more precise, less toxic therapeutic protocols, ensuring that young patients receive the most advanced care while preserving their long-term health and quality of life."
    },
    
  ];

  const committeeData = [
  { 
    id: 1, 
    name: "Dr. Robert C. Bast", 
    title: "Chair", 
    affiliation: "The University of Texas M.D. Anderson Cancer Center",
    image: "/images/research-doc-1.avif" // Corrected spelling
  },
  { 
    id: 2, 
    name: "Mitchell C. Benson, M.D.", 
    title: "Professor of Urology", 
    affiliation: "Columbia University Irving Medical Center",
    image: "/images/research-doc-2.avif" // Corrected spelling
  },
  { 
    id: 3, 
    name: "Dr. Lawrence Boise", 
    title: "", 
    affiliation: "Winship Cancer Institute of Emory University",
    image: "/images/research-doc-3.avif" // Corrected spelling
  },
  { 
    id: 4, 
    name: "Mitchell C. Benson, M.D.", 
    title: "Professor of Urology", 
    affiliation: "Columbia University Irving Medical Center",
    image: "/images/research-doc-4.avif" // Corrected spelling
  },
  { 
    id: 5, 
    name: "Dr. Lawrence Boise", 
    title: "", 
    affiliation: "Winship Cancer Institute of Emory University",
    image: "/images/research-doc-5.avif" // Corrected spelling
  },
];



  return (

    <>
    <section className={styles.heroSection} id="research-overview">
      <div className={styles.container}>
        <div className={`${styles.textWrapper} ${styles.fadeUp}`} ref={addToRefs}>
          <h3 className={styles.subHeading}>RESEARCH OVERVIEW</h3>
          <h1 className={styles.mainHeading}>PROGRESS IS BEAUTIFUL</h1>
        </div>
      </div>
    </section>



    <section className={styles.contentSection} id="advancing-discovery">
      <div className={styles.contentContainer}>
        <h2 className={`${styles.sectionHeading} ${styles.fadeUp}`} ref={addToRefs}>ADVANCING DISCOVERY</h2>
        <p className={`${styles.sectionText} ${styles.fadeUp} ${styles.body}`} ref={addToRefs}>
          Through our commitment to high-risk, high-reward research, we provide the 
          foundational support that turns bold scientific ideas into viable clinical 
          breakthroughs. By focusing on early-stage initiatives, we enable researchers 
          to bridge the gap between initial discovery and the data needed to secure 
          large-scale institutional funding.
        </p>
      </div>
    </section>

    <TestimonialSection />


    {/* --- Research That Saves Lives Section --- */}
      <section className={styles.listSection} id="scientific-impact">
        <h2 className={`${styles.listHeading} ${styles.fadeUp}`} ref={addToRefs}>OUR SCIENTIFIC IMPACT</h2>

        {/* DESKTOP VIEW */}
        <div className={styles.desktopView}>
          <div className={styles.gridContainer}>
            {researchData.map((item) => (
              <div key={item.id} className={`${styles.item} ${styles.fadeUp}`} ref={addToRefs}>
                <h4 className={styles.instName}>{item.title}</h4>
                <p className={styles.instLoc}>{item.location}</p>
                <p className={styles.content}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

           {/* MOBILE ACCORDION VIEW */}
          <div className={styles.mobileView}>
             {researchData.map((item) => (
               <div key={item.id} className={styles.accordionWrapper}>
                 <div 
                   className={styles.accordionItem} 
                   onClick={(e) => {
                     const isOpening = openSection !== item.id;
                     setOpenSection(isOpening ? item.id : null);
          
                     // Smooth scroll logic
                     if (isOpening) {
                         setTimeout(() => {
                           e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                         }, 100); // Small delay to wait for content expansion
                       }
                     }}
                   >
                     <span>{item.title}</span>
                     <span>{openSection === item.id ? '-' : '+'}</span>
                   </div>
                   {openSection === item.id && (
                     <div className={styles.accordionContent}>
                       <p className={styles.instLoc}>{item.location}</p>
                       <p>{item.desc}</p>
                     </div>
                   )}
                 </div>
               ))}
             </div>
      </section>

         {/* WHO WE FUND SECTION */}
         <section className={styles.whoWeFundSection} id="who-we-fund">
          <div className={styles.container}>
    
            {/* --- WRAP EVERYTHING BELOW IN THE BOX --- */}
                    <div className={`${styles.fundingBox} ${styles.fadeUp}`} ref={addToRefs}>
      
                      <h2 className={styles.whoWeFundHeading}>WHO WE FUND</h2>
                      <p className={styles.sectionText}>
                        The National Cancer Institute (NCI) is widely viewed as the bellwether of cancer research.
                      </p>
                      <p className={styles.sectionText}>
                        It also is the largest funder of cancer research in the world. Consistent with our stringent review process, the Foundation considers proposals submitted only by researchers affiliated with NCI-Designated Cancer Centers. These cancer centers are recognized for meeting “rigorous standards for transdisciplinary, state-of-the-art research focused on developing new and better approaches to preventing, diagnosing, and treating cancer.”
                        </p>
      
                              <p className={styles.fundSupportText}>
                                By giving to the AllStars Against Cancer Foundation, you're not just supporting one foundation; you're also supporting research at these cancer treatment centers across the country:
                              </p>

                              {/* Dynamic List from researchData */}
                              <div className={styles.fundingListGrid}>
                        {researchData.map((item) => (
                          <div key={item.id} className={styles.fundingListItem}>
                    • {item.title}, {item.location}
                  </div>
                ))}
              </div>

            </div> 
            {/* --- END OF BOX --- */}

          </div>
        </section>

     
        <section className={styles.committeeSection} id="leadership-team">
          <div className={styles.container}>
            {/* 1. Heading and text go first */}
            <h2 className={`${styles.committeeHeading} ${styles.fadeUp}`} ref={addToRefs}>OUR SCIENTIFIC LEADERSHIP TEAM</h2>
            <p className={`${styles.sectionText} ${styles.fadeUp} ${styles.body}`} ref={addToRefs}>
                      The Committee consists of distinguished oncology experts from the nation’s leading universities and cancer centers who volunteer their time to provide oversight on the grant review process and advise the Board of Trustees on funding new programs.
                    </p>

                    {/* 2. Grid comes after the text */}
                    <div className={styles.committeeGrid}>
                      {committeeData.map((member) => (
                       <div key={member.id} className={`${styles.memberCard} ${styles.fadeUp}`} ref={addToRefs}>
                          <img 
                            src={member.image} 
                            alt={member.name} 
                         className={styles.memberImage} 
                    />
                    <h4 className={styles.memberName}>{member.name}</h4>
                    <p className={styles.memberTitle}>{member.title}</p>
               <p className={styles.memberAffiliation}>{member.affiliation}</p>
             </div>
           ))}
         </div>
       </div>
     </section>


               <section className={styles.testimonialSplitSection}>
                 {/* The Content Side (Dark Background) */}
                      <div className={`${styles.splitContentSide} ${styles.fadeUp}`} ref={addToRefs}>
                        <p className={styles.quoteText}>
                          The AllStars Against Cancer Foundation's backing was instrumental in creating these new models, providing our lab with a distinct advantage for conducting specialized research.
                        </p>
                             {/* Decorative line */}
                             <div className={styles.accentLine}></div>
                             <p className={styles.authorName}>ANDERSON HM, PHD</p>
                           </div>

                      {/* The Image Side */}
                 <div className={styles.splitImageSide}></div>
               </section>

              <section className={styles.ctaSection}>
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

    </>
  );
};

export default ResearchHero;