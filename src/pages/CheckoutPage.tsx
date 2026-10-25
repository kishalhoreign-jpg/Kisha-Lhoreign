import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  Lock, 
  Gift, 
  Info, 
  Sparkles,
  Smartphone,
  Banknote,
  Building
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PaymentMethod, DeliveryOption, ShippingAddress } from '../types';
import { SHIPPING_RATES } from '../data/products';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    calculatedDiscount,
    appliedDiscount,
    selectedDeliveryOption,
    setSelectedDeliveryOption,
    shippingFee,
    hasGiftWrapping,
    setHasGiftWrapping,
    giftWrappingFee,
    loyaltyPoints,
    redeemedPoints,
    pointsDiscount,
    redeemPoints,
    resetRedeemedPoints,
    pointsEarnedThisOrder,
    orderTotal,
    placeOrder,
    currentUser,
    setActivePage
  } = useShop();

  // Form Fields
  const [fullName, setFullName] = useState(currentUser?.name || 'Amelia Valderrama');
  const [email, setEmail] = useState(currentUser?.email || 'amelia.valderrama@example.com');
  const [phone, setPhone] = useState(currentUser?.phone || '0917 892 4410');
  const [streetAddress, setStreetAddress] = useState('Unit 14B Sakura Residences, 24 Katipunan Ave');
  const [barangay, setBarangay] = useState('Loyola Heights');
  const [city, setCity] = useState('Quezon City');
  const [province, setProvince] = useState('Metro Manila');
  const [postalCode, setPostalCode] = useState('1108');
  const [orderNotes, setOrderNotes] = useState('Please wrap with our signature blush satin ribbon and include a gift card for Eloise!');

  // Payment Method selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gcash');

  // Simulated payment sub-fields
  const [gcashNumber, setGcashNumber] = useState('0917 892 4410');
  const [mayaNumber, setMayaNumber] = useState('0917 892 4410');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-serif font-bold text-[#4A2834]">
          Your bag is empty. Please add items before checking out.
        </h2>
        <button
          onClick={() => setActivePage('shop')}
          className="px-5 py-2.5 bg-[#BE185D] text-white text-xs font-semibold rounded-xl"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!phone.trim()) errs.phone = 'Contact number is required';
    if (!streetAddress.trim()) errs.streetAddress = 'House / street address is required';
    if (!barangay.trim()) errs.barangay = 'Barangay is required';
    if (!city.trim()) errs.city = 'City / Municipality is required';
    if (!province.trim()) errs.province = 'Province is required';
    if (!postalCode.trim()) errs.postalCode = 'Postal code is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    let paymentLabel = 'Simulated Payment';
    if (paymentMethod === 'gcash') paymentLabel = `GCash (${gcashNumber})`;
    if (paymentMethod === 'maya') paymentLabel = `Maya (${mayaNumber})`;
    if (paymentMethod === 'cod') paymentLabel = 'Cash on Delivery (COD)';
    if (paymentMethod === 'bank_transfer') paymentLabel = 'BDO/BPI Bank Transfer';
    if (paymentMethod === 'credit_card') paymentLabel = 'Credit/Debit Card (Test)';

    const shippingAddress: ShippingAddress = {
      fullName,
      email,
      phone,
      streetAddress,
      barangay,
      city,
      province,
      postalCode,
      orderNotes
    };

    // Simulate swift processing latency (800ms)
    setTimeout(() => {
      placeOrder(shippingAddress, paymentMethod, paymentLabel, orderNotes);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Checkout Header */}
      <div className="flex items-center justify-between border-b border-[#FCE7F0] pb-4">
        <div>
          <button
            onClick={() => setActivePage('cart')}
            className="text-xs text-[#BE185D] hover:underline font-medium flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Bag</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A2834]">
            KLISHÉ Express Checkout
          </h1>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF0F5] border border-[#F9D5E5] rounded-full text-xs font-semibold text-[#831843]">
          <Lock className="w-3.5 h-3.5 text-[#15803D]" />
          <span>Simulated Safe Demo</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Customer Contact Details */}
          <div className="bg-white rounded-3xl border border-[#FCE7F0] p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#FCE7F0]/80 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#FCE7F0] text-[#BE185D] text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-sm font-bold text-[#4A2834] uppercase tracking-wider">
                Customer Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Amelia Valderrama"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834] ${
                    errors.fullName ? 'border-[#E11D48]' : 'border-[#F0C9DA]'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-[#E11D48] mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                  Email Address (for order receipt) *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. amelia@example.com"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834] ${
                    errors.email ? 'border-[#E11D48]' : 'border-[#F0C9DA]'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-[#E11D48] mt-1">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                  Philippine Contact Number (for courier dispatch) *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0917 123 4567"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834] ${
                    errors.phone ? 'border-[#E11D48]' : 'border-[#F0C9DA]'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-[#E11D48] mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* 2. Philippine Delivery Address */}
          <div className="bg-white rounded-3xl border border-[#FCE7F0] p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#FCE7F0]/80 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#FCE7F0] text-[#BE185D] text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-sm font-bold text-[#4A2834] uppercase tracking-wider">
                Philippine Delivery Address
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                  House / Unit / Building / Street Address *
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="Unit 14B Sakura Residences, Katipunan Ave"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834] ${
                    errors.streetAddress ? 'border-[#E11D48]' : 'border-[#F0C9DA]'
                  }`}
                />
                {errors.streetAddress && <p className="text-[11px] text-[#E11D48] mt-1">{errors.streetAddress}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                    Barangay *
                  </label>
                  <input
                    type="text"
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                    placeholder="e.g. Loyola Heights / San Lorenzo"
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834] ${
                      errors.barangay ? 'border-[#E11D48]' : 'border-[#F0C9DA]'
                    }`}
                  />
                  {errors.barangay && <p className="text-[11px] text-[#E11D48] mt-1">{errors.barangay}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                    City / Municipality *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Quezon City / Makati / Cebu City"
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834] ${
                      errors.city ? 'border-[#E11D48]' : 'border-[#F0C9DA]'
                    }`}
                  />
                  {errors.city && <p className="text-[11px] text-[#E11D48] mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                    Province / Region *
                  </label>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="e.g. Metro Manila / Cavite / Cebu"
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834] ${
                      errors.province ? 'border-[#E11D48]' : 'border-[#F0C9DA]'
                    }`}
                  />
                  {errors.province && <p className="text-[11px] text-[#E11D48] mt-1">{errors.province}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                    Postal / ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. 1108"
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834] ${
                      errors.postalCode ? 'border-[#E11D48]' : 'border-[#F0C9DA]'
                    }`}
                  />
                  {errors.postalCode && <p className="text-[11px] text-[#E11D48] mt-1">{errors.postalCode}</p>}
                </div>
              </div>

              {/* Order Notes / Gift Message */}
              <div>
                <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                  Order Notes &amp; Handwritten Gift Message (Optional)
                </label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Notes about your order, e.g. 'Leave with guard at lobby' or custom message for gift card..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834]"
                />
              </div>

              {/* Gift Wrapping Add-On (+₱30) */}
              <div className="pt-2">
                <label className="flex items-start gap-3.5 p-4 bg-[#FFF8FA] rounded-2xl border border-[#FCE7F0] hover:border-[#F472B6] cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={hasGiftWrapping}
                    onChange={(e) => setHasGiftWrapping(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#BE185D] focus:ring-[#BE185D] accent-[#BE185D]"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[#BE185D]" />
                      <span className="text-xs font-bold text-[#4A2834]">
                        Add Signature Gift Wrapping (+₱30)
                      </span>
                      <span className="text-[10px] bg-[#FCE7F0] text-[#9D174D] font-bold px-2 py-0.5 rounded-full">
                        +₱30.00
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7B5967] leading-relaxed">
                      Hand-packed inside a rigid blush keepsake box tied with wide French double-faced satin ribbon, scented dried rosebuds, shredded ivory parchment, and an authentic wax-sealed calligraphy message card.
                    </p>
                  </div>
                </label>
              </div>

            </div>
          </div>

          {/* 3. Delivery Method Selection */}
          <div className="bg-white rounded-3xl border border-[#FCE7F0] p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#FCE7F0]/80 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#FCE7F0] text-[#BE185D] text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="text-sm font-bold text-[#4A2834] uppercase tracking-wider">
                Select Delivery Courier Option
              </h2>
            </div>

            <div className="space-y-3">
              {Object.entries(SHIPPING_RATES).map(([key, opt]) => {
                const isSelected = selectedDeliveryOption === key;
                const isFree = cartSubtotal >= opt.threshold || appliedDiscount?.freeShipping;

                return (
                  <label
                    key={key}
                    onClick={() => setSelectedDeliveryOption(key as DeliveryOption)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#BE185D] bg-[#FFF0F5] shadow-xs'
                        : 'border-[#FCE7F0] bg-white hover:bg-[#FFF8FA]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery_option"
                        checked={isSelected}
                        onChange={() => setSelectedDeliveryOption(key as DeliveryOption)}
                        className="text-[#BE185D] focus:ring-[#BE185D]"
                      />
                      <div>
                        <span className="text-xs font-semibold text-[#4A2834] block">
                          {opt.label}
                        </span>
                        <span className="text-[11px] text-[#7D5A68]">
                          Free on orders ₱{opt.threshold.toLocaleString('en-PH')}+
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#831843] tabular-nums">
                      {isFree ? (
                        <span className="text-[#15803D]">FREE</span>
                      ) : (
                        `₱${opt.fee.toLocaleString('en-PH')}`
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 4. Mode of Payment Selection */}
          <div className="bg-white rounded-3xl border border-[#FCE7F0] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#FCE7F0]/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FCE7F0] text-[#BE185D] text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h2 className="text-sm font-bold text-[#4A2834] uppercase tracking-wider">
                  Select Mode of Payment
                </h2>
              </div>
              <span className="text-[11px] text-[#15803D] font-medium bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                Simulated Safe
              </span>
            </div>

            {/* School Project Safe Simulation Banner */}
            <div className="p-3 bg-[#FFF0F5] rounded-xl border border-[#F9D5E5] flex items-start gap-2.5 text-xs text-[#831843]">
              <Info className="w-4 h-4 text-[#BE185D] shrink-0 mt-0.5" />
              <p>
                <strong>Academic / School Project Notice:</strong> Transactions are completely simulated for demo purposes. No real monetary charges will occur and no sensitive bank or card passwords are required.
              </p>
            </div>

            <div className="space-y-3">
              
              {/* Option A: GCash */}
              <div
                onClick={() => setPaymentMethod('gcash')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'gcash'
                    ? 'border-[#007DFE] bg-[#F0F7FF] shadow-xs'
                    : 'border-[#FCE7F0] bg-white hover:bg-[#FFF8FA]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'gcash'}
                      onChange={() => setPaymentMethod('gcash')}
                      className="text-[#007DFE] focus:ring-[#007DFE]"
                    />
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#007DFE]" />
                      <span className="text-xs font-bold text-[#007DFE]">GCash</span>
                      <span className="text-[10px] text-gray-500">Instant QR / Mobile Wallet</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#007DFE]">Most Popular</span>
                </div>

                {paymentMethod === 'gcash' && (
                  <div className="mt-3 pt-3 border-t border-[#D0E6FF] text-xs text-[#2A4365] space-y-2">
                    <p>Enter your 11-digit GCash Registered Number for simulated payment verification:</p>
                    <input
                      type="tel"
                      value={gcashNumber}
                      onChange={(e) => setGcashNumber(e.target.value)}
                      placeholder="0917 123 4567"
                      className="w-full sm:w-64 px-3 py-1.5 bg-white border border-[#90CDF4] rounded-lg text-xs font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Option B: Maya */}
              <div
                onClick={() => setPaymentMethod('maya')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'maya'
                    ? 'border-[#00D09C] bg-[#F0FDF9] shadow-xs'
                    : 'border-[#FCE7F0] bg-white hover:bg-[#FFF8FA]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'maya'}
                      onChange={() => setPaymentMethod('maya')}
                      className="text-[#00D09C] focus:ring-[#00D09C]"
                    />
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#00D09C]" />
                      <span className="text-xs font-bold text-[#00A87D]">Maya (PayMaya)</span>
                      <span className="text-[10px] text-gray-500">Digital Wallet &amp; Cards</span>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'maya' && (
                  <div className="mt-3 pt-3 border-t border-[#A7F3D0] text-xs text-[#065F46] space-y-2">
                    <p>Enter your Maya Registered Number:</p>
                    <input
                      type="tel"
                      value={mayaNumber}
                      onChange={(e) => setMayaNumber(e.target.value)}
                      placeholder="0917 123 4567"
                      className="w-full sm:w-64 px-3 py-1.5 bg-white border border-[#6EE7B7] rounded-lg text-xs font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Option C: Cash on Delivery (COD) */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#BE185D] bg-[#FFF0F5] shadow-xs'
                    : 'border-[#FCE7F0] bg-white hover:bg-[#FFF8FA]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-[#BE185D] focus:ring-[#BE185D]"
                    />
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-[#BE185D]" />
                      <span className="text-xs font-bold text-[#831843]">Cash on Delivery (COD)</span>
                      <span className="text-[10px] text-gray-500">Pay when courier arrives</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#15803D] font-medium">Nationwide</span>
                </div>

                {paymentMethod === 'cod' && (
                  <div className="mt-3 pt-3 border-t border-[#F9D5E5] text-xs text-[#6B4B58]">
                    <p>Please prepare exact cash of <strong>₱{orderTotal.toLocaleString('en-PH')}</strong> for the J&amp;T or LBC courier upon parcel arrival.</p>
                  </div>
                )}
              </div>

              {/* Option D: Bank Transfer */}
              <div
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#6B21A8] bg-[#FAF5FF] shadow-xs'
                    : 'border-[#FCE7F0] bg-white hover:bg-[#FFF8FA]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="text-[#6B21A8] focus:ring-[#6B21A8]"
                    />
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#6B21A8]" />
                      <span className="text-xs font-bold text-[#6B21A8]">BDO / BPI Bank Transfer</span>
                      <span className="text-[10px] text-gray-500">InstaPay or PESONet</span>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'bank_transfer' && (
                  <div className="mt-3 pt-3 border-t border-[#E9D5FF] text-xs text-[#581C87] space-y-1">
                    <p>Account details will be generated on your order receipt with instant confirmation.</p>
                  </div>
                )}
              </div>

              {/* Option E: Test Credit / Debit Card */}
              <div
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'credit_card'
                    ? 'border-[#BE185D] bg-[#FFF0F5] shadow-xs'
                    : 'border-[#FCE7F0] bg-white hover:bg-[#FFF8FA]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'credit_card'}
                      onChange={() => setPaymentMethod('credit_card')}
                      className="text-[#BE185D] focus:ring-[#BE185D]"
                    />
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#BE185D]" />
                      <span className="text-xs font-bold text-[#831843]">Credit / Debit Card (Visa/Mastercard)</span>
                      <span className="text-[10px] text-gray-500">Simulated test card</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Sticky Order Summary & Submit */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl border border-[#FCE7F0] p-6 space-y-5 shadow-sm sticky top-28">
            
            <h2 className="text-base font-serif font-bold text-[#4A2834] flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-[#BE185D] font-normal">{cart.length} items</span>
            </h2>

            {/* Itemized Mini List */}
            <div className="max-h-60 overflow-y-auto divide-y divide-[#FCE7F0] pr-1 space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FFF5F8] border border-[#FCE7F0] shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#4A2834] truncate">{item.product.name}</h4>
                    <span className="text-[10px] text-[#8A6A78]">
                      Qty: {item.quantity} {item.selectedVariant ? `· ${item.selectedVariant}` : ''}
                    </span>
                  </div>
                  <span className="text-xs font-serif font-bold text-[#831843] tabular-nums">
                    ₱{(item.product.price * item.quantity).toLocaleString('en-PH')}
                  </span>
                </div>
              ))}
            </div>

            {/* Loyalty Points Redemption Box */}
            <div className="p-3.5 bg-[#FFF0F5] rounded-2xl border border-[#F9D5E5] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-semibold text-[#831843]">
                  <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>Coquette Loyalty Points</span>
                </div>
                <span className="font-bold text-[#BE185D] tabular-nums">{loyaltyPoints} pts available</span>
              </div>
              <p className="text-[11px] text-[#7D5A68]">
                Earn 1 point per ₱10 spent. 1 point = ₱1 off your order!
              </p>
              {redeemedPoints > 0 ? (
                <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-[#F472B6]">
                  <span className="text-[#15803D] font-semibold text-[11px]">
                    ✓ {redeemedPoints} Points Redeemed (-₱{redeemedPoints})
                  </span>
                  <button
                    type="button"
                    onClick={resetRedeemedPoints}
                    className="text-[11px] text-[#E11D48] hover:underline font-medium"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                loyaltyPoints >= 50 && (
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => redeemPoints(50)}
                      className="flex-1 py-1.5 bg-white hover:bg-[#FFF8FA] border border-[#F472B6] text-[#831843] rounded-xl text-[11px] font-semibold transition-colors"
                    >
                      Use 50 pts (-₱50)
                    </button>
                    {loyaltyPoints >= 100 && (
                      <button
                        type="button"
                        onClick={() => redeemPoints(100)}
                        className="flex-1 py-1.5 bg-white hover:bg-[#FFF8FA] border border-[#F472B6] text-[#831843] rounded-xl text-[11px] font-semibold transition-colors"
                      >
                        Use 100 pts (-₱100)
                      </button>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#6B4B58] pt-2 border-t border-[#FCE7F0]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums text-[#4A2834]">₱{cartSubtotal.toLocaleString('en-PH')}</span>
              </div>

              {calculatedDiscount > 0 && (
                <div className="flex justify-between text-[#BE185D]">
                  <span>Voucher ({appliedDiscount?.code})</span>
                  <span className="font-semibold tabular-nums">-₱{calculatedDiscount.toLocaleString('en-PH')}</span>
                </div>
              )}

              {pointsDiscount > 0 && (
                <div className="flex justify-between text-[#15803D]">
                  <span>Loyalty Points Discount</span>
                  <span className="font-semibold tabular-nums">-₱{pointsDiscount.toLocaleString('en-PH')}</span>
                </div>
              )}

              {hasGiftWrapping && (
                <div className="flex justify-between text-[#831843]">
                  <span>Signature Gift Wrapping</span>
                  <span className="font-semibold tabular-nums">+₱{giftWrappingFee.toLocaleString('en-PH')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Courier Shipping</span>
                <span className="font-semibold tabular-nums text-[#4A2834]">
                  {shippingFee === 0 ? <span className="text-[#15803D]">FREE</span> : `₱${shippingFee.toLocaleString('en-PH')}`}
                </span>
              </div>

              <div className="pt-3 border-t border-[#FCE7F0] flex justify-between text-base font-bold text-[#831843]">
                <div>
                  <span>Total Amount</span>
                  <span className="text-[10px] text-[#15803D] block font-normal">
                    + Earn {pointsEarnedThisOrder} loyalty pts on this order
                  </span>
                </div>
                <span className="font-serif text-2xl tabular-nums">₱{orderTotal.toLocaleString('en-PH')}</span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#BE185D] hover:bg-[#9D174D] active:scale-[0.99] text-white text-sm font-semibold rounded-2xl shadow-lg shadow-[#BE185D]/25 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Tying Satin Ribbon &amp; Processing...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Place Simulated Order · ₱{orderTotal.toLocaleString('en-PH')}</span>
                </>
              )}
            </button>

            {/* Guarantee note */}
            <div className="pt-2 text-center text-[11px] text-[#7B5967] space-y-1">
              <p>🌸 Handcrafted with care in Manila, Philippines</p>
              <p className="text-[10px] text-gray-500">Every box is gift wrapped with a satin ribbon &amp; wax seal.</p>
            </div>

          </div>
        </div>

      </form>

    </div>
  );
};
