import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { CampaignProvider } from '../context/CampaignContext';
import CampaignLayout from '../components/CampaignLayout';
import GlobalFooter from '../components/GlobalFooter';
import { HomepageContent } from './index'; 

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  const isDonateRoute = router.pathname === '/donate';
  const isAdminRoute = router.pathname === '/admin';
  const isErrorPage = pageProps.statusCode === 404 || Component.name === 'Error';

  // 1. ADMIN MODE: Completely isolated, no layout/footer
  if (isAdminRoute) {
    return (
      <CampaignProvider>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </CampaignProvider>
    );
  }

  // 2. DONATE MODE: Your existing custom overlay
  if (isDonateRoute) {
    return (
      <CampaignProvider>
        <div className={inter.className}>
          <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
            <CampaignLayout>
              <HomepageContent hideLowerSections={true} />
            </CampaignLayout>
            <div style={{ position: 'absolute', inset: 0, zIndex: 50, overflowY: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }}>
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </CampaignProvider>
    );
  }

  // 3. ERROR MODE: Isolated (No Layout or Footer)
  if (isErrorPage) {
    return (
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    );
  }


  // 4. NORMAL MODE: Standard Layout and Footer
  return (
    <CampaignProvider>
      <div className={inter.className}>
        <CampaignLayout>
          <Component {...pageProps} />
        </CampaignLayout>
        <GlobalFooter />
      </div>
    </CampaignProvider>
  );
}

export default MyApp;