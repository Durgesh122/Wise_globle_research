import React, { useEffect, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactDataPage from './pages/ContactDataPage';
import GrievanceRedressalProcess from './pages/GrievanceRedressalProcess';
import GuideForInvesting from './pages/GuideForInvesting';

// Theme Wrapper
import TimeBasedThemeWrapper from './components/TimeBasedThemeWrapper';

// Core Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import FloatingPayButton from './components/FloatingPayButton';
import ParticlesBackground from './components/ParticlesBackground';
import AdminLayout from './pages/admin/AdminLayout';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Demo = lazy(() => import('./pages/Demo'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const Disclosure = lazy(() => import('./pages/Disclosure'));
const LiveChart = lazy(() => import('./pages/LiveChart'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Reports = lazy(() => import('./pages/Reports'));
const Complaint = lazy(() => import('./pages/Complaint'));
const PaymentInfo = lazy(() => import('./pages/PaymentInfo'));
const Team = lazy(() => import('./pages/Team'));
const Vision = lazy(() => import('./pages/Vision'));
const Equity = lazy(() => import('./pages/Equity'));
const Intraday = lazy(() => import('./pages/Intraday'));
const Mcx = lazy(() => import('./pages/Mcx'));
const Career = lazy(() => import('./pages/Career'));
const Training = lazy(() => import('./pages/Training'));
const Blogs = lazy(() => import('./pages/Blogs'));
const MarketNews = lazy(() => import('./pages/MarketNews'));
const UserLogin = lazy(() => import('./pages/UserLogin'));
const ClientPanel = lazy(() => import('./pages/ClientPanel'));
const StockOption = lazy(() => import('./pages/StockOption'));
const Delivery = lazy(() => import('./pages/Delivery'));
const Index = lazy(() => import('./pages/Index'));
const Future = lazy(() => import('./pages/Future'));
const StockIndexOption = lazy(() => import('./pages/StockIndexOption'));
const BTST = lazy(() => import('./pages/BTST'));
const Cash = lazy(() => import('./pages/Cash'));
const Bullions = lazy(() => import('./pages/Bullions'));
const Energy = lazy(() => import('./pages/Energy'));
const Metal = lazy(() => import('./pages/Metal'));
const MCXOption = lazy(() => import('./pages/MCXOption'));
const SmartCash = lazy(() => import('./pages/SmartCash'));
const EvaluationStockCash = lazy(() => import('./pages/EvaluationStockCash'));
const SmartOptions = lazy(() => import('./pages/SmartOptions'));
const ImpulseOption = lazy(() => import('./pages/ImpulseOption'));
const SmartFuture = lazy(() => import('./pages/SmartFuture'));
const EvaluationStockOption = lazy(() => import('./pages/EvaluationStockOption'));
const EvaluationIndexOptions = lazy(() => import('./pages/EvaluationIndexOptions'));
const ImpulseIndexOptions = lazy(() => import('./pages/ImpulseIndexOptions'));
const SmartIndexOption = lazy(() => import('./pages/SmartIndexOption'));
const UniversalCash = lazy(() => import('./pages/UniversalCash'));
const InfinityClub = lazy(() => import('./pages/InfinityClub'));
const MCXSupreme = lazy(() => import('./pages/MCXSupreme'));
const GalaxyMCX = lazy(() => import('./pages/GalaxyMCX'));
const NCDEX = lazy(() => import('./pages/NCDEX'));
const Forex = lazy(() => import('./pages/Forex'));
const Currency = lazy(() => import('./pages/Currency'));
const Comex = lazy(() => import('./pages/Comex'));
const Terms = lazy(() => import('./pages/Terms'));
const Refund = lazy(() => import('./pages/Refund'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Recommendation = lazy(() => import('./pages/Recommendation'));
const ClientServiceConsent = lazy(() => import('./pages/ClientServiceConsent'));
const InvestorChart = lazy(() => import('./pages/InvestorChart'));
const AntiMoneyLaundering = lazy(() => import('./pages/AntiMoneyLaundering'));
const DailyRecommendation = lazy(() => import('./pages/DailyRecommendation'));

// Lazy Loaded Admin Pages
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ContactSubmissions = lazy(() => import('./pages/admin/ContactSubmissions'));
const ConsentSubmissions = lazy(() => import('./pages/admin/ConsentSubmissions'));
const ComplaintManager = lazy(() => import('./pages/admin/ComplaintManager'));
const ReportManager = lazy(() => import('./pages/admin/ReportManager'));
const PopupSubmissions = lazy(() => import('./pages/admin/PopupSubmissions'));

function App() {
  const [particleCount, setParticleCount] = React.useState(window.innerWidth <= 640 ? 20 : 50);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Optimize AOS for mobile
    if (window.innerWidth <= 640) {
      AOS.init({ duration: 600, once: true, disable: 'mobile' });
    } else {
      AOS.init({ duration: 800, once: true });
    }

    const handleResize = () => {
      setParticleCount(window.innerWidth <= 640 ? 20 : 50);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <HelmetProvider>
      <TimeBasedThemeWrapper>
      <ScrollToTop />

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />


      {/* Background Particles (Hidden on Mobile) */}
      {!isAdminPage && (
        <div className="hidden sm:block fixed top-0 left-0 w-full h-full z-[-1]">
          <ParticlesBackground
            options={{
              particles: {
                number: { value: particleCount },
                size: { value: 3 },
              },
            }}
          />
        </div>
      )}

      {/* Navbar */}
      {!isAdminPage && <Navbar />}

      {/* Page Content Wrapper */}
      <main
        className={`min-h-screen ${
          isAdminPage ? '' : 'pt-16 px-2 sm:px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto'
        }`}
      >
        <Suspense
          fallback={
            <div className="text-center py-10 text-primaryBlue font-josefin">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/complaint-data" element={<ContactDataPage />} />
            <Route path="/grievance-redressal-process" element={<GrievanceRedressalProcess />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            {/* Direct premium service routes for Navbar */}
            <Route path="/SmartCash" element={<SmartCash />} />
            <Route path="/EvaluationIndexOptions" element={<EvaluationIndexOptions />} />
            <Route path="/EvaluationStockCash" element={<EvaluationStockCash />} />
            <Route path="/EvaluationStockOption" element={<EvaluationStockOption />} />
            <Route path="/SmartFuture" element={<SmartFuture />} />
            <Route path="/SmartOptions" element={<SmartOptions />} />
            <Route path="/ImpulseIndexOptions" element={<ImpulseIndexOptions />} />
            <Route path="/ImpulseOption" element={<ImpulseOption />} />
            <Route path="/MCXSupreme" element={<MCXSupreme />} />
            <Route path="/GalaxyMCX" element={<GalaxyMCX />} />
            <Route path="/UniversalCash" element={<UniversalCash />} />
            <Route path="/InfinityClub" element={<InfinityClub />} />
            <Route path="/services/smart-cash" element={<SmartCash />} />
            <Route path="/services/evaluation-stock-cash" element={<EvaluationStockCash />} />
            <Route path="/services/smart-options" element={<SmartOptions />} />
            <Route path="/services/impulse-option" element={<ImpulseOption />} />
            <Route path="/services/smart-future" element={<SmartFuture />} />
            <Route path="/services/evaluation-stock-option" element={<EvaluationStockOption />} />
            <Route path="/services/evaluation-index-options" element={<EvaluationIndexOptions />} />
            <Route path="/services/impulse-index-options" element={<ImpulseIndexOptions />} />
            <Route path="/services/smart-index-option" element={<SmartIndexOption />} />
            <Route path="/services/universal-cash" element={<UniversalCash />} />
            <Route path="/services/infinity-club" element={<InfinityClub />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/disclosure" element={<Disclosure />} />
            <Route path="/livechart" element={<LiveChart />} />
            <Route path="/team" element={<Team />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/equity" element={<Equity />} />
            <Route path="/intraday" element={<Intraday />} />
            <Route path="/mcx" element={<Mcx />} />
            <Route path="/career" element={<Career />} />
            <Route path="/training" element={<Training />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/market-news" element={<MarketNews />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/client-panel" element={<ClientPanel />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/payment" element={<PaymentInfo />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/services/equity/stock-option" element={<StockOption />} />
            <Route path="/services/equity/delivery" element={<Delivery />} />
            <Route path="/services/equity/index" element={<Index />} />
            <Route path="/services/equity/future" element={<Future />} />
            <Route path="/services/equity/stock-index-option" element={<StockIndexOption />} />
            <Route path="/services/equity/btst" element={<BTST />} />
            <Route path="/services/equity/cash" element={<Cash />} />
            <Route path="/services/mcx/bullions" element={<Bullions />} />
            <Route path="/services/mcx/energy" element={<Energy />} />
            <Route path="/services/mcx/metal" element={<Metal />} />
            <Route path="/services/mcx/mcx-option" element={<MCXOption />} />
            <Route path="/services/ncdex" element={<NCDEX />} />
            <Route path="/services/forex" element={<Forex />} />
            <Route path="/services/currency" element={<Currency />} />
            <Route path="/services/comex" element={<Comex />} />
            <Route 
              path="/admin" 
              element={<AdminLayout />}
            >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="popups" element={<PopupSubmissions />} />
              <Route path="contacts" element={<ContactSubmissions />} />
              <Route path="consents" element={<ConsentSubmissions />} />
              <Route path="complaints" element={<ComplaintManager />} />
              <Route path="reports" element={<ReportManager />} />
            </Route>
            <Route path="/client-service-consent" element={<ClientServiceConsent />} />
            <Route path="/investor-chart" element={<InvestorChart />} />
            <Route path="/anti-money-laundering" element={<AntiMoneyLaundering />} />
            <Route path="/daily" element={<DailyRecommendation />} />
          <Route path="/guide" element={<GuideForInvesting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer & Floating Buttons */}
      {!isAdminPage && (
        <>
          <Footer />
          <ChatWidget />
          <FloatingPayButton />
          <WhatsAppButton />
        </>
      )}
      </TimeBasedThemeWrapper>
    </HelmetProvider>
  );
}

export default App;
