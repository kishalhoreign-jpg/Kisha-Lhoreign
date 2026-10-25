import React from 'react';
import { Sparkles, Heart, Gift, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-semibold text-[#BE185D] uppercase tracking-widest block">
          The KLISHÉ Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#4A2834]">
          “Your Everyday Dose of Pretty.”
        </h1>
        <p className="text-sm sm:text-base text-[#7D5A68] max-w-xl mx-auto leading-relaxed">
          Little things, lovely finds, and thoughtful gifts made to brighten your day.
        </p>
      </div>

      {/* Philosophy Card */}
      <div className="bg-white rounded-3xl border border-[#FCE7F0] p-8 sm:p-10 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 text-[#BE185D]">
          <span className="text-2xl">୨ৎ</span>
          <span className="text-xs font-bold uppercase tracking-wider">How KLISHÉ Began</span>
        </div>

        <h2 className="text-2xl font-serif font-bold text-[#4A2834]">
          Born from a love for romantic stationery &amp; delicate ribbons.
        </h2>

        <p className="text-xs sm:text-sm text-[#6B4B58] leading-relaxed">
          KLISHÉ started in Manila with a gentle belief: that the tools you reach for every day—your journal, your hair clips, your morning pen—should bring a smile to your heart. In a fast-paced world, coquette beauty reminds us to pause, tie a soft satin bow, write our dreams on gold-foiled paper, and celebrate gentle everyday rituals.
        </p>

        <p className="text-xs sm:text-sm text-[#6B4B58] leading-relaxed">
          Whether you're a high school student annotating your favorite novel, a university dreamer organizing exam notes, or a thoughtful friend looking for an unforgettable birthday gift box, KLISHÉ was crafted for you.
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#FCE7F0]">
          <div className="p-4 bg-[#FFF8FA] rounded-2xl border border-[#FCE7F0] space-y-2">
            <Sparkles className="w-5 h-5 text-[#BE185D]" />
            <h3 className="text-xs font-bold text-[#4A2834]">1. Artisanal Details</h3>
            <p className="text-[11px] text-[#7B5967]">
              Double-faced satin ribbons, lustrous freshwater pearls, and hand-inspected hair grips that never pull.
            </p>
          </div>

          <div className="p-4 bg-[#FFF8FA] rounded-2xl border border-[#FCE7F0] space-y-2">
            <Heart className="w-5 h-5 text-[#BE185D]" />
            <h3 className="text-xs font-bold text-[#4A2834]">2. Fountain-Pen Safe</h3>
            <p className="text-[11px] text-[#7B5967]">
              100–120gsm archival ivory paper that won't bleed through, smudge, or feather under inky pens.
            </p>
          </div>

          <div className="p-4 bg-[#FFF8FA] rounded-2xl border border-[#FCE7F0] space-y-2">
            <Gift className="w-5 h-5 text-[#BE185D]" />
            <h3 className="text-xs font-bold text-[#4A2834]">3. Unboxing Magic</h3>
            <p className="text-[11px] text-[#7B5967]">
              Every single order is packaged as a gift with crinkled paper, dried petals, and a real blush wax stamp.
            </p>
          </div>
        </div>
      </div>

      {/* Target Market Callout */}
      <div className="bg-[#FFF0F5] rounded-3xl border border-[#FCE7F0] p-8 text-center space-y-4">
        <h3 className="text-xl font-serif font-bold text-[#831843]">
          Made for Stationery Lovers &amp; Thoughtful Gift Shoppers
        </h3>
        <p className="text-xs sm:text-sm text-[#6B4B58] max-w-lg mx-auto leading-relaxed">
          We are proud to serve thousands of students, young creatives, journalers, and romantics across Luzon, Visayas, and Mindanao.
        </p>
        <button
          onClick={() => {
            setActivePage('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
        >
          <span>Explore Our Full Boutique</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
