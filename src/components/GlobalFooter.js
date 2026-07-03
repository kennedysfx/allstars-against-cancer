import React, { useState } from 'react';
import Link from 'next/link';
import styles from './GlobalFooter.module.css';

export default function GlobalFooter() {
  // Replace the old state with this:
const [activeSection, setActiveSection] = useState(null);

// Replace the old toggle function with this:
const toggleSection = (index) => {
  setActiveSection(activeSection === index ? null : index);
};

  // Exact navigation arrays matched to your layout requirements
  const footerNavigation = [
    {
      title: "About Us",
      links: [
        { label: "About Us", url: "/about" },
        { label: "Our Mission", url: "/about#mission" },
        { label: "Our Principles", url: "/about#principles" },
        { label: "Our Story", url: "/about#story" },
        { label: "Leadership", url: "/about#leadership" },
        { label: "Cancer Facts", url: "/about#facts" },
      ]
    },
    {
       title: "Stories",
       links: [
    { label: "All", url: "/stories" },
    { label: "Patient Stories", url: "/stories#patient-stories" }, // Updated
    { label: "Our Stories", url: "/stories#our-stories" },
      ]
    },
   {
       title: "Research",
       links: [
    { label: "Research Overview", url: "/research" },
    { label: "Advancing Discovery", url: "/research#advancing-discovery" },
    { label: "Our Scientific Impact", url: "/research#scientific-impact" },
    { label: "Who We Fund", url: "/research#who-we-fund" },
    { label: "Our Scientific Leadership", url: "/research#leadership-team" },
      ]
    },
    {
      title: "Events",
      links: [
        { label: "Events & Fundraisers", url: "/events" },
        { label: "Relive the Impact", url: "/events#relive" },
        { label: "Headline Events", url: "/events#headlines" },
        { label: "Fundraise for the Cause", url: "/events#fundraise-cta" },
        
      ]
    },
    {
      title: "How to Help",
      links: [
        { label: "How to Help", url: "/how-to-help" },
        
      ]
    }
  ];

return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div className={styles.linksGrid}>
  {footerNavigation.map((column, index) => {
    // Check if this specific section is the one currently open
    const isSectionOpen = activeSection === index;
    
    return (
      <div key={index} className={styles.linkColumn}>
        <div 
          className={styles.columnHeader} 
          onClick={() => toggleSection(index)}
        >
          <h3>{column.title}</h3>
          <span className={`${styles.mobileArrow} ${isSectionOpen ? styles.arrowRotate : ''}`}>
            ▼
          </span>
        </div>
        
        <div className={styles.headerLine}></div>
        
        <ul className={`${styles.linkList} ${isSectionOpen ? styles.isOpen : ''}`}>
          {column.links.map((link, linkIndex) => (
            <li key={linkIndex}>
              <Link 
                href={link.url} 
                onClick={(e) => {
                  // 1. Close the active accordion
                  setActiveSection(null);
                  
                  // 2. Smooth scroll logic
                  if (link.url.includes('#')) {
                    const id = link.url.split('#')[1];
                    const element = document.getElementById(id);
                    if (element) {
                      e.preventDefault();
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  })}
</div>

        {/* Brand Badges and Social Row */}
        <div className={styles.rightSection}>
          <div className={styles.badgesContainer}>
            <img src="/candid-platinum.png" alt="Platinum Transparency 2026" />
            <img src="/charity-navigator.png" alt="Charity Navigator 4 Star" />
          </div>

          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <img src="/logo.png" alt="Logo" className={styles.footerLogo} />
        <div className={styles.copyrightWrapper}>
          <p>Copyright © 2026 AllStars Against Cancer. All rights reserved.</p>
          
        <nav className={styles.legalLinks}>
      <Link href="/privacy">Privacy Policy</Link>
      <span className={styles.separator}>|</span>
      <Link href="/terms">Terms and Conditions</Link>
    </nav>
  </div>
</div>
    </footer>
  );
}