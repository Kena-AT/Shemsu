import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Menu, X } from 'lucide-react';
import { ReactQueryProvider } from './lib/react-query.jsx';
import { useAuthStore } from './state/useAuthStore';
import { useThemeStore } from './state/useThemeStore';
import { cn } from './lib/utils';
import api from './services/api';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Unauthorized from './pages/auth/Unauthorized';
import AccountSettings from './pages/auth/AccountSettings';
import ProfilePage from './pages/auth/ProfilePage';
import LogoutPage from './pages/auth/LogoutPage';

// Marketplace Pages
import MarketplaceHome from './pages/marketplace/MarketplaceHome';
import ProductListing from './pages/marketplace/ProductListing';
import ProductDetails from './pages/marketplace/ProductDetails';
import CategoryPage from './pages/marketplace/CategoryPage';
import SearchResults from './pages/marketplace/SearchResults';
import CartPage from './pages/marketplace/CartPage';
import CheckoutPage from './pages/marketplace/CheckoutPage';
import PaymentSuccessPage from './pages/marketplace/PaymentSuccessPage';
import PaymentFailedPage from './pages/marketplace/PaymentFailedPage';
import OrderHistory from './pages/marketplace/OrderHistory';
import OrderDetailsPage from './pages/marketplace/OrderDetailsPage';

// Seller Dashboard Pages
import SellerDashboard from './pages/dashboard/seller/SellerDashboard';
import ProductList from './pages/dashboard/seller/ProductList';
import AddEditProduct from './pages/dashboard/seller/AddEditProduct';
import ManageOrders from './pages/dashboard/seller/ManageOrders';
import SellerAnalytics from './pages/dashboard/seller/SellerAnalytics';
import SellerVerificationPage from './pages/dashboard/seller/SellerVerificationPage';
import SellerBankDetails from './pages/dashboard/seller/SellerBankDetails';
import SellerProfile from './pages/dashboard/seller/SellerProfile';
import SellerSettings from './pages/dashboard/seller/SellerSettings';
import SellerSupport from './pages/dashboard/seller/SellerSupport';

// Admin Dashboard Pages
import AdminLoginPage from './pages/dashboard/admin/AdminLoginPage';
import AdminHome from './pages/dashboard/admin/AdminHome';
import UserManagement from './pages/dashboard/admin/UserManagement';
import AdminUserDetails from './pages/dashboard/admin/AdminUserDetails';
import SellerVerificationQueue from './pages/dashboard/admin/SellerVerificationQueue';
import ProductModeration from './pages/dashboard/admin/ProductModeration';
import AdminProductDetails from './pages/dashboard/admin/AdminProductDetails';
import GlobalOrders from './pages/dashboard/admin/GlobalOrders';
import AdminOrderDetails from './pages/dashboard/admin/AdminOrderDetails';
import SystemSettings from './pages/dashboard/admin/SystemSettings';
import AdminProfile from './pages/dashboard/admin/AdminProfile';
import AuditLogs from './pages/dashboard/admin/AuditLogs';
import SecurityMiddleware from './pages/dashboard/admin/SecurityMiddleware';
import AdminReports from './pages/dashboard/admin/AdminReports';
import SellerPayouts from './pages/dashboard/admin/SellerPayouts';

// System Pages
import Error403 from './pages/system/Error403';
import Error404 from './pages/system/Error404';
import Error500 from './pages/system/Error500';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import ContactUs from './pages/public/ContactUs';
import TermsOfService from './pages/public/TermsOfService';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import Documentation from './pages/public/Documentation';

// Layout Components
import Navbar from './components/layout/Navbar';
import SellerSidebar from './components/layout/SellerSidebar';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

const MainLayout = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

const SellerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden relative">
      {/* Mobile Toggle Button - Only visible on small screens */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center hover:bg-blue-700 transition-all active:scale-90"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar - Responsive visibility */}
      <div className={cn(
        "fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity duration-300",
        isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setIsSidebarOpen(false)} />
      
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SellerSidebar onNavigate={() => setIsSidebarOpen(false)} />
      </div>

      <main className="flex-1 h-screen overflow-auto bg-slate-50 no-scrollbar p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  console.log("App Component: Rendering...");
  const { setUser, setLoading } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get('/auth/me');
        setUser(data.user);
      } catch (err) {
        localStorage.removeItem('accessToken');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [setUser, setLoading]);

  return (
    <ReactQueryProvider>
      <Router>
        <Toaster position="top-right" />
        <div className="font-sans antialiased text-gray-900 bg-white min-h-screen">
          <Routes>
            {/* Main Marketplace Routes */}
            <Route path="/app" element={<MainLayout />}>
              <Route index element={<MarketplaceHome />} />
              <Route path="marketplace" element={<ProductListing />} />
              <Route path="marketplace/category/:categoryId" element={<CategoryPage />} />
              <Route path="marketplace/search" element={<SearchResults />} />
              <Route path="marketplace/product/:id" element={<ProductDetails />} />
              <Route path="cart" element={<ProtectedRoute allowedRoles={['buyer']}><CartPage /></ProtectedRoute>} />
              <Route path="checkout" element={<ProtectedRoute allowedRoles={['buyer']}><CheckoutPage /></ProtectedRoute>} />
              <Route path="checkout/success" element={<ProtectedRoute allowedRoles={['buyer']}><PaymentSuccessPage /></ProtectedRoute>} />
              <Route path="checkout/error" element={<ProtectedRoute allowedRoles={['buyer']}><PaymentFailedPage /></ProtectedRoute>} />
              <Route path="orders" element={<ProtectedRoute allowedRoles={['buyer']}><OrderHistory /></ProtectedRoute>} />
              <Route path="orders/:id" element={<ProtectedRoute allowedRoles={['buyer']}><OrderDetailsPage /></ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute allowedRoles={['buyer', 'seller', 'admin']}><ProfilePage /></ProtectedRoute>} />
              <Route path="settings" element={<ProtectedRoute allowedRoles={['buyer', 'seller', 'admin']}><AccountSettings /></ProtectedRoute>} />
              
              {/* Public/Legal Routes under /app for nested footer/nav if preferred, but usually they are standalone */}
              <Route path="contact" element={<ContactUs />} />
              <Route path="terms" element={<TermsOfService />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="docs" element={<Documentation />} />
            </Route>
            
            {/* Standalone Public Pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/logout" element={<LogoutPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/unauthorized" element={<Error403 />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminHome />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="users/:id" element={<AdminUserDetails />} />
              <Route path="verifications" element={<SellerVerificationQueue />} />
              <Route path="moderation" element={<ProductModeration />} />
              <Route path="moderation/:id" element={<AdminProductDetails />} />
              <Route path="orders" element={<GlobalOrders />} />
              <Route path="orders/:id" element={<AdminOrderDetails />} />
              <Route path="audit" element={<AuditLogs />} />
              <Route path="security" element={<SecurityMiddleware />} />
              <Route path="analytics" element={<AdminReports />} />
              <Route path="payouts" element={<SellerPayouts />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>

            {/* Seller Routes */}
            <Route path="/seller" element={<ProtectedRoute allowedRoles={['seller']}><SellerLayout /></ProtectedRoute>}>
              <Route index element={<SellerDashboard />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/add" element={<AddEditProduct />} />
              <Route path="products/edit/:id" element={<AddEditProduct />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="analytics" element={<SellerAnalytics />} />
              <Route path="verify" element={<SellerVerificationPage />} />
              <Route path="finances" element={<SellerBankDetails />} />
              <Route path="profile" element={<SellerProfile />} />
              <Route path="settings" element={<SellerSettings />} />
              <Route path="support" element={<SellerSupport />} />
            </Route>

            {/* Error Pages */}
            <Route path="/500" element={<Error500 />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
    </ReactQueryProvider>
  );
}

export default App;
