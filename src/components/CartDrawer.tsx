import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Truck,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SHIPPING_RATES } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    appliedDiscount,
    applyDiscountCode,
    removeDiscountCode,
    discountError,
    calculatedDiscount,
    selectedDeliveryOption,
    shippingFee,
    orderTotal,
    setActivePage
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!cartDrawerOpen) return null;

  const currentRate = SHIPPING_RATES[selectedDeliveryOption];
  const remainingForFreeShipping = Math.max(0, currentRate.threshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / currentRate.threshold) * 100);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyDiscountCode(inputCode)) {
      setInputCode('');
    }
  };

  const handleCheckoutClick = () => {
    setCartDrawerOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCartPage = () => {
    setCartDrawerOpen(false);
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setCartDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#FCE7F0] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#FCE7F0] flex items-center justify-between bg-[#FFF8FA]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#FCE7F0] flex items-center justify-center text-[#BE185D]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-base font-serif font-bold text-[#4A2834]">
                Your Shopping Bag ({cartCount})
              </h2>
            </div>

            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-white transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="p-3.5 bg-[#FFF0F5] border-b border-[#FCE7F0] text-xs">
              <div className="flex items-center justify-between font-medium text-[#831843] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#BE185D]" />
                  {remainingForFreeShipping === 0 || appliedDiscount?.freeShipping ? (
                    <strong className="text-[#15803D]">You unlocked FREE Nationwide Shipping! 🎉</strong>
                  ) : (
                    <span>Add <strong>₱{remainingForFreeShipping.toLocaleString('en-PH')}</strong> more for FREE Shipping!</span>
                  )}
                </span>
                <span className="tabular-nums font-semibold">
                  {freeShippingProgress.toFixed(0)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#F9D5E5] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#F472B6] to-[#BE185D] transition-all duration-300"
                  style={{ width: `${appliedDiscount?.freeShipping ? 100 : freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#FCE7F0]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#BE185D] text-2xl font-serif">
                  ୨ৎ
                </div>
                <h3 className="text-base font-serif font-bold text-[#4A2834]">
                  Your shopping bag is empty
                </h3>
                <p className="text-xs text-[#8A6A78] max-w-xs">
                  Treat yourself or a loved one to satin hair bows, pretty notebooks, and aesthetic gifts.
                </p>
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    setActivePage('shop');
                  }}
                  className="mt-2 px-5 py-2.5 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Start Shopping</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                    {/* Item Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FFF5F8] border border-[#FCE7F0] shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-semibold text-[#4A2834] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-[#E11D48] p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedVariant && (
                          <span className="text-[11px] text-[#8A6A78] block">
                            Option: {item.selectedVariant}
                          </span>
                        )}

                        <span className="text-xs font-serif font-bold text-[#831843] tabular-nums mt-0.5 block">
                          ₱{item.product.price.toLocaleString('en-PH')}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#F0C9DA] rounded-lg bg-white">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#6D4C58] hover:text-[#BE185D] hover:bg-[#FFF0F5] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-[#4A2834] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#6D4C58] hover:text-[#BE185D] hover:bg-[#FFF0F5] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-medium text-[#4A2834] tabular-nums">
                          ₱{(item.product.price * item.quantity).toLocaleString('en-PH')}
                        </span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#FCE7F0] bg-[#FFF8FA] space-y-3.5">
              
              {/* Voucher Code Input */}
              <div className="space-y-1">
                {appliedDiscount ? (
                  <div className="flex items-center justify-between p-2 bg-[#FCE7F0] rounded-xl border border-[#F9D5E5] text-xs">
                    <span className="flex items-center gap-1.5 font-semibold text-[#831843]">
                      <Tag className="w-3.5 h-3.5 text-[#BE185D]" />
                      Code: {appliedDiscount.code} applied!
                    </span>
                    <button
                      onClick={removeDiscountCode}
                      className="text-xs text-[#E11D48] hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyVoucher} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code (try PRETTY10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] uppercase text-[#4A2834]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#831843] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {discountError && (
                  <span className="text-[11px] text-[#E11D48] block">{discountError}</span>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#6B4B58]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums text-[#4A2834]">₱{cartSubtotal.toLocaleString('en-PH')}</span>
                </div>

                {calculatedDiscount > 0 && (
                  <div className="flex justify-between text-[#BE185D]">
                    <span>Voucher Discount</span>
                    <span className="font-semibold tabular-nums">-₱{calculatedDiscount.toLocaleString('en-PH')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold tabular-nums text-[#4A2834]">
                    {shippingFee === 0 ? (
                      <span className="text-[#15803D]">FREE</span>
                    ) : (
                      `₱${shippingFee.toLocaleString('en-PH')}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#FCE7F0] flex justify-between text-sm font-bold text-[#831843]">
                  <span>Total</span>
                  <span className="font-serif text-lg tabular-nums">₱{orderTotal.toLocaleString('en-PH')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full py-3 bg-[#BE185D] hover:bg-[#9D174D] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-[#BE185D]/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleViewCartPage}
                  className="w-full py-2 bg-white hover:bg-[#FFF0F5] text-[#831843] border border-[#F0C9DA] text-xs font-semibold rounded-xl transition-colors"
                >
                  View Full Bag &amp; Order Notes
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
