import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WishlistModal } from './components/WishlistModal';
import { AccountModal } from './components/AccountModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { ProjectDocPage } from './pages/ProjectDocPage';

const AppContent: React.FC = () => {
  const { activePage, toastMessage } = useShop();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faqs':
        return <FaqPage />;
      case 'policies':
        return <PoliciesPage />;
      case 'project-doc':
        return <ProjectDocPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFF8F8] text-[#4A3B40]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <ProductDetailModal />
      <WishlistModal />
      <AccountModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#831843] text-white px-5 py-3 rounded-2xl shadow-xl border border-pink-300/30 text-xs font-medium flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
