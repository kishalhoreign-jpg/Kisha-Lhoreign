import React, { useState } from 'react';
import { 
  X, 
  User, 
  Heart, 
  Package, 
  CreditCard, 
  LogOut, 
  ShoppingBag, 
  Trash2, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AccountModal: React.FC = () => {
  const { 
    accountModalOpen, 
    setAccountModalOpen, 
    currentUser, 
    isLoggedIn, 
    login, 
    register, 
    logout,
    accountActiveTab,
    setAccountActiveTab,
    wishlist,
    removeFromWishlist,
    moveToCartFromWishlist,
    orders,
    loyaltyPoints,
    setActivePage
  } = useShop();

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPass, setRegPass] = useState('');

  if (!accountModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    login(loginEmail);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail.trim() || !regName.trim()) return;
    register(regName, regEmail, regPhone);
  };

  const handleQuickDemoLogin = () => {
    login('amelia.valderrama@example.com', 'Amelia Valderrama');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={() => setAccountModalOpen(false)} 
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#FCE7F0] overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#FCE7F0] flex items-center justify-between bg-[#FFF8FA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FCE7F0] border border-[#F472B6] flex items-center justify-center text-[#BE185D] font-serif font-bold text-base">
              {isLoggedIn ? currentUser?.name?.charAt(0).toUpperCase() : '୨ৎ'}
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-[#4A2834]">
                {isLoggedIn ? `Hello, ${currentUser?.name}` : 'KLISHÉ Member Lounge'}
              </h2>
              <p className="text-xs text-[#8A6A78]">
                {isLoggedIn ? currentUser?.email : 'Sign in to access your orders, wishlist, and exclusive promos'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setAccountModalOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-white transition-colors"
            aria-label="Close account modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation if Logged In */}
        {isLoggedIn ? (
          <div className="flex border-b border-[#FCE7F0] bg-white px-5 sm:px-6 overflow-x-auto">
            <button
              onClick={() => setAccountActiveTab('profile')}
              className={`py-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
                accountActiveTab === 'profile'
                  ? 'border-[#BE185D] text-[#BE185D]'
                  : 'border-transparent text-[#7B5967] hover:text-[#BE185D]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile &amp; Address</span>
            </button>

            <button
              onClick={() => setAccountActiveTab('orders')}
              className={`py-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
                accountActiveTab === 'orders'
                  ? 'border-[#BE185D] text-[#BE185D]'
                  : 'border-transparent text-[#7B5967] hover:text-[#BE185D]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setAccountActiveTab('wishlist')}
              className={`py-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
                accountActiveTab === 'wishlist'
                  ? 'border-[#BE185D] text-[#BE185D]'
                  : 'border-transparent text-[#7B5967] hover:text-[#BE185D]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>
        ) : null}

        {/* Content Area */}
        <div className="overflow-y-auto p-5 sm:p-7 flex-1">
          
          {/* 1. NOT LOGGED IN: Sign In / Create Account Forms */}
          {!isLoggedIn && (
            <div>
              {/* Tab Selector between Sign In & Register */}
              <div className="flex p-1 bg-[#FFF0F5] rounded-xl mb-6 max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={() => setAccountActiveTab('login')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    accountActiveTab === 'login'
                      ? 'bg-white text-[#831843] shadow-xs'
                      : 'text-[#8A6A78] hover:text-[#831843]'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => setAccountActiveTab('register')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    accountActiveTab === 'register'
                      ? 'bg-white text-[#831843] shadow-xs'
                      : 'text-[#8A6A78] hover:text-[#831843]'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {accountActiveTab === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-md mx-auto">
                  <div>
                    <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sweetheart@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] text-[#4A2834]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] text-[#4A2834]"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#8A6A78]">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-[#BE185D] focus:ring-[#BE185D]" />
                      <span>Remember me</span>
                    </label>
                    <button type="button" className="text-[#BE185D] hover:underline">
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Sign In to KLISHÉ</span>
                  </button>

                  {/* 1-Click Demo Login */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleQuickDemoLogin}
                      className="w-full py-2 bg-[#FFF0F5] hover:bg-[#FCE7F0] text-[#831843] border border-[#F9D5E5] text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                      <span>1-Click Demo Login (Amelia V.)</span>
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4 max-w-md mx-auto">
                  <div>
                    <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eloise Santos"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] text-[#4A2834]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eloise@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] text-[#4A2834]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                      Philippine Mobile Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="0917 123 4567"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] text-[#4A2834]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                      Create Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="At least 6 characters"
                      value={regPass}
                      onChange={(e) => setRegPass(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] text-[#4A2834]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
                  >
                    Create Account &amp; Unlock Welcome Gift
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 2. LOGGED IN: Profile Tab */}
          {isLoggedIn && accountActiveTab === 'profile' && (
            <div className="space-y-6">
              
              {/* Member Card */}
              <div className="p-4 bg-[#FFF8FA] rounded-2xl border border-[#FCE7F0] flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-[#4A2834]">{currentUser?.name}</h3>
                    <span className="text-[10px] bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded-full font-medium">
                      Verified Member
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#7B5967]">
                    <Mail className="w-3.5 h-3.5 text-[#BE185D]" />
                    <span>{currentUser?.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#7B5967]">
                    <Phone className="w-3.5 h-3.5 text-[#BE185D]" />
                    <span>{currentUser?.phone || '0917 123 4567'}</span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-xs text-[#E11D48] hover:bg-[#FFE4E6] rounded-xl font-medium transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Coquette Club Loyalty Points Card */}
              <div className="p-4 bg-gradient-to-r from-[#FFF0F5] to-[#FCE7F0] rounded-2xl border border-[#F9D5E5] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#BE185D]" />
                    <span className="text-xs font-bold text-[#831843] uppercase tracking-wider">
                      Coquette Club Loyalty Rewards
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#BE185D] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                    Rose Princess Tier
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-2xl font-serif font-bold text-[#831843] tabular-nums">
                      {loyaltyPoints}
                    </span>
                    <span className="text-xs text-[#6B4B58] ml-1.5">Points Available</span>
                  </div>
                  <span className="text-xs font-semibold text-[#15803D]">
                    Equivalent to ₱{loyaltyPoints}.00 discount
                  </span>
                </div>

                <div className="pt-2 border-t border-[#F9D5E5]/80 flex items-center justify-between text-[11px] text-[#7B5967]">
                  <span>Earn 1 point for every ₱10 spent</span>
                  <button
                    onClick={() => {
                      setAccountModalOpen(false);
                      setActivePage('shop');
                    }}
                    className="font-semibold text-[#BE185D] hover:underline"
                  >
                    Shop &amp; Earn More →
                  </button>
                </div>
              </div>

              {/* Saved Delivery Address */}
              <div className="p-4 bg-white rounded-2xl border border-[#FCE7F0] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#5A3B49]">
                    <MapPin className="w-4 h-4 text-[#BE185D]" />
                    <span>Default Philippine Delivery Address</span>
                  </div>
                  <span className="text-[10px] text-[#BE185D] font-medium">Saved</span>
                </div>
                <p className="text-xs text-[#6B4B58] leading-relaxed">
                  {currentUser?.defaultAddress?.streetAddress || '12 Blossom Lane, Sakura Residences'},{' '}
                  {currentUser?.defaultAddress?.barangay || 'San Lorenzo'},{' '}
                  {currentUser?.defaultAddress?.city || 'Makati City'},{' '}
                  {currentUser?.defaultAddress?.province || 'Metro Manila'},{' '}
                  {currentUser?.defaultAddress?.postalCode || '1223'}
                </p>
              </div>

              {/* Modes of Payment Saved Preferences */}
              <div className="p-4 bg-white rounded-2xl border border-[#FCE7F0] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#5A3B49]">
                    <CreditCard className="w-4 h-4 text-[#BE185D]" />
                    <span>Available Payment Modes</span>
                  </div>
                  <span className="text-[10px] text-gray-500">Simulated Safe Checkout</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#6B4B58]">
                  <div className="p-2.5 bg-[#FFF0F5] rounded-xl border border-[#FCE7F0] text-center">
                    <span className="font-bold text-[#007DFE] block">GCash</span>
                    <span className="text-[10px] text-gray-500">Connected</span>
                  </div>
                  <div className="p-2.5 bg-[#FFF0F5] rounded-xl border border-[#FCE7F0] text-center">
                    <span className="font-bold text-[#00D09C] block">Maya</span>
                    <span className="text-[10px] text-gray-500">Connected</span>
                  </div>
                  <div className="p-2.5 bg-[#FFF0F5] rounded-xl border border-[#FCE7F0] text-center">
                    <span className="font-bold text-[#831843] block">Cash on Del.</span>
                    <span className="text-[10px] text-gray-500">Nationwide</span>
                  </div>
                  <div className="p-2.5 bg-[#FFF0F5] rounded-xl border border-[#FCE7F0] text-center">
                    <span className="font-bold text-[#5B21B6] block">Bank / Cards</span>
                    <span className="text-[10px] text-gray-500">BDO / BPI</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. LOGGED IN: Orders Tab */}
          {isLoggedIn && accountActiveTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#8A6A78]">
                  <p>You haven't placed any orders yet.</p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="p-4 bg-white rounded-2xl border border-[#FCE7F0] space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b border-[#FCE7F0]/70 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#831843] font-mono">{ord.id}</span>
                          <span className="text-[10px] bg-[#FCE7F0] text-[#9D174D] font-medium px-2 py-0.5 rounded-full">
                            {ord.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#8A6A78]">
                          {new Date(ord.createdAt).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-serif font-bold text-[#831843] tabular-nums block">
                          ₱{ord.total.toLocaleString('en-PH')}
                        </span>
                        <span className="text-[10px] text-[#6B4B58]">{ord.paymentMethodLabel}</span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="space-y-2 text-xs">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[#5D3D4B]">
                          <span>
                            {it.quantity}x {it.product.name} {it.selectedVariant ? `(${it.selectedVariant})` : ''}
                          </span>
                          <span className="tabular-nums font-medium">₱{(it.unitPrice * it.quantity).toLocaleString('en-PH')}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tracking status bar */}
                    <div className="pt-2 border-t border-[#FCE7F0]/70 flex items-center justify-between text-[11px] text-[#6B4B58]">
                      <div className="flex items-center gap-1 text-[#15803D]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Tracking: {ord.trackingNumber}</span>
                      </div>
                      <span className="text-[#BE185D] font-medium">Handcrafted with Love ୨ৎ</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 4. LOGGED IN: Wishlist Tab (Integrated in Account Section) */}
          {isLoggedIn && accountActiveTab === 'wishlist' && (
            <div className="space-y-4">
              {wishlist.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#8A6A78] space-y-2">
                  <p>Your personal wishlist is currently empty.</p>
                  <button
                    onClick={() => {
                      setAccountModalOpen(false);
                      setActivePage('shop');
                    }}
                    className="text-[#BE185D] font-semibold hover:underline"
                  >
                    Browse lovely accessories &amp; stationery →
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between gap-3 p-3 bg-[#FFF8FA] rounded-2xl border border-[#FCE7F0]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 border border-[#FCE7F0]">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-[#4A2834] truncate">{item.product.name}</h4>
                        <span className="text-xs font-serif font-bold text-[#831843] tabular-nums">
                          ₱{item.product.price.toLocaleString('en-PH')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => moveToCartFromWishlist(item.product)}
                        className="px-2.5 py-1.5 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-medium rounded-xl flex items-center gap-1 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.productId)}
                        className="p-1.5 text-gray-400 hover:text-[#E11D48] transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
