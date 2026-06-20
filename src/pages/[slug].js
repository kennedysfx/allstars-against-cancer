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
  
  // path.resolve creates an absolute path, which is much more reliable 
  // than path.join in server environments like Next.js
  const filename = `${slug.toLowerCase()}.webp`;
  const imagePath = path.resolve(process.cwd(), 'public', 'celebrities', filename);
  
  try {
    // fs.promises.access is the standard, modern way to verify file existence
    await fs.promises.access(imagePath, fs.constants.F_OK);
    
    // If the file exists, return the slug as a prop
    return { props: { slug } };
  } catch (err) {
    // If there is any error (file not found), return 404
    return { notFound: true };
  }
}