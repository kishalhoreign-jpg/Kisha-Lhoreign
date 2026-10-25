import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  ArrowRight, 
  Truck, 
  Package, 
  Clock, 
  MapPin, 
  CreditCard,
  Heart
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationPage: React.FC = () => {
  const { latestOrder, setActivePage, setSelectedCategory } = useShop();

  if (!latestOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-serif font-bold text-[#4A2834]">
          No recent order found
        </h2>
        <button
          onClick={() => setActivePage('home')}
          className="px-5 py-2.5 bg-[#BE185D] text-white text-xs font-semibold rounded-xl"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* 1. Celebration Banner */}
      <div className="bg-gradient-to-b from-[#FFF0F5] to-white rounded-3xl border border-[#FCE7F0] p-8 sm:p-10 text-center space-y-4 shadow-sm">
        
        <div className="w-16 h-16 rounded-full bg-[#FCE7F0] text-[#BE185D] flex items-center justify-center mx-auto text-3xl font-serif shadow-xs">
          ୨ৎ
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#15803D] rounded-full text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Simulated Order Placed Successfully</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A2834]">
          Thank You, {latestOrder.shippingAddress.fullName.split(' ')[0]}!
        </h1>

        <p className="text-xs sm:text-sm text-[#7D5A68] max-w-lg mx-auto">
          We’ve received your order and our Manila studio team is now hand-wrapping your lovely selections in double-faced satin ribbons.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <div className="px-4 py-2 bg-white rounded-xl border border-[#F0C9DA] text-xs">
            <span className="text-[#8A6A78] block text-[10px] uppercase font-semibold">Order ID</span>
            <strong className="text-sm font-mono text-[#831843]">{latestOrder.id}</strong>
          </div>

          <div className="px-4 py-2 bg-white rounded-xl border border-[#F0C9DA] text-xs">
            <span className="text-[#8A6A78] block text-[10px] uppercase font-semibold">Tracking Number</span>
            <strong className="text-sm font-mono text-[#15803D]">{latestOrder.trackingNumber}</strong>
          </div>
        </div>

      </div>

      {/* 2. Simulated Order Delivery Progress Tracker */}
      <div className="bg-white rounded-3xl border border-[#FCE7F0] p-6 sm:p-8 space-y-6">
        <h2 className="text-sm font-bold text-[#4A2834] uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#BE185D]" />
          <span>Order Timeline &amp; Packaging Status</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          
          {/* Step 1 */}
          <div className="p-4 bg-[#FFF8FA] rounded-2xl border border-[#FCE7F0] space-y-1.5 relative">
            <div className="flex items-center gap-2 text-xs font-bold text-[#15803D]">
              <CheckCircle2 className="w-4 h-4" />
              <span>1. Order Placed</span>
            </div>
            <p className="text-[11px] text-[#7B5967]">
              Confirmed &amp; queued in Manila studio.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 bg-[#FFF0F5] rounded-2xl border border-[#F472B6] space-y-1.5 relative">
            <div className="flex items-center gap-2 text-xs font-bold text-[#BE185D]">
              <Sparkles className="w-4 h-4 animate-spin text-[#BE185D]" />
              <span>2. Ribbon Wrapping</span>
            </div>
            <p className="text-[11px] text-[#7B5967]">
              Packaging with satin bows &amp; wax seal.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 bg-white rounded-2xl border border-[#FCE7F0] space-y-1.5 opacity-70">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8A6A78]">
              <Truck className="w-4 h-4" />
              <span>3. Courier Dispatch</span>
            </div>
            <p className="text-[11px] text-[#8A6A78]">
              Handover to J&amp;T / LBC express.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 bg-white rounded-2xl border border-[#FCE7F0] space-y-1.5 opacity-70">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8A6A78]">
              <Package className="w-4 h-4" />
              <span>4. Out for Delivery</span>
            </div>
            <p className="text-[11px] text-[#8A6A78]">
              Estimated within 1–3 business days.
            </p>
          </div>

        </div>
      </div>

      {/* 3. Itemized Receipt & Delivery Summary */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Purchased Items */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-[#FCE7F0] p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#4A2834] uppercase tracking-wider">
            Items in This Parcel
          </h3>

          <div className="divide-y divide-[#FCE7F0] space-y-3">
            {latestOrder.items.map((it, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FFF5F8] border border-[#FCE7F0] shrink-0">
                    <img src={it.product.images[0]} alt={it.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#4A2834]">{it.product.name}</h4>
                    <span className="text-[11px] text-[#8A6A78]">
                      Qty: {it.quantity} {it.selectedVariant ? `· ${it.selectedVariant}` : ''}
                    </span>
                  </div>
                </div>

                <span className="font-serif font-bold text-[#831843] tabular-nums">
                  ₱{(it.unitPrice * it.quantity).toLocaleString('en-PH')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#FCE7F0] space-y-2 text-xs text-[#6B4B58]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold tabular-nums text-[#4A2834]">₱{latestOrder.subtotal.toLocaleString('en-PH')}</span>
            </div>
            {latestOrder.discount > 0 && (
              <div className="flex justify-between text-[#BE185D]">
                <span>Discount ({latestOrder.discountCode})</span>
                <span className="font-semibold tabular-nums">-₱{latestOrder.discount.toLocaleString('en-PH')}</span>
              </div>
            )}
            {latestOrder.pointsDiscount && latestOrder.pointsDiscount > 0 ? (
              <div className="flex justify-between text-[#BE185D]">
                <span>Loyalty Points Redeemed</span>
                <span className="font-semibold tabular-nums">-₱{latestOrder.pointsDiscount.toLocaleString('en-PH')}</span>
              </div>
            ) : null}
            {latestOrder.hasGiftWrapping && (
              <div className="flex justify-between text-[#831843]">
                <span className="flex items-center gap-1 font-medium">
                  <span>୨ৎ Signature Gift Wrapping</span>
                </span>
                <span className="font-semibold tabular-nums">+₱{(latestOrder.giftWrappingFee ?? 30).toLocaleString('en-PH')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Courier Delivery</span>
              <span className="font-semibold tabular-nums text-[#4A2834]">
                {latestOrder.shippingFee === 0 ? <span className="text-[#15803D]">FREE</span> : `₱${latestOrder.shippingFee.toLocaleString('en-PH')}`}
              </span>
            </div>
            <div className="pt-2 border-t border-[#FCE7F0] flex justify-between text-base font-bold text-[#831843]">
              <span>Grand Total</span>
              <span className="font-serif text-xl tabular-nums">₱{latestOrder.total.toLocaleString('en-PH')}</span>
            </div>
          </div>

          {/* Coquette Club Points Earned Badge */}
          {latestOrder.pointsEarned && latestOrder.pointsEarned > 0 ? (
            <div className="p-3 bg-gradient-to-r from-[#FFF0F5] to-[#FCE7F0]/60 border border-[#F0C9DA] rounded-2xl flex items-center justify-between text-xs text-[#831843]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#BE185D]" />
                <span className="font-medium">Coquette Club Rewards</span>
              </div>
              <span className="font-bold text-[#BE185D]">
                +{latestOrder.pointsEarned} Points Earned! ୨ৎ
              </span>
            </div>
          ) : null}
        </div>

        {/* Shipping & Payment Meta */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-[#FCE7F0] p-6 space-y-4 text-xs">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-[#4A2834] uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 text-[#BE185D]" />
                <span>Shipping Address</span>
              </div>
              <p className="font-semibold text-[#4A2834]">{latestOrder.shippingAddress.fullName}</p>
              <p className="text-[#6B4B58] leading-relaxed">
                {latestOrder.shippingAddress.streetAddress}, Brgy. {latestOrder.shippingAddress.barangay}, {latestOrder.shippingAddress.city}, {latestOrder.shippingAddress.province} {latestOrder.shippingAddress.postalCode}
              </p>
              <p className="text-[#6B4B58] mt-1">Contact: {latestOrder.shippingAddress.phone}</p>
            </div>

            <div className="pt-3 border-t border-[#FCE7F0]">
              <div className="flex items-center gap-1.5 font-bold text-[#4A2834] uppercase tracking-wider mb-2">
                <CreditCard className="w-4 h-4 text-[#BE185D]" />
                <span>Payment Mode (Simulated)</span>
              </div>
              <p className="font-semibold text-[#831843]">{latestOrder.paymentMethodLabel}</p>
              <span className="text-[10px] text-gray-500">No live financial charges made</span>
            </div>

            {latestOrder.shippingAddress.orderNotes && (
              <div className="pt-3 border-t border-[#FCE7F0]">
                <span className="font-bold text-[#4A2834] uppercase tracking-wider block mb-1">
                  Gift Note / Instructions
                </span>
                <p className="text-[#7B5967] italic bg-[#FFF8FA] p-2.5 rounded-xl border border-[#FCE7F0]">
                  “{latestOrder.shippingAddress.orderNotes}”
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 bg-white hover:bg-[#FFF0F5] border border-[#F0C9DA] text-[#831843] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('All');
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 py-2.5 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Keep Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
