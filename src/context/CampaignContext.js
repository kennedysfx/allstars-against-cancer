// src/context/CampaignContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const CampaignContext = createContext();

export function CampaignProvider({ children }) {
  const [activeSlug, setActiveSlug] = useState(null);

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [donationInProgress, setDonationInProgress] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('donationInProgress') === 'true';
    }
    return false;
  });

  useEffect(() => {
    sessionStorage.setItem('donationInProgress', donationInProgress);
  }, [donationInProgress]);
  // --- END OF REPLACEMENT ---

const [lastSelectedAmount, setLastSelectedAmount] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('lastSelectedAmount');
      return saved ? parseFloat(saved) : 1000;
    }
    return 1000;
  });

  useEffect(() => {
    sessionStorage.setItem('lastSelectedAmount', lastSelectedAmount);
  }, [lastSelectedAmount]);
  // TO HERE.

  const router = useRouter();

  useEffect(() => {
    // 1. Explicitly clear state if navigating directly to the root homepage path layout
    if (router.asPath === '/') {
      setActiveSlug(null);
      sessionStorage.removeItem('campaign_slug');
      return;
    }

    // 2. Capture and save if visiting a real dynamic slug URL link
    if (router.query.slug && router.pathname === '/[slug]') {
      const slugName = router.query.slug;
      setActiveSlug(slugName);
      sessionStorage.setItem('campaign_slug', slugName);
    } 
    // 3. Fallback check for session preservation on child inner navigation links
    else {
      const savedSlug = sessionStorage.getItem('campaign_slug');
      if (savedSlug) {
        setActiveSlug(savedSlug);
      }
    }
  }, [router.query.slug, router.pathname, router.asPath]);

  return (
   <CampaignContext.Provider value={{ 
      activeSlug, 
      setActiveSlug,
      showLeaveModal,
      setShowLeaveModal,
      donationInProgress,
      setDonationInProgress,
      lastSelectedAmount,
      setLastSelectedAmount
    }}>
      {children}
    </CampaignContext.Provider>
  );
}

export const useCampaign = () => useContext(CampaignContext);