// src/pages/[slug].js
import { useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';
import { HomepageContent } from './index'; 

export default function CelebrityProfile() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const handleDonateClick = (e) => {
      // 1. Look for the button class instead of the text
      // This works regardless of whether the text is "DONATE" or "DONATE TO THIS CAUSE"
      const button = e.target.closest('.slug-donate-btn');
      
      if (button) {
        e.preventDefault();
        router.push(`/donate?from=${slug}`);
      }
    };

    document.addEventListener('click', handleDonateClick);
    return () => document.removeEventListener('click', handleDonateClick);
  }, [router, slug]);

  return <HomepageContent activeSlug={slug} />;
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const imagePath = path.join(process.cwd(), 'public', 'celebrities', `${slug.toLowerCase()}.webp`);
  
  
  if (!fs.existsSync(imagePath)) {
    return { notFound: true };
  }
  return { props: {} };
}