import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [imageError, setImageError] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const defaultVariant = product.variants?.[0]?.options?.[0];

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-[#FCE7F0] overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#FCE7F0]/60 hover:-translate-y-1">
      
      {/* Visual Product Showcase Container */}
      <div 
        onClick={() => openProductDetail(product)}
        className="relative aspect-4/3 w-full bg-[#FFF5F8] overflow-hidden cursor-pointer"
      >
        {!imageError && product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF0F5] to-[#FCE7F0] p-4 text-center">
            <span className="text-3xl text-[#F472B6] mb-1">୨ৎ</span>
            <span className="text-xs font-serif text-[#831843] font-medium">{product.name}</span>
          </div>
        )}

        {/* Top Badges & Wishlist Button */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex flex-col gap-1">
            {product.isBestseller && (
              <span className="bg-[#831843] text-white text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full shadow-sm">
                Bestseller
              </span>
            )}
            {product.isNewArrival && (
              <span className="bg-[#BE185D] text-white text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full shadow-sm">
                New In
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
            className={`pointer-events-auto p-2 rounded-full shadow-sm backdrop-blur-md transition-transform duration-200 hover:scale-110 ${
              isFavorited 
                ? 'bg-white text-[#E11D48]' 
                : 'bg-white/85 text-[#885A6B] hover:text-[#BE185D] hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-[#E11D48] text-[#E11D48]' : ''}`} />
          </button>
        </div>

        {/* Quick View Overlay Button on Desktop */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
          <span className="w-full py-2 bg-white/90 backdrop-blur-sm text-[#831843] text-xs font-semibold rounded-xl text-center shadow-md flex items-center justify-center gap-1.5 hover:bg-white transition-colors">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View &amp; Details</span>
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating separator */}
          <div className="flex items-center justify-between text-[11px] text-[#9D4B68] mb-1">
            <span className="uppercase tracking-wider font-medium">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
              <span className="font-medium text-[#5A3845] tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-[#A27B8A]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => openProductDetail(product)}
            className="text-sm font-semibold text-[#4A2834] group-hover:text-[#BE185D] transition-colors cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#7B5967] line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#FCE7F0]/70 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-serif font-bold text-[#831843] tabular-nums">
                ₱{product.price.toLocaleString('en-PH')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#A88B97] line-through tabular-nums">
                  ₱{product.originalPrice.toLocaleString('en-PH')}
                </span>
              )}
            </div>

            {/* Stock indicator */}
            <span className="text-[10px] text-[#15803D] font-medium block">
              {product.stock <= 8 ? `Only ${product.stock} left in stock!` : 'In stock · Ready to ship'}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, defaultVariant, 1);
            }}
            className="px-3.5 py-2 bg-[#FCE7F0] hover:bg-[#FBCFE8] text-[#831843] hover:text-[#9D174D] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
            aria-label={`Add ${product.name} to shopping bag`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};
