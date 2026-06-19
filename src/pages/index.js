import { useEffect, useRef } from 'react'; 
import { useCampaign } from '../context/CampaignContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function HomepageContent({ hideLowerSections = false }) {
  const { activeSlug } = useCampaign(); 
  const missionTextRef = useRef(null); 
  const router = useRouter();
  const from = router.query.slug || 'home';
  const returnPath = `?from=${from}`;
  
  useEffect(() => {
    // Prevent observer initialization if we are strictly isolating the hero view
    if (hideLowerSections) return;

    const observerOptions = {
      root: null, 
      threshold: 0.15, 
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active'); 
        } else {
          entry.target.classList.remove('active'); 
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (missionTextRef.current) {
      observer.observe(missionTextRef.current);
    }

    return () => {
      if (missionTextRef.current) {
        observer.unobserve(missionTextRef.current);
      }
    };
  }, [hideLowerSections]);

  return (
    <div>
      {/* HERO SECTION - ALWAYS VISIBLE */}
      <main className={`hero-section ${activeSlug ? 'hide-hero-bg' : ''}`}>
        <div className="hero-content-left">
          {!activeSlug && (
            <h1 className="hero-title">
              TURNING GLOBAL INFLUENCE INTO<br />
              LIFE-SAVING RESEARCH<br />
              TO CURE CANCER.
            </h1>
          )}
        </div>
      </main>

      {/* LOWER CONTENT SECTIONS - DYNAMICALLY BLOCKED ON THE DONATE ROUTE */}
      {!hideLowerSections && (
        <>
          {/* 100% Commitment Block */}
          <section className="commitment-section">
            <div className="commitment-container">
              <h2 className="commitment-title">100% of donations fund research </h2>
              <p className="commitment-text">
                100% of your donation directly funds the world's most brilliant scientists researching breakthroughs across all types of cancer. Baseline overhead is fully covered by an independent endowment.
              </p>
            </div>
          </section>

          {/* Mission Statement Block */}
          <section className="mission-section">
            <div className="mission-container">
              <p className="mission-tag">Our Mission</p>
              <h3 
                ref={missionTextRef} 
                className="mission-statement animate-slide-right"
              >
               Uniting global icons and fan communities to fund breakthrough cancer research and save lives.
              </h3>
            </div>
          </section>

          {/* FIXED SLIDER SECTION */}
          <section className="partners-section">
            <div className="partners-container">
              <h2 className="partners-title">Hospitals And Care Centers We Support</h2>
              
              <div className="slider-wrapper">
                <div className="slider-track">
                  {/* Loop Track Set 1 */}
                  <div className="slide"><img src="/hospitals/city-of-hope.png" alt="City of Hope" /></div>
                  <div className="slide"><img src="/hospitals/columbia.png" alt="Columbia University" /></div>
                  <div className="slide"><img src="/hospitals/mount-sinai.png" alt="Mount Sinai" /></div>
                  <div className="slide"><img src="/hospitals/mskcc.png" alt="Memorial Sloan Kettering" /></div>
                  <div className="slide"><img src="/hospitals/md-anderson.png" alt="MD Anderson" /></div>
                  <div className="slide"><img src="/hospitals/ucsf.png" alt="UCSF" /></div>
                  <div className="slide"><img src="/hospitals/vanderbilt.png" alt="Vanderbilt" /></div>
                  <div className="slide"><img src="/hospitals/emory.png" alt="Emory Winship" /></div>
                  <div className="slide"><img src="/hospitals/children.png" alt="Children's Hospital" /></div>

                  {/* Loop Track Set 2 */}
                  <div className="slide"><img src="/hospitals/city-of-hope.png" alt="City of Hope" /></div>
                  <div className="slide"><img src="/hospitals/columbia.png" alt="Columbia University" /></div>
                  <div className="slide"><img src="/hospitals/mount-sinai.png" alt="Mount Sinai" /></div>
                  <div className="slide"><img src="/hospitals/mskcc.png" alt="Memorial Sloan Kettering" /></div>
                  <div className="slide"><img src="/hospitals/md-anderson.png" alt="MD Anderson" /></div>
                  <div className="slide"><img src="/hospitals/ucsf.png" alt="UCSF" /></div>
                  <div className="slide"><img src="/hospitals/vanderbilt.png" alt="Vanderbilt" /></div>
                  <div className="slide"><img src="/hospitals/emory.png" alt="Emory Winship" /></div>
                  <div className="slide"><img src="/hospitals/children.png" alt="Children's Hospital" /></div>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURE SECTION: Campaign Action Center */}
          <section className="action-center-section">
            <div className="action-center-container">
              
              {/* Top Focus Text Header Block */}
              <div className="action-header-block">
                <h2 className="action-main-title">UNITING ICONS AND FANS TO CURE CANCER.</h2>
                <p className="action-sub-text">
                  We channel the massive global energy of artists, entertainment, and fan communities straight to the front lines of medical science to fund breakthroughs and save lives.
                </p>
              </div>

              {/* Responsive Grid Container for the Two Feature Boxes */}
              <div className="action-boxes-grid">
                
                {/* Left Box - Dark Blue Theme */}
                <div className="action-card card-dark-blue">
                  <h3 className="card-title">Let's fight cancer loudly and proudly</h3>
                  <p className="card-description">
                    Every single contribution amplifies our collective reach, keeping the momentum going for critical global medical research.
                  </p>
                  <Link href={`/donate${returnPath}`} className="card-link link-orange">
      Donate to help fund life-saving medical discoveries. &rarr;
    </Link>
               </div>  

                {/* Right Box - Gold/Tan Theme */}
                <div className="action-card card-gold">
                  <h3 className="card-title">Take the Lead in the Search for a Cure</h3>
                  <p className="card-description">
                    Rally your local community and transform shared passion into real-world medical progress. Every voice raised and dollar raised brings the world closer to a definitive cure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* NEW SECTION: Our Stories */}
          <section className="stories-section">
            <div className="stories-container">
              
              <h2 className="stories-section-title main-bold-serif-font">OUR STORIES</h2>
              
              <div className="stories-grid">
                
                {/* Story Card 1 */}
                <div className="story-card">
                  <div className="story-image-wrapper">
                    <img src="/images/story-one.jpg" alt="Cancer research breakthrough update" className="story-img" />
                  </div>
                  <h3 className="story-subheading">
                    Alison Diminuco: Two Weddings, Honoring Her Mom, and Living Fearlessly
                  </h3>
                  <a href="/stories#patient-stories" className="story-link">
                    Read More &rarr;
                  </a>
                </div>

                {/* Story Card 2 */}
                <div className="story-card">
                  <div className="story-image-wrapper">
                    <img src="/images/Dr-story.png" alt="Patient and researcher collaboration" className="story-img" />
                  </div>
                  <h3 className="story-subheading">
                    Understanding How Protective Factors in Breast Milk Could Assist Cancer Prevention
                  </h3>
                  <a href="/stories#breast-milk-story" className="story-link">
                    Read More &rarr;
                  </a>
                </div>

              </div>
            </div>
          </section>

          {/* NEWSLETTER SECTION */}
           <section className="newsletter-section">
           <div className="newsletter-promo-block">
             <div className="newsletter-promo-content">
                <h2 className="newsletter-headline">Stay In Touch</h2>
                <p className="newsletter-subtext">
                  As a member of our community, you will receive our monthly eNewsletter and more!
                </p>
              </div>
           </div>

          <div className="newsletter-form-block">
            <form 
               className="newsletter-form" 
                onSubmit={async (e) => {
                 e.preventDefault();
        
                  // 1. Gather data from inputs
                const formData = {
                 firstName: e.target.firstName.value,
                 lastName: e.target.lastName.value,
                 email: e.target.emailAddress.value, // Note: matched to your input id
                };
   
                 // 2. Send to API
             try {
                 const res = await fetch('/api/subscribe', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(formData),
                });

                 const result = await res.json();

                 if (result.success) {
                 alert("Successfully subscribed!");
                 e.target.reset(); // Clear the form
                 } else {
                 alert("Subscription failed: " + result.message);
                 }
                 } catch (error) {
          alert("Error connecting to server.");
        }
               }}
                >
               <div className="form-group">
             <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" id="firstName" className="form-input" placeholder="Enter first name" required />
              </div>

             <div className="form-group">
             <label htmlFor="lastName" className="form-label">Last Name</label>
             <input type="text" id="lastName" className="form-input" placeholder="Enter last name" required />
             </div>

              <div className="form-group">
             <label htmlFor="emailAddress" className="form-label">Email Address</label>
              <input type="email" id="emailAddress" className="form-input" placeholder="example@email.com" required />
              </div>

              <button type="submit" className="newsletter-submit-btn">
             Submit
            </button>
          </form>
        </div>
       </section>
        </>
      )}
    </div>
  );
}

export default function Home() {
  return <HomepageContent />;
}