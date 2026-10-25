import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { FAQS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const FaqPage: React.FC = () => {
  const { setActivePage } = useShop();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold text-[#BE185D] uppercase tracking-widest block">
          Help &amp; Information
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A2834]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#7D5A68]">
          Find quick answers about Philippine delivery, modes of payment, custom ribbon tags, and returns.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#FCE7F0] overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#4A2834] hover:text-[#BE185D] transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-[#BE185D] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#6B4B58] leading-relaxed border-t border-[#FCE7F0]/60">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-[#FFF0F5] rounded-3xl border border-[#FCE7F0] p-6 text-center space-y-3">
        <h3 className="text-base font-serif font-bold text-[#831843]">
          Still have a question?
        </h3>
        <p className="text-xs text-[#7B5967]">
          Our customer care team is always happy to assist with gift notes, restocks, or order tracking.
        </p>
        <button
          onClick={() => {
            setActivePage('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5"
        >
          <span>Send Us a Message</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
