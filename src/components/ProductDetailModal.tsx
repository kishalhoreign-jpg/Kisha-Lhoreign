import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  Gift, 
  RotateCcw,
  Minus,
  Plus,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    closeProductDetail, 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useShop();

  if (!selectedProduct) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>(() => {
    return selectedProduct.variants?.[0]?.options?.[0] || 'Standard';
  });
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'care' | 'shipping'>('desc');

  const isFavorited = isInWishlist(selectedProduct.id);
  const currentImage = selectedProduct.images[selectedImageIndex] || selectedProduct.images[0];

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={closeProductDetail} 
        aria-hidden="true" 
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#FCE7F0] overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-[#6D4C58] hover:text-[#BE185D] rounded-full shadow-sm transition-transform active:scale-95"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Gallery Column */}
            <div className="space-y-4">
              <div className="relative aspect-4/3 w-full bg-[#FFF5F8] rounded-2xl overflow-hidden border border-[#FCE7F0]">
                <img
                  src={currentImage}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                
                {selectedProduct.isBestseller && (
                  <span className="absolute top-3 left-3 bg-[#831843] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIndex === idx 
                          ? 'border-[#BE185D] ring-2 ring-[#BE185D]/30' 
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#FCE7F0]/60 text-xs text-[#6B4B58]">
                <div className="flex items-center gap-2 p-2 bg-[#FFF8FA] rounded-xl border border-[#FCE7F0]/50">
                  <Gift className="w-4 h-4 text-[#BE185D] shrink-0" />
                  <span>Complimentary Ribbon Gift Wrap</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-[#FFF8FA] rounded-xl border border-[#FCE7F0]/50">
                  <Truck className="w-4 h-4 text-[#BE185D] shrink-0" />
                  <span>Ships nationwide across PH</span>
                </div>
              </div>
            </div>

            {/* Product Purchase Column */}
            <div className="space-y-5">
              
              <div>
                {/* Category & Tags */}
                <div className="flex items-center gap-2 text-xs text-[#9D4B68] font-medium uppercase tracking-wider mb-1">
                  <span>{selectedProduct.parentCategory}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProduct.category}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A2834] leading-tight">
                  {selectedProduct.name}
                </h2>

                {/* Rating & Review Counter */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-[#F59E0B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#4A2834] tabular-nums">
                    {selectedProduct.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-[#8A6A78]">
                    ({selectedProduct.reviewCount} verified reviews)
                  </span>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 p-3.5 bg-[#FFF0F5]/50 rounded-2xl border border-[#FCE7F0]">
                <span className="text-3xl font-serif font-bold text-[#831843] tabular-nums">
                  ₱{selectedProduct.price.toLocaleString('en-PH')}
                </span>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-base text-[#9B7788] line-through tabular-nums">
                    ₱{selectedProduct.originalPrice.toLocaleString('en-PH')}
                  </span>
                )}
                <span className="text-xs text-[#15803D] font-medium bg-[#DCFCE7] px-2 py-0.5 rounded-full ml-auto">
                  {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock} units)` : 'Out of Stock'}
                </span>
              </div>

              {/* Variant Selectors */}
              {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                <div className="space-y-3">
                  {selectedProduct.variants.map((v, vIdx) => (
                    <div key={vIdx} className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#5A3B49] uppercase tracking-wider">
                        {v.name}: <span className="font-normal text-[#BE185D]">{selectedVariant}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {v.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSelectedVariant(opt)}
                            className={`px-3.5 py-1.5 text-xs rounded-xl font-medium border transition-all ${
                              selectedVariant === opt
                                ? 'border-[#BE185D] bg-[#FCE7F0] text-[#831843] shadow-xs'
                                : 'border-[#F0C9DA] bg-white text-[#6B4B58] hover:border-[#BE185D]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity Stepper & Add to Bag / Wishlist Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#F0C9DA] rounded-xl bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 text-[#6D4C58] hover:text-[#BE185D] hover:bg-[#FFF0F5] rounded-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-[#4A2834] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                      className="p-1.5 text-[#6D4C58] hover:text-[#BE185D] hover:bg-[#FFF0F5] rounded-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Primary Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={selectedProduct.stock <= 0}
                    className="flex-1 py-3 px-5 bg-[#BE185D] hover:bg-[#9D174D] active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#BE185D]/20 transition-all flex items-center justify-center gap-2"
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>Added to Bag! 🌸</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag · ₱{(selectedProduct.price * quantity).toLocaleString('en-PH')}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button in PDP */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`p-3 rounded-xl border transition-all ${
                      isFavorited
                        ? 'border-[#E11D48] bg-[#FFE4E6] text-[#E11D48]'
                        : 'border-[#F0C9DA] bg-white text-[#6D4C58] hover:text-[#BE185D] hover:bg-[#FFF0F5]'
                    }`}
                    aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#E11D48] text-[#E11D48]' : ''}`} />
                  </button>

                </div>
              </div>

              {/* Informational Tabs: Description, Specs, Care, Shipping */}
              <div className="pt-4 border-t border-[#FCE7F0]">
                <div className="flex border-b border-[#FCE7F0] text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('desc')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'desc' 
                        ? 'border-[#BE185D] text-[#BE185D] font-semibold' 
                        : 'border-transparent text-[#7B5967] hover:text-[#BE185D]'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'specs' 
                        ? 'border-[#BE185D] text-[#BE185D] font-semibold' 
                        : 'border-transparent text-[#7B5967] hover:text-[#BE185D]'
                    }`}
                  >
                    Dimensions
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'care' 
                        ? 'border-[#BE185D] text-[#BE185D] font-semibold' 
                        : 'border-transparent text-[#7B5967] hover:text-[#BE185D]'
                    }`}
                  >
                    Materials &amp; Care
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'shipping' 
                        ? 'border-[#BE185D] text-[#BE185D] font-semibold' 
                        : 'border-transparent text-[#7B5967] hover:text-[#BE185D]'
                    }`}
                  >
                    PH Shipping
                  </button>
                </div>

                <div className="py-3 text-xs text-[#5D3D4B] leading-relaxed">
                  {activeTab === 'desc' && (
                    <p>{selectedProduct.description}</p>
                  )}
                  {activeTab === 'specs' && (
                    <div className="space-y-1.5">
                      <p><strong>Dimensions:</strong> {selectedProduct.dimensions || 'Standard accessory sizing'}</p>
                      <p><strong>SKU:</strong> {selectedProduct.id.toUpperCase()}</p>
                    </div>
                  )}
                  {activeTab === 'care' && (
                    <div className="space-y-1.5">
                      <p><strong>Materials:</strong> {selectedProduct.materials || 'Satin silk, pearls, and premium components'}</p>
                      <p><strong>Care:</strong> {selectedProduct.careInstructions || 'Keep in a cool, dry place. Avoid excessive heat and direct moisture.'}</p>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-1.5">
                      <p>• Metro Manila: 1–3 business days via J&amp;T or LBC (₱80 or FREE over ₱999)</p>
                      <p>• Provincial Luzon, Visayas, Mindanao: 3–6 business days (₱150 or FREE over ₱1,299)</p>
                      <p>• Every parcel includes our signature hand-tied satin ribbon packaging.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
