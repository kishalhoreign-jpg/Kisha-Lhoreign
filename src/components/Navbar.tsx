import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  Sparkles,
  ChevronDown,
  Share2,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    setSelectedCategory,
    cartCount, 
    setCartDrawerOpen,
    wishlistCount,
    setWishlistModalOpen,
    currentUser,
    isLoggedIn,
    setAccountModalOpen,
    setAccountActiveTab,
    searchQuery,
    setSearchQuery,
    showToast
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    const shopUrl = window.location.href.split('#')[0] || 'https://ais-pre-zdkva43ctk4omzvbtx7r6w-90008916979.asia-northeast1.run.app';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shopUrl);
    }
    setCopiedLink(true);
    showToast('🎀 Shop link copied! Share it with friends or your teacher.');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleNavClick = (page: string, category?: Category) => {
    setActivePage(page);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('shop');
      setSelectedCategory('All');
      setSearchOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openAccount = (tab: 'profile' | 'orders' | 'wishlist' | 'login' | 'register') => {
    setAccountActiveTab(isLoggedIn ? tab : 'login');
    setAccountModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8F8]/95 backdrop-blur-md border-b border-[#F9D5E5]/60 transition-all">
      {/* 1. Promotional Announcement Bar */}
      {!announcementDismissed && (
        <div className="bg-gradient-to-r from-[#FCE7F0] via-[#FCEFF5] to-[#FCE7F0] text-[#9D174D] text-xs font-medium py-1.5 px-4 text-center border-b border-[#F9D5E5]/50 flex items-center justify-between">
          <div className="flex-1 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E11D48] animate-pulse" />
            <span>
              Complimentary Satin Ribbon Packaging on orders over ₱499 · Use code <strong className="font-semibold underline tracking-wider">PRETTY10</strong> for 10% off
            </span>
          </div>
          <button 
            onClick={() => setAnnouncementDismissed(true)}
            className="text-[#9D174D]/60 hover:text-[#9D174D] p-1 transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Top Bar Contract: [Brand title] — [Nav links] — [Actions] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#6D4C58] hover:text-[#BE185D] hover:bg-[#FCE7F0]/40 rounded-full transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-[#831843] group-hover:text-[#9D174D] transition-colors">
                  KLISHÉ
                </span>
                <span className="text-[#F472B6] text-lg font-serif italic select-none">୨ৎ</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#9D174D]/80 font-sans hidden sm:block">
                Your Everyday Dose of Pretty
              </p>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#644A52]">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#9D174D] transition-colors relative py-1 ${activePage === 'home' ? 'text-[#9D174D] font-semibold' : ''}`}
            >
              Home
              {activePage === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#BE185D] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop', 'All')}
              className={`hover:text-[#9D174D] transition-colors relative py-1 ${activePage === 'shop' ? 'text-[#9D174D] font-semibold' : ''}`}
            >
              Shop All
              {activePage === 'shop' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#BE185D] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop', 'Hair Accessories')}
              className="hover:text-[#9D174D] transition-colors py-1"
            >
              Hair Accessories
            </button>

            <button
              onClick={() => handleNavClick('shop', 'Stationery')}
              className="hover:text-[#9D174D] transition-colors py-1"
            >
              Stationery
            </button>

            <button
              onClick={() => handleNavClick('shop', 'Gifts & Bundles')}
              className="hover:text-[#9D174D] transition-colors py-1 flex items-center gap-1"
            >
              <span>Gifts &amp; Bundles</span>
              <span className="text-[9px] uppercase tracking-wider text-[#BE185D] bg-[#FCE7F0] px-1.5 py-0.5 rounded-full font-semibold">
                Gift Box
              </span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#9D174D] transition-colors py-1 ${activePage === 'about' ? 'text-[#9D174D] font-semibold' : ''}`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNavClick('project-doc')}
              className={`hover:text-[#9D174D] transition-colors py-1 text-xs text-[#BE185D] font-semibold bg-[#FFF0F5] px-2.5 py-1 rounded-full border border-[#F9D5E5] flex items-center gap-1 ${activePage === 'project-doc' ? 'ring-1 ring-[#BE185D]' : ''}`}
            >
              <span>📄 Report / Doc</span>
            </button>

            <button
              onClick={handleCopyLink}
              title="Copy Shop Link to share"
              className="hover:text-[#9D174D] transition-all py-1 text-xs text-[#831843] font-semibold bg-white hover:bg-[#FFF0F5] px-2.5 py-1 rounded-full border border-[#F0C9DA] flex items-center gap-1.5 shadow-xs active:scale-95"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Share2 className="w-3.5 h-3.5 text-[#BE185D]" />}
              <span>{copiedLink ? 'Link Copied! ୨ৎ' : 'Share Link'}</span>
            </button>
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Wishlist with Count, Account, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger / Inline Input */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search bows, journals, pens..."
                    autoFocus
                    className="w-48 sm:w-64 pl-3 pr-8 py-1.5 text-xs bg-white border border-[#F9D5E5] rounded-full focus:outline-none focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] text-[#503740]"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="absolute right-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-[#6D4C58] hover:text-[#BE185D] hover:bg-[#FCE7F0]/40 rounded-full transition-colors"
                  aria-label="Search products"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              )}
            </div>

            {/* Wishlist Button with Badge Counter (Directly before Account) */}
            <button
              onClick={() => setWishlistModalOpen(true)}
              className="relative p-2 text-[#6D4C58] hover:text-[#BE185D] hover:bg-[#FCE7F0]/40 rounded-full transition-colors"
              aria-label={`Wishlist with ${wishlistCount} items`}
              title="My Wishlist"
            >
              <Heart className={`w-4.5 h-4.5 ${wishlistCount > 0 ? 'fill-[#E11D48] text-[#E11D48]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#BE185D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#FFF8F8] tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account Icon (Log in / Create account / Profile) */}
            <button
              onClick={() => openAccount(isLoggedIn ? 'profile' : 'login')}
              className="p-2 text-[#6D4C58] hover:text-[#BE185D] hover:bg-[#FCE7F0]/40 rounded-full transition-colors flex items-center gap-1.5"
              aria-label="User Account"
              title={isLoggedIn ? `Account (${currentUser?.name})` : "Log In or Register"}
            >
              {isLoggedIn ? (
                <div className="w-6 h-6 rounded-full bg-[#FCE7F0] border border-[#F472B6] text-[#BE185D] text-xs font-semibold flex items-center justify-center">
                  {currentUser?.name?.charAt(0).toUpperCase() || 'K'}
                </div>
              ) : (
                <User className="w-4.5 h-4.5" />
              )}
              <span className="hidden xl:inline text-xs font-medium text-[#6D4C58]">
                {isLoggedIn ? currentUser?.name?.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Shopping Cart Button with Counter */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2 text-[#6D4C58] hover:text-[#BE185D] hover:bg-[#FCE7F0]/40 rounded-full transition-colors"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#BE185D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#FFF8F8] tabular-nums animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#F9D5E5] bg-[#FFF8F8] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#644A52]">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#FCE7F0]/50"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'All')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#FCE7F0]/50"
            >
              Shop All Collection
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Hair Accessories')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#FCE7F0]/50"
            >
              Hair Accessories &amp; Satin Bows
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Stationery')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#FCE7F0]/50"
            >
              Stationery &amp; Gold-Foil Journals
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Gifts & Bundles')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#FCE7F0]/50"
            >
              Gifts &amp; Curated Bundles
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#FCE7F0]/50"
            >
              About KLISHÉ
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#FCE7F0]/50"
            >
              Contact Us &amp; Studio
            </button>
            <button
              onClick={() => handleNavClick('faqs')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#FCE7F0]/50"
            >
              Shipping &amp; FAQs
            </button>
            <button
              onClick={() => handleNavClick('project-doc')}
              className="text-left py-2 px-3 rounded-lg bg-[#FFF0F5] text-[#BE185D] font-semibold flex items-center gap-1.5"
            >
              <span>📄 School Project Document / Report</span>
            </button>
            <button
              onClick={() => {
                handleCopyLink();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg bg-white border border-[#F0C9DA] text-[#831843] font-semibold flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-[#BE185D]" />
                <span>Copy &amp; Share Shop Link</span>
              </span>
              <span className="text-[10px] text-[#BE185D] bg-[#FFF0F5] px-2 py-0.5 rounded-md">
                {copiedLink ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#F9D5E5] flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAccount(isLoggedIn ? 'profile' : 'login');
              }}
              className="text-xs font-medium text-[#BE185D] flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>{isLoggedIn ? `Logged in as ${currentUser?.name}` : 'Log In or Register'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setWishlistModalOpen(true);
              }}
              className="text-xs font-medium text-[#BE185D] flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 fill-[#BE185D]" />
              <span>Wishlist ({wishlistCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
