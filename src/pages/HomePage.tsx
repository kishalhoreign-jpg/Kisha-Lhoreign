import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Star, 
  Gift, 
  Truck, 
  ShieldCheck, 
  Feather,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, REVIEWS, HERO_IMAGE } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';

export const HomePage: React.FC = () => {
  const { setActivePage, setSelectedCategory, openProductDetail } = useShop();

  const bestsellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.isNewArrival).slice(0, 4);

  const categories = [
    {
      name: 'Hair Accessories' as Category,
      image: '/src/assets/images/product_satin_bow_clips_1792953392030.jpg',
      count: '8 designs',
      desc: 'Satin bows, velvet ribbons & pearl snap pins'
    },
    {
      name: 'Claw Clips' as Category,
      image: '/src/assets/images/product_pearl_claw_clip_1792953393080.jpg',
      count: '6 styles',
      desc: 'Iridescent French clips with pearl inlays'
    },
    {
      name: 'Notebooks & Journals' as Category,
      image: '/src/assets/images/product_coquette_journal_set_1792953391897.jpg',
      count: '5 editions',
      desc: '120gsm ink-proof paper & gold foil linen covers'
    },
    {
      name: 'Gifts & Bundles' as Category,
      image: '/src/assets/images/product_gift_bundle_box_1792953392942.jpg',
      count: 'Curated Sets',
      desc: 'Keepsake gift boxes tied with satin ribbon'
    }
  ];

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. Hero Campaign Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F8] to-[#FFF8F8] border-b border-[#FCE7F0]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Copy & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 border border-[#F9D5E5] rounded-full text-xs font-medium text-[#BE185D] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>The Coquette Stationery &amp; Bow Boutique</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#4A2834] tracking-tight leading-[1.15]">
                Your Everyday <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#BE185D]">Dose of Pretty.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#6B4B58] leading-relaxed max-w-xl mx-auto lg:mx-0">
                “Little things, lovely finds, and thoughtful gifts made to brighten your day.” Handcrafted satin hair bows, gold-stamped journals, and bespoke gift bundles tailored for students, stationery dreamers, and romantics.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setActivePage('shop');
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#BE185D] hover:bg-[#9D174D] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-lg shadow-[#BE185D]/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleCategoryClick('Gifts & Bundles')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#FFF0F5] border border-[#F0C9DA] text-[#831843] text-xs sm:text-sm font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4 text-[#BE185D]" />
                  <span>Curated Gift Boxes</span>
                </button>
              </div>

              {/* Editorial micro-stats */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#7B5967] border-t border-[#FCE7F0]/70">
                <div>
                  <span className="font-serif font-bold text-[#831843] text-base block tabular-nums">1,200+</span>
                  <span>Happy PH Darlings</span>
                </div>
                <div className="w-px h-8 bg-[#FCE7F0]" />
                <div>
                  <span className="font-serif font-bold text-[#831843] text-base block tabular-nums">4.9 / 5.0</span>
                  <span>Verified Rating</span>
                </div>
                <div className="w-px h-8 bg-[#FCE7F0]" />
                <div>
                  <span className="font-serif font-bold text-[#831843] text-base block">100%</span>
                  <span>Handcrafted Ribbon Care</span>
                </div>
              </div>

            </div>

            {/* Right Hero Image Frame */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="relative aspect-16/10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={HERO_IMAGE}
                    alt="KLISHÉ Coquette Collection - Satin bows, gold foil journals, pearl hairpins"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Aesthetic Card */}
                <div className="absolute -bottom-5 -left-4 sm:left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#FCE7F0] flex items-center gap-3 max-w-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0F5] flex items-center justify-center text-[#BE185D] text-lg">
                    ୨ৎ
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#4A2834]">Hand-Tied with Love</h4>
                    <p className="text-[11px] text-[#7B5967]">Every order wrapped in double-faced satin ribbon &amp; wax seal.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Value Proposition Ribbon Strip */}
        <div className="border-t border-[#FCE7F0] bg-white/70 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#6B4B58]">
            <div className="flex items-center gap-2.5 justify-center md:justify-start">
              <Sparkles className="w-4 h-4 text-[#BE185D] shrink-0" />
              <span>Double-Faced Satin &amp; Pearls</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center md:justify-start">
              <Feather className="w-4 h-4 text-[#BE185D] shrink-0" />
              <span>120gsm Fountain-Pen Safe Paper</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center md:justify-start">
              <Truck className="w-4 h-4 text-[#BE185D] shrink-0" />
              <span>Free Nationwide Delivery over ₱999</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center md:justify-start">
              <ShieldCheck className="w-4 h-4 text-[#BE185D] shrink-0" />
              <span>Safe Philippine Payments (GCash/COD)</span>
            </div>
          </div>
        </div>

      </section>

      {/* 2. Visual Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-[#BE185D] uppercase tracking-wider block">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A2834]">
              Explore by Aesthetic Category
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('shop');
            }}
            className="text-xs font-semibold text-[#BE185D] hover:text-[#9D174D] flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative bg-white rounded-2xl border border-[#FCE7F0] overflow-hidden cursor-pointer hover:shadow-md hover:border-[#F472B6] transition-all"
            >
              <div className="aspect-4/3 overflow-hidden bg-[#FFF5F8]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-[#4A2834] group-hover:text-[#BE185D] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-[#A27B8A] font-medium">{cat.count}</span>
                </div>
                <p className="text-xs text-[#7B5967] line-clamp-1">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#BE185D] uppercase tracking-wider">
                Most Loved by Darlings
              </span>
              <span className="text-xs text-[#BE185D]">୨ৎ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A2834]">
              Coquette Bestsellers
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('shop');
            }}
            className="text-xs font-semibold text-[#BE185D] hover:text-[#9D174D] flex items-center gap-1 group"
          >
            <span>See Full Catalog</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Brand Story / Coquette Philosophy Spotlight */}
      <section className="bg-gradient-to-r from-[#FFF0F5] via-[#FFF8FA] to-[#FFF0F5] border-y border-[#FCE7F0] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-3xl font-serif text-[#F472B6]">୨ৎ</span>
          
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A2834] leading-tight">
            “KLISHÉ — Your Everyday Dose of Pretty. Little things, lovely finds, and thoughtful gifts made to brighten your day.”
          </h2>

          <p className="text-sm sm:text-base text-[#6B4B58] leading-relaxed max-w-2xl mx-auto">
            We believe that everyday study sessions, journaling hours, and morning hairstyles deserve a touch of gentle romance. Every clip is hand-inspected in Manila, every notebook bound with archival paper, and every gift box sealed with a real blush wax stamp.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                setActivePage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-white hover:bg-[#FFF0F5] border border-[#F0C9DA] text-[#831843] text-xs font-semibold rounded-xl transition-colors shadow-xs"
            >
              Read Our Full Story
            </button>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-[#BE185D] uppercase tracking-wider block">
              Fresh Off the Ribbon Loom
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A2834]">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('shop');
            }}
            className="text-xs font-semibold text-[#BE185D] hover:text-[#9D174D] flex items-center gap-1 group"
          >
            <span>Explore All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Promotional Gift Wrapping Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#831843] text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-block px-3 py-1 bg-white/15 rounded-full text-xs font-medium tracking-wider text-pink-200">
              Complimentary Ribbon Gift Packaging
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
              Gifting Made Effortless &amp; Unforgettable
            </h3>

            <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
              Every parcel can be customized with your recipient’s name hand-lettered on an ivory card. Perfect for birthdays, school achievements, anniversaries, or self-care treats.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => handleCategoryClick('Gifts & Bundles')}
                className="px-6 py-2.5 bg-white text-[#831843] hover:bg-pink-50 text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                Explore Gift Bundles
              </button>

              <div className="flex items-center gap-2 text-xs text-pink-200">
                <CheckCircle2 className="w-4 h-4 text-pink-300" />
                <span>Free shipping on orders ₱999+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Love & Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold text-[#BE185D] uppercase tracking-wider block">
            Coquette Community
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A2834]">
            Loved by Darlings Across the Philippines
          </h2>
          <p className="text-xs sm:text-sm text-[#7D5A68]">
            Real unboxings and genuine reviews from students, stationery collectors, and gift givers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-white rounded-2xl border border-[#FCE7F0] space-y-3 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center text-[#F59E0B]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#5A3845] leading-relaxed italic">
                  “{rev.comment}”
                </p>
              </div>

              <div className="pt-3 border-t border-[#FCE7F0]/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#4A2834]">{rev.author}</h4>
                    <span className="text-[10px] text-[#8A6A78] block">{rev.location}</span>
                  </div>
                  <span className="text-[10px] text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full font-medium">
                    Verified
                  </span>
                </div>
                <span className="text-[10px] text-[#BE185D] mt-1 block truncate">
                  Purchased: {rev.productName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
