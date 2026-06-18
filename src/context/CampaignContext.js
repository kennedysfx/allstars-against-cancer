// src/context/CampaignContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const CampaignContext = createContext();

export function CampaignProvider({ children }) {
  const [activeSlug, setActiveSlug] = useState(null);
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
    <CampaignContext.Provider value={{ activeSlug, setActiveSlug }}>
      {children}
    </CampaignContext.Provider>
  );
}

export const useCampaign = () => useContext(CampaignContext);