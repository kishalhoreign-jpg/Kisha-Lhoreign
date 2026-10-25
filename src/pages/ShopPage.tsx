import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  Check, 
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';

export const ShopPage: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery 
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(1200);

  const categories: Category[] = [
    'All',
    'Hair Accessories',
    'Ribbon Bows',
    'Claw Clips',
    'Stationery',
    'Notebooks & Journals',
    'Pens & Writing',
    'Stickers & Crafts',
    'Keychains',
    'Gifts & Bundles'
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'All') {
        if (
          product.category !== selectedCategory && 
          product.parentCategory !== selectedCategory
        ) {
          return false;
        }
      }

      // 3. Stock Filter
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      // 4. Max Price Filter
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, inStockOnly, maxPrice, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
    setMaxPrice(1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Category / Catalog Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-[#BE185D] uppercase tracking-widest block">
          KLISHÉ Boutique Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A2834]">
          {selectedCategory === 'All' ? 'Shop All Pretty Things' : selectedCategory}
        </h1>
        <p className="text-xs sm:text-sm text-[#7D5A68]">
          Discover delicate ribbons, French pearl clips, fountain-pen safe notebooks, and thoughtful gift sets.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="space-y-4">
        
        {/* Search & Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-[#FCE7F0]">
          
          {/* Working Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, material, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#FFF8FA] border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] text-[#4A2834]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters: Sort & Stock Toggle */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            
            {/* In stock toggle */}
            <label className="flex items-center gap-1.5 text-xs text-[#5D3D4B] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-[#BE185D] focus:ring-[#BE185D]"
              />
              <span>In-stock only</span>
            </label>

            {/* Price sort */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#7D5A68]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-[#FFF8FA] border border-[#F0C9DA] rounded-xl text-xs font-medium text-[#4A2834] focus:outline-none focus:border-[#BE185D]"
              >
                <option value="featured">Featured / Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

          </div>
        </div>

        {/* Category Segmented Tabs (Functional Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-[#BE185D] text-white shadow-xs'
                  : 'bg-white hover:bg-[#FFF0F5] border border-[#F0C9DA] text-[#6B4B58]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Active Filters Bar */}
        {(selectedCategory !== 'All' || searchQuery || inStockOnly || maxPrice < 1200) && (
          <div className="flex items-center justify-between p-2.5 bg-[#FFF0F5] rounded-xl border border-[#FCE7F0] text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#831843] font-semibold">Active filters:</span>
              {selectedCategory !== 'All' && (
                <span className="bg-white px-2 py-0.5 rounded-md border border-[#F9D5E5] text-[#BE185D]">
                  Category: {selectedCategory}
                </span>
              )}
              {searchQuery && (
                <span className="bg-white px-2 py-0.5 rounded-md border border-[#F9D5E5] text-[#BE185D]">
                  Search: "{searchQuery}"
                </span>
              )}
              {inStockOnly && (
                <span className="bg-white px-2 py-0.5 rounded-md border border-[#F9D5E5] text-[#BE185D]">
                  In stock only
                </span>
              )}
            </div>

            <button
              onClick={resetAllFilters}
              className="text-[#E11D48] hover:underline font-medium text-xs shrink-0"
            >
              Clear all
            </button>
          </div>
        )}

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#7B5967]">
        <span>
          Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'lovely item' : 'lovely items'}
        </span>
        <span>Prices in Philippine Pesos (₱)</span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-[#FCE7F0] p-8">
          <div className="w-16 h-16 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#BE185D] text-2xl font-serif mx-auto">
            ୨ৎ
          </div>
          <h3 className="text-lg font-serif font-bold text-[#4A2834]">
            No matching pretty items found
          </h3>
          <p className="text-xs text-[#8A6A78] max-w-sm mx-auto">
            Try searching for another keyword or reset the category filter to see our full boutique collection.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-5 py-2.5 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
