import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Tag, 
  Truck, 
  Gift, 
  ShieldCheck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SHIPPING_RATES } from '../data/products';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
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
  const [giftNote, setGiftNote] = useState('');

  const currentRate = SHIPPING_RATES[selectedDeliveryOption];
  const remainingForFreeShipping = Math.max(0, currentRate.threshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / currentRate.threshold) * 100);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyDiscountCode(inputCode)) {
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#BE185D] text-3xl font-serif mx-auto">
          ୨ৎ
        </div>
        <h1 className="text-2xl font-serif font-bold text-[#4A2834]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#7D5A68] max-w-sm mx-auto">
          Looks like you haven't added any pretty stationery, satin bows, or gift bundles yet.
        </p>
        <button
          onClick={() => {
            setActivePage('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
        >
          <span>Explore Boutique Collections</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-[#FCE7F0] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A2834]">
            Shopping Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-[#8A6A78]">
            Review your lovely selections before proceeding to secure checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#E11D48] hover:underline font-medium self-start sm:self-auto"
        >
          Clear entire bag
        </button>
      </div>

      {/* Free Shipping Alert Bar */}
      <div className="p-4 bg-[#FFF0F5] rounded-2xl border border-[#FCE7F0]">
        <div className="flex items-center justify-between text-xs font-medium text-[#831843] mb-2">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#BE185D]" />
            {remainingForFreeShipping === 0 || appliedDiscount?.freeShipping ? (
              <strong className="text-[#15803D]">You unlocked FREE Nationwide Shipping! 🎉</strong>
            ) : (
              <span>Add <strong>₱{remainingForFreeShipping.toLocaleString('en-PH')}</strong> more of pretty items for FREE Philippine delivery!</span>
            )}
          </span>
          <span className="tabular-nums font-semibold">
            {appliedDiscount?.freeShipping ? '100%' : `${freeShippingProgress.toFixed(0)}%`}
          </span>
        </div>
        <div className="w-full h-2 bg-[#F9D5E5] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#F472B6] to-[#BE185D] transition-all duration-300"
            style={{ width: `${appliedDiscount?.freeShipping ? 100 : freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Line Items & Gift Note */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-[#FCE7F0] p-6 divide-y divide-[#FCE7F0]">
            {cart.map((item) => (
              <div key={item.id} className="pt-5 first:pt-0 pb-5 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Product Media & Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#FFF5F8] border border-[#FCE7F0] shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-[#BE185D]">
                      {item.product.category}
                    </span>
                    <h3 className="text-sm font-semibold text-[#4A2834]">
                      {item.product.name}
                    </h3>
                    {item.selectedVariant && (
                      <span className="text-xs text-[#7B5967] block">
                        Variant: {item.selectedVariant}
                      </span>
                    )}
                    <span className="text-xs font-serif font-bold text-[#831843] tabular-nums mt-0.5 block">
                      ₱{item.product.price.toLocaleString('en-PH')} each
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#FCE7F0]/60">
                  <div className="flex items-center border border-[#F0C9DA] rounded-xl bg-white p-1">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-[#6D4C58] hover:text-[#BE185D] hover:bg-[#FFF0F5] rounded-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-[#4A2834] tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-[#6D4C58] hover:text-[#BE185D] hover:bg-[#FFF0F5] rounded-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-serif font-bold text-[#831843] tabular-nums min-w-[75px] text-right">
                    ₱{(item.product.price * item.quantity).toLocaleString('en-PH')}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-gray-400 hover:text-[#E11D48] hover:bg-[#FFE4E6] rounded-xl transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Complimentary Ribbon Gift Note Option */}
          <div className="bg-white rounded-3xl border border-[#FCE7F0] p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#BE185D]" />
              <h3 className="text-xs font-bold text-[#4A2834] uppercase tracking-wider">
                Complimentary Hand-Written Gift Card &amp; Ribbon Note
              </h3>
            </div>
            <p className="text-xs text-[#7B5967]">
              Sending this as a gift? Type your recipient's name and message below. We will write it with gold ink on our signature ivory stationery card at no extra charge!
            </p>
            <textarea
              rows={2}
              placeholder="e.g. To dearest Sophia: Happy 18th Birthday! May your days be filled with bows and joy. Love, Camille"
              value={giftNote}
              onChange={(e) => setGiftNote(e.target.value)}
              className="w-full p-3 text-xs bg-[#FFF8FA] border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834]"
            />
          </div>

          {/* Back button */}
          <button
            onClick={() => setActivePage('shop')}
            className="text-xs font-semibold text-[#BE185D] hover:text-[#9D174D] flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-[#FCE7F0] p-6 space-y-5 shadow-sm sticky top-28">
            
            <h2 className="text-base font-serif font-bold text-[#4A2834]">
              Order Summary
            </h2>

            {/* Voucher Code */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5A3B49]">
                Have a voucher or coupon?
              </label>
              {appliedDiscount ? (
                <div className="flex items-center justify-between p-2.5 bg-[#FCE7F0] rounded-xl border border-[#F9D5E5] text-xs">
                  <span className="flex items-center gap-1.5 font-semibold text-[#831843]">
                    <Tag className="w-3.5 h-3.5 text-[#BE185D]" />
                    Voucher: {appliedDiscount.code} applied!
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
                    placeholder="Enter code (PRETTY10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-[#FFF8FA] border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] uppercase text-[#4A2834]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#831843] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl transition-colors"
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
            <div className="space-y-2.5 text-xs text-[#6B4B58] pt-2 border-t border-[#FCE7F0]">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
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

              <div className="pt-3 border-t border-[#FCE7F0] flex justify-between text-base font-bold text-[#831843]">
                <span>Estimated Total</span>
                <span className="font-serif text-xl tabular-nums">₱{orderTotal.toLocaleString('en-PH')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-[#BE185D] hover:bg-[#9D174D] active:scale-[0.99] text-white text-sm font-semibold rounded-2xl shadow-md shadow-[#BE185D]/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Payment Modes trust */}
            <div className="pt-2 text-center text-[11px] text-[#8A6A78] space-y-1">
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Simulated Secure Checkout for School Project</span>
              </div>
              <p>Supported: GCash · Maya · COD · Bank Transfer · Cards</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
