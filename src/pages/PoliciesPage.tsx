import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms'>('shipping');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold text-[#BE185D] uppercase tracking-widest block">
          Transparency &amp; Trust
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A2834]">
          Store Policies
        </h1>
        <p className="text-xs sm:text-sm text-[#7D5A68]">
          Review our delivery timelines, return guidelines, and privacy protections.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#FCE7F0] bg-white rounded-2xl p-1.5 border gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('shipping')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'shipping'
              ? 'bg-[#BE185D] text-white shadow-xs'
              : 'text-[#6D4C58] hover:bg-[#FFF0F5]'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Shipping &amp; Delivery</span>
        </button>

        <button
          onClick={() => setActiveTab('returns')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'returns'
              ? 'bg-[#BE185D] text-white shadow-xs'
              : 'text-[#6D4C58] hover:bg-[#FFF0F5]'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Returns &amp; Exchanges</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'privacy'
              ? 'bg-[#BE185D] text-white shadow-xs'
              : 'text-[#6D4C58] hover:bg-[#FFF0F5]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'terms'
              ? 'bg-[#BE185D] text-white shadow-xs'
              : 'text-[#6D4C58] hover:bg-[#FFF0F5]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Terms of Service</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl border border-[#FCE7F0] p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-[#5C3D4B] leading-relaxed shadow-xs">
        
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h2 className="text-lg font-serif font-bold text-[#4A2834]">
              Philippine Shipping &amp; Delivery Guidelines
            </h2>
            <p>
              All orders are hand-packed at our Manila studio with protective bubble wrap, crinkled paper, and our signature satin ribbon bows. Orders are dispatched Monday through Saturday.
            </p>
            <div className="p-4 bg-[#FFF8FA] rounded-2xl border border-[#FCE7F0] space-y-2">
              <h4 className="font-bold text-[#831843]">Estimated Courier Timelines:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Metro Manila (NCR):</strong> 1 to 3 business days via J&amp;T Express / LBC (₱80 or FREE over ₱999).</li>
                <li><strong>Provincial Luzon, Visayas &amp; Mindanao:</strong> 3 to 6 business days (₱150 or FREE over ₱1,299).</li>
                <li><strong>NCR Same-Day Priority:</strong> Dispatched via GrabExpress / Lalamove for urgent gift celebrations (₱200).</li>
              </ul>
            </div>
            <p>
              Once your parcel is handed to the courier, an SMS notification and tracking number (e.g. <code>JT-PH-XXXXXXX</code>) will be sent to your registered mobile number and email.
            </p>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-4">
            <h2 className="text-lg font-serif font-bold text-[#4A2834]">
              7-Day Delight Guarantee &amp; Exchanges
            </h2>
            <p>
              We want you to adore every single piece. If your items arrive damaged during transit, or if an incorrect item or color was dispatched, we offer free replacements or full store credit within 7 calendar days of delivery.
            </p>
            <div className="p-4 bg-[#FFF8FA] rounded-2xl border border-[#FCE7F0] space-y-2">
              <h4 className="font-bold text-[#831843]">Return Conditions:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Hair accessories and clips must be unwashed, unworn, and attached to their original backing card.</li>
                <li>Journals, notebooks, and stickers must be unused with zero torn pages or markings.</li>
                <li>Personalized calligraphy items cannot be exchanged unless our studio made a spelling error.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-lg font-serif font-bold text-[#4A2834]">
              Privacy &amp; Data Protection Policy
            </h2>
            <p>
              At KLISHÉ, we respect your privacy as much as your personal aesthetic. We strictly follow the Philippine Data Privacy Act of 2012 (RA 10173).
            </p>
            <p>
              Your personal information (name, delivery address, contact number) is used solely for order fulfillment, courier delivery, and customer care communications. We never sell, lease, or share your private information with third-party advertisers.
            </p>
            <div className="p-3 bg-[#FFF0F5] rounded-xl border border-[#F9D5E5] text-xs text-[#831843]">
              <strong>School Project Notice:</strong> Payment details are simulated for demonstration purposes. No real bank logins or card CVC credentials are ever collected or stored.
            </div>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-lg font-serif font-bold text-[#4A2834]">
              Terms &amp; Conditions of Service
            </h2>
            <p>
              By browsing and placing simulated orders on KLISHÉ, you agree to our reasonable store terms. All product photography, illustrations, ribbon designs, and brand copy are created for KLISHÉ.
            </p>
            <p>
              All prices are quoted in Philippine Pesos (₱) inclusive of standard packaging. Promotional voucher codes (such as PRETTY10 or BOWLOVE) are valid for single transactions and cannot be stacked beyond their stated conditions.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
