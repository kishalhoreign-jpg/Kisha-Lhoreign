import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistModal: React.FC = () => {
  const { 
    wishlist, 
    wishlistModalOpen, 
    setWishlistModalOpen, 
    removeFromWishlist, 
    moveToCartFromWishlist,
    setActivePage
  } = useShop();

  if (!wishlistModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={() => setWishlistModalOpen(false)} 
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#FCE7F0] overflow-hidden z-10 max-h-[85vh] flex flex-col my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#FCE7F0] flex items-center justify-between bg-[#FFF8FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FFE4E6] flex items-center justify-center text-[#E11D48]">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-[#4A2834]">
                My Coquette Wishlist
              </h2>
              <p className="text-xs text-[#8A6A78]">
                {wishlist.length} {wishlist.length === 1 ? 'lovely piece saved' : 'lovely pieces saved'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setWishlistModalOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-white transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1 divide-y divide-[#FCE7F0]/70">
          {wishlist.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#BE185D] text-2xl font-serif">
                ୨ৎ
              </div>
              <h3 className="text-base font-serif font-bold text-[#4A2834]">
                Your wishlist is waiting for pretty things!
              </h3>
              <p className="text-xs text-[#8A6A78] max-w-sm">
                Tap the little heart on any hair clip, journal, or gift bundle to keep track of your favorites.
              </p>
              <button
                onClick={() => {
                  setWishlistModalOpen(false);
                  setActivePage('shop');
                }}
                className="mt-2 px-5 py-2.5 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map((item) => (
                <div key={item.productId} className="pt-4 first:pt-0 flex items-center gap-4">
                  
                  {/* Thumbnail */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#FFF5F8] border border-[#FCE7F0] shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#BE185D]">
                      {item.product.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#4A2834] truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-serif font-bold text-[#831843] tabular-nums">
                        ₱{item.product.price.toLocaleString('en-PH')}
                      </span>
                      <span className="text-[10px] text-[#15803D] font-medium">
                        {item.product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => moveToCartFromWishlist(item.product)}
                      className="px-3 py-1.5 bg-[#FCE7F0] hover:bg-[#FBCFE8] text-[#831843] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                      title="Move to shopping bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Move to Bag</span>
                    </button>

                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      className="p-2 text-gray-400 hover:text-[#E11D48] rounded-xl hover:bg-[#FFF0F5] transition-colors"
                      aria-label="Remove item"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 bg-[#FFF8FA] border-t border-[#FCE7F0] flex items-center justify-between text-xs">
            <span className="text-[#8A6A78]">
              Items remain saved in your browser &amp; account.
            </span>
            <button
              onClick={() => {
                wishlist.forEach(i => moveToCartFromWishlist(i.product));
              }}
              className="font-semibold text-[#BE185D] hover:underline"
            >
              Move All to Bag 🌸
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
