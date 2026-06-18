'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './GlobalHeader.module.css';
import { useCampaign } from '../context/CampaignContext';
import { usePathname } from 'next/navigation';

export default function GlobalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const pathname = usePathname();

  const { activeSlug } = useCampaign();

  const pathPrefix = activeSlug ? `/${activeSlug}` : '';
  const from = activeSlug || 'home';
  const donatePath = `/donate?from=${from}`;

  
  const homePath = activeSlug ? `/${activeSlug}` : "/";
  const isHomePage = pathname === '/' || (activeSlug && pathname === `/${activeSlug}`);
  const isStoriesPage = pathname === '/stories';

  // Tracks window scrolling to toggle background styles globally
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // Update this line in your return statement:
     <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isStoriesPage ? styles.storiesPageHeader : ''}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link href={activeSlug ? `/${activeSlug}` : "/"}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        </Link>
      </div>

      {/* DESKTOP ONLY NAVIGATION SECTION (Hidden on mobile) */}
      <div className={styles.mainNavWrapper}>
        <nav className={styles.navDesktop}>
          <ul>
            {!isHomePage && (
             <li>
              <Link href={homePath} className={styles.navLink}>Home</Link>
             </li>
             )}
      
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/stories">Stories</Link></li>
            <li><Link href="/research">Research</Link></li>
            <li><Link href="/events">Events & Fundraisers</Link></li>
            <li><Link href="/how-to-help">How to Help</Link></li>
          </ul>
        </nav>
        
        <div className={styles.actions}>
          <Link href={donatePath} className={styles.donateButton}>Donate</Link>
          <button className={styles.iconButton} aria-label="Search">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE ONLY NAVIGATION TRIGGER (Hidden on desktop) */}
      <div className={styles.mobileMenuContainer}>
        <Link href={donatePath} className={styles.donateButtonMobile}>Donate</Link>
        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Open Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* FULL-SCREEN MOBILE MENU OVERLAY */}
      <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.menuActive : ''}`}>
        <div className={styles.mobileOverlayHeader}>
          <div className={styles.logo}>
            <Link href={activeSlug ? `/${activeSlug}` : "/"} onClick={toggleMenu}>
              <img src="/logo.png" alt="Logo" className={styles.logoImage} />
            </Link>
          </div>
          <button className={styles.closeButton} onClick={toggleMenu} aria-label="Close Menu">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

  <nav className={styles.mobileNavLinks}>
  <ul>
    <li className={`${styles.slideRight} ${styles.navItem}`}>
      <Link href={activeSlug ? `/${activeSlug}` : "/"} className={styles.homeLink} onClick={toggleMenu}> Home</Link>
    </li>

    {/* ABOUT US ACCORDION */}
    <li className={`${styles.slideLeft} ${styles.aboutContainer}`}>
      <div className={styles.accordionHeader} onClick={() => setOpenSection(openSection === 'about' ? null : 'about')}>
        <span className={styles.aboutParentText}>About Us</span>
        <span>{openSection === 'about' ? '▲' : '▼'}</span>
      </div>
      {openSection === 'about' && (
        <ul className={styles.subMenu}>
          <li><Link href="/about" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>About Us</Link></li>
          <li><Link href="/about#mission" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Our Mission</Link></li>
          <li><Link href="/about#principles" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Our Principles</Link></li>
          <li><Link href="/about#story" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Our Story</Link></li>
          <li><Link href="/about#leadership" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Leadership</Link></li>
          <li><Link href="/about#facts" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Cancer Facts</Link></li>
        </ul>
      )}
    </li>

    {/* STORIES ACCORDION */}
    <li className={`${styles.slideRight} ${styles.aboutContainer}`}>
      <div className={styles.accordionHeader} onClick={() => setOpenSection(openSection === 'stories' ? null : 'stories')}>
        <span className={styles.aboutParentText}>Stories</span>
        <span>{openSection === 'stories' ? '▲' : '▼'}</span>
      </div>
      {openSection === 'stories' && (
        <ul className={styles.subMenu}>
          <li><Link href="/stories" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>All</Link></li>
          <li><Link href="/stories#patient-stories" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Patient Stories</Link></li>
          <li><Link href="/stories#our-stories" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Our Stories</Link></li>
        </ul>
      )}
    </li>

        {/* RESEARCH ACCORDION */}
        <li className={`${styles.slideLeft} ${styles.aboutContainer}`}>
          <div className={styles.accordionHeader} onClick={() => setOpenSection(openSection === 'research' ? null : 'research')}>
            <span className={styles.aboutParentText}>Research</span>
            <span>{openSection === 'research' ? '▲' : '▼'}</span>
          </div>
          {openSection === 'research' && (
            <ul className={styles.subMenu}>
              <li><Link href="/research" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Research Overview</Link></li>
              <li><Link href="/research#advancing-discovery" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Advancing Discovery</Link></li>
              <li><Link href="/research#scientific-impact" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Our Scientific Impact</Link></li>
              <li><Link href="/research#who-we-fund" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Who We Fund</Link></li>
              <li><Link href="/research#leadership-team" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Scientific Leadership</Link></li>
            </ul>
          )}
        </li>
             {/* EVENTS ACCORDION */}
                  <li className={`${styles.slideRight} ${styles.aboutContainer}`}>
                    <div className={styles.accordionHeader} onClick={() => setOpenSection(openSection === 'events' ? null : 'events')}>
                      <span className={styles.aboutParentText}>Events</span>
                      <span>{openSection === 'events' ? '▲' : '▼'}</span>
                    </div>
  
                    {openSection === 'events' && (
                      <ul className={styles.subMenu}>
                        <li><Link href="/events" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Events & Fundraisers</Link></li>
                        <li><Link href="/events#relive" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Relive the Impact</Link></li>
                        <li><Link href="/events#headlines" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Headline Events</Link></li>
                        <li><Link href="/events#fundraise-cta" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>Fundraise for the Cause</Link></li>
                      </ul>
                    )}
              </li>
     {/*HOW TO HELP ACCORDION */}
                  <li className={`${styles.slideLeft} ${styles.aboutContainer}`}>
                    <div className={styles.accordionHeader} onClick={() => setOpenSection(openSection === 'help' ? null : 'help')}>
                      <span className={styles.aboutParentText}>How To Help</span>
                      <span>{openSection === 'help' ? '▲' : '▼'}</span>
                    </div>
  
                    {openSection === 'help' && (
                      <ul className={styles.subMenu}>
                        <li><Link href="/how-to-help" className={styles.subMenuItem} onClick={() => { setOpenSection(null); setIsMenuOpen(false); }}>How to Help</Link></li>

                      </ul>
                    )}
              </li>
  </ul>
</nav> 
      </div>
    </header>
  );
}

