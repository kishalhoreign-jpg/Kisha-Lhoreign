import React, { useState } from 'react';
import { Heart, Sparkles, Send, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedCategory, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    showToast('🎀 You joined the KLISHÉ Coquette Club! Use PRETTY10 for 10% off.');
  };

  const navigateTo = (page: string, category?: Category) => {
    setActivePage(page);
    if (category) setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFF0F5] border-t border-[#FCE7F0] text-[#553844] mt-20">
      
      {/* Newsletter Section */}
      <div className="border-b border-[#F9D5E5]/70 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[#F9D5E5] text-[#BE185D] text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Join the KLISHÉ Coquette Club</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#831843]">
            Be the First to Unbox New Pretty Finds
          </h3>

          <p className="text-xs sm:text-sm text-[#7D5A68] max-w-lg mx-auto">
            Subscribe for secret ribbon restocks, student discounts, stationery journal prompts, and 10% off your first order!
          </p>

          {subscribed ? (
            <div className="p-3 bg-white rounded-2xl border border-[#F472B6] text-xs text-[#BE185D] font-medium max-w-md mx-auto flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 fill-[#BE185D]" />
              <span>Thank you darling! Use promo code <strong>PRETTY10</strong> at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email (e.g. darling@gmail.com)"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 text-xs bg-white border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Sitemap & Brand Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold tracking-widest text-[#831843]">
                KLISHÉ
              </span>
              <span className="text-[#F472B6] text-lg font-serif italic select-none">୨ৎ</span>
            </div>
            <p className="text-xs text-[#BE185D] font-serif italic">
              “Your Everyday Dose of Pretty.”
            </p>
            <p className="text-xs text-[#7D5A68] leading-relaxed max-w-sm">
              KLISHÉ is a curated stationery and accessory boutique dedicated to romantic aesthetics, French satin ribbon hair bows, ink-proof journals, and heartfelt gifts handcrafted to brighten your school and everyday days.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#8A6A78]">
              <MapPin className="w-3.5 h-3.5 text-[#BE185D]" />
              <span>Manila Studio &amp; Packaging Suite, Philippines</span>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#831843] uppercase tracking-wider font-sans">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#6D4C58]">
              <li>
                <button onClick={() => navigateTo('shop', 'Hair Accessories')} className="hover:text-[#BE185D] transition-colors">
                  Hair Clips &amp; Ribbon Bows
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'Claw Clips')} className="hover:text-[#BE185D] transition-colors">
                  Pearl French Claw Clips
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'Notebooks & Journals')} className="hover:text-[#BE185D] transition-colors">
                  Gold-Foil Linen Journals
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'Pens & Writing')} className="hover:text-[#BE185D] transition-colors">
                  Slim Gel Ink Pens
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'Gifts & Bundles')} className="hover:text-[#BE185D] transition-colors">
                  Curated Keepsake Gift Boxes
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Store Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#831843] uppercase tracking-wider font-sans">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#6D4C58]">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#BE185D] transition-colors">
                  Our Story &amp; Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#BE185D] transition-colors">
                  Contact Us &amp; Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faqs')} className="hover:text-[#BE185D] transition-colors">
                  Shipping &amp; Delivery FAQs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('policies')} className="hover:text-[#BE185D] transition-colors">
                  Returns &amp; Store Policies
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('project-doc')} className="hover:text-[#BE185D] transition-colors font-medium text-[#BE185D] flex items-center gap-1">
                  <span>📄 Project Report / Document</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('cart')} className="hover:text-[#BE185D] transition-colors">
                  Shopping Bag &amp; Checkout
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Modes & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#831843] uppercase tracking-wider font-sans">
              Modes of Payment
            </h4>
            <p className="text-[11px] text-[#7D5A68]">
              We proudly accept popular Philippine payment channels:
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="px-2 py-1 bg-white rounded-lg border border-[#F9D5E5] text-[#007DFE] font-semibold text-center">
                GCash
              </div>
              <div className="px-2 py-1 bg-white rounded-lg border border-[#F9D5E5] text-[#00D09C] font-semibold text-center">
                Maya
              </div>
              <div className="px-2 py-1 bg-white rounded-lg border border-[#F9D5E5] text-[#831843] font-semibold text-center">
                Cash on Del.
              </div>
              <div className="px-2 py-1 bg-white rounded-lg border border-[#F9D5E5] text-[#6B21A8] font-semibold text-center">
                BDO / BPI
              </div>
            </div>
            <div className="pt-1 flex items-center gap-1.5 text-[10px] text-[#8A6A78]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
              <span>Simulated demo checkout for school project</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-[#F9D5E5] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A6A78] gap-3">
          <p>
            © 2026 KLISHÉ. All rights reserved. “Your Everyday Dose of Pretty.”
          </p>
          <div className="flex items-center gap-1">
            <span>Handcrafted with</span>
            <Heart className="w-3 h-3 text-[#BE185D] fill-current" />
            <span>for stationery &amp; ribbon bow lovers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
