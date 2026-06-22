// src/components/CampaignLayout.js
import { useState, useEffect } from 'react'; 
import { useRouter } from 'next/router';
import { useCampaign } from '../context/CampaignContext';
import GlobalHeader from './GlobalHeader'; 

export default function CampaignLayout({ children }) {
  const router = useRouter();
  const { activeSlug } = useCampaign();
  const [hasScrolled, setHasScrolled] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCleanHomepage = router.asPath === '/';
  const showCampaignFrame = activeSlug && !isCleanHomepage && (router.pathname === '/' || router.pathname === '/[slug]');
  
  // Explicitly flags if we are viewing the standalone donate page route
  const isDonatePage = router.pathname === '/donate';

  /* ==========================================================================
     PATHWAY A: DEFAULT / CLEAN INTERFACE FRAMEWORK
     ========================================================================== */
  if (!showCampaignFrame) {
    return (
      <div>
        {/* Only mount the header component if we are NOT on the donate route */}
        {!isDonatePage && <GlobalHeader />}
        {children}
      </div>
    );
  }

  /* ==========================================================================
     PATHWAY B: CELEBRITY SPLIT CAMPAIGN WRAPPER LAYOUTS
     ========================================================================== */
  const formattedName = activeSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const personalNarratives = {
    'kid-rock': "You all know I love a good fight, and this is the biggest one there is. Cancer has touched all of our families. I’m asking my fans to stand shoulder-to-shoulder with me and AllStars Against Cancer Foundation. Every single dollar goes right to the front lines funding real, life-saving breakthroughs. No corporate BS just real people making a real difference.",
    'josh-groban': "Music has the power to heal, but medical research has the power to cure. I am proud to partner with AllStars Against Cancer to accelerate life-saving oncology breakthroughs. Every bit of support directly empowers brilliant scientists working on the frontlines."
  };

  const activeMessage = personalNarratives[activeSlug.toLowerCase()] || 
    `I am proud to stand alongside AllStars Against Cancer to transform global influence into life-saving research.`;

  return (
    <div className="campaign-master-container">
      <div className="campaign-hero-bg-wrapper">
        {/* Only mount the header component if we are NOT on the donate route */}
        {!isDonatePage && <GlobalHeader />}

        <main className="slug-page-content-split">
          <div className="slug-left-branding">
            <div className="slug-branding-overlay">
              <h2 className="slug-brand-text">
                TURNING GLOBAL INFLUENCE INTO<br />
                LIFE-SAVING RESEARCH<br />
                TO CURE CANCER.
              </h2>
            </div>
          </div>

          <div className="slug-floating-box">
            <div className="slug-box-main-split">
              <div className="slug-image-column">
                <div 
                  className="slug-box-image"
                  style={{ backgroundImage: `url('/celebrities/${activeSlug.toLowerCase()}.webp')` }}
                />
              </div>
              
              <div className="slug-details-column">
                <div className="slug-identity-wrapper">
                  <div className="slug-name-row" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h1 className="slug-celebrity-name" style={{ margin: 0 }}>{formattedName}</h1>
                    
                    {/* FIXED: Official Verified Starburst Blue Badge Icon */}
                    <div className="slug-verified-badge" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DA1F2">
                        <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.92 8.6 1.5 6.71 4.7 3.1 5.51l.34 3.69L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.08l3.4 1.42 1.89-3.2 3.61-.82-.34-3.69L23 12zm-13 5l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                      </svg>
                    </div>
                  </div>
                  <p className="slug-campaign-sub">Official Campaign</p>
                </div>

                <div className="slug-action-wrapper">
                  <button className="slug-donate-btn">
                    <span className="btn-text-desktop">Donate to this cause</span>
                    <span className="btn-text-mobile">Donate</span>
                  </button>
                  
                  {/* FIXED: Official Fan Proceeds Guarantee Text Element */}
                  <div className="slug-action-caption-wrapper" style={{ marginTop: '10px', textAlign: 'center' }}>
                    <p className="slug-action-caption" style={{ fontSize: '0.82rem', color: '#475467', margin: 0, lineHeight: '1.4' }}>
                      100% of direct fan proceeds are securely routed to critical oncology research.
                    </p>
                  </div>
                </div>

                <div className="slug-narrative-desktop-container">
                  <p className="slug-narrative-text">
                    {activeMessage} <span className="slug-italic-name">{formattedName}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="slug-narrative-mobile-container">
              <p className="slug-narrative-text">
                {activeMessage} <span className="slug-italic-name">{formattedName}</span>
              </p>
            </div>
          </div>
        </main>
      </div>

      <div className="campaign-extended-content">
        {children}
      </div>

      <div className={`scroll-prompt-container ${hasScrolled ? 'slide-out-exit' : ''}`}>
        <div className="scroll-arrow-bounce">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}