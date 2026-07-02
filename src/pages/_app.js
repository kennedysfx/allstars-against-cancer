import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CampaignProvider, useCampaign } from '../context/CampaignContext';
import CampaignLayout from '../components/CampaignLayout';
import GlobalFooter from '../components/GlobalFooter';
import { HomepageContent } from './index'; 
import PersistentDonationBar from '../components/PersistentDonationBar'; 

const inter = Inter({ subsets: ['latin'] });

// This wrapper now has access to the global provider at all times
function CampaignWrapper({ children }) {
  const router = useRouter();
  const { donationInProgress } = useCampaign();
  const isDonateRoute = router.pathname === '/donate';

  return (
    <>
      {children}
      {donationInProgress && !isDonateRoute && !isMobileCheckoutRoute && <PersistentDonationBar />}
    </>
  );
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  const isDonateRoute = router.pathname === '/donate';
  const isAdminRoute = router.pathname.startsWith('/admin');
  const isMobileCheckoutRoute = router.pathname === '/donate/mobile-checkout';
  const isErrorPage = pageProps.statusCode === 404 || Component.name === 'Error';

  return (
    <AuthProvider>
    <CampaignProvider>
      <CampaignWrapper>
        <div className={inter.className}>
          
          {/* 1. ADMIN MODE */}
          {isAdminRoute && <Component {...pageProps} />}

          {/* 2. DONATE MODE */}
          {isDonateRoute && (
            <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
              <CampaignLayout>
                <HomepageContent hideLowerSections={true} />
              </CampaignLayout>
              <div style={{ position: 'absolute', inset: 0, zIndex: 50, overflowY: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }}>
                <Component {...pageProps} />
              </div>
            </div>
          )}

          {/* 3. ERROR MODE */}
          {isErrorPage && <Component {...pageProps} />}

          {/* 5. MOBILE CHECKOUT MODE (ADDED: Renders the component raw with zero layouts) */}
          {isMobileCheckoutRoute && <Component {...pageProps} />}

          {/* 4. NORMAL MODE */}
          {!isAdminRoute && !isDonateRoute && !isErrorPage && (
            <>
              <CampaignLayout>
                <Component {...pageProps} />
              </CampaignLayout>
              <GlobalFooter />
            </>
          )}

        </div>
      </CampaignWrapper>
    </CampaignProvider>
    </AuthProvider>
  );
}

export default MyApp;