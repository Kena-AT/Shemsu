import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Menu, X } from 'lucide-react';
import { ReactQueryProvider } from './lib/react-query.jsx';
import { useAuthStore } from './state/useAuthStore';
import { cn } from './lib/utils';
import api from './services/api';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Unauthorized from './pages/auth/Unauthorized';

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

// Seller Dashboard Pages
import SellerDashboard from './pages/dashboard/seller/SellerDashboard';
import ProductList from './pages/dashboard/seller/ProductList';
import AddEditProduct from './pages/dashboard/seller/AddEditProduct';
import ManageOrders from './pages/dashboard/seller/ManageOrders';

// Admin Dashboard Pages
import AdminLoginPage from './pages/dashboard/admin/AdminLoginPage';
import AdminHome from './pages/dashboard/admin/AdminHome';
import UserManagement from './pages/dashboard/admin/UserManagement';
import { 
  SellerVerification, 
  ProductModeration, 
  AuditLogs, 
  SystemSettings 
} from './pages/dashboard/admin/AdminPlaceholders';

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
  const { setUser, setLoading } = useAuthStore();

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
              <Route path="profile" element={<div className="p-20 text-center font-bold">User Profile (Coming Soon)</div>} />
            </Route>
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminHome />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="verifications" element={<SellerVerification />} />
              <Route path="moderation" element={<ProductModeration />} />
              <Route path="audit" element={<AuditLogs />} />
              <Route path="settings" element={<SystemSettings />} />
            </Route>

            {/* Protected Seller Routes */}
            <Route path="/seller" element={<ProtectedRoute allowedRoles={['seller']}><SellerLayout /></ProtectedRoute>}>
              <Route index element={<SellerDashboard />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/new" element={<AddEditProduct />} />
              <Route path="products/edit/:id" element={<AddEditProduct />} />
              <Route path="orders" element={<ManageOrders />} />
            </Route>

            {/* Home welcome redirect if needed, but for now fallback */}
            <Route path="/" element={<div className="h-screen flex items-center justify-center font-black">WELCOME (Redirect to /app in production)</div>} />
            <Route path="*" element={<div className="h-screen flex items-center justify-center font-black uppercase tracking-tighter text-9xl text-gray-100">404</div>} />
          </Routes>
        </div>
      </Router>
    </ReactQueryProvider>
  );
}

export default App;
