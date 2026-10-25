import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [subject, setSubject] = useState('Order Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showToast('🎀 Message sent! Our Manila studio team will get back to you within 24 hours.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold text-[#BE185D] uppercase tracking-widest block">
          Customer Care &amp; Studio
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A2834]">
          Get in Touch with KLISHÉ
        </h1>
        <p className="text-xs sm:text-sm text-[#7D5A68] max-w-md mx-auto">
          Have questions about your order, custom ribbon packaging, or wholesale inquiries? We’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Studio Info Sidebar */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-[#FCE7F0] p-6 space-y-5 text-xs text-[#6B4B58]">
            <h3 className="font-serif font-bold text-sm text-[#4A2834]">
              Manila Packaging Suite
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#BE185D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#4A2834] block">Studio Address:</strong>
                  <span>24 Katipunan Avenue, Loyola Heights, Quezon City, Metro Manila 1108</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#BE185D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#4A2834] block">Email Support:</strong>
                  <span>hello@klishe.ph / care@klishe.ph</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#BE185D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#4A2834] block">Hotline &amp; Viber:</strong>
                  <span>+63 917 892 4410</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#BE185D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#4A2834] block">Studio Hours:</strong>
                  <span>Monday to Saturday: 9:00 AM – 6:00 PM PHT</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#FCE7F0] space-y-1">
              <p className="font-semibold text-[#831843]">Follow our daily aesthetic:</p>
              <p className="text-[#BE185D]">Instagram &amp; TikTok: @klishe.ph</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-[#FCE7F0] p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#4A2834]">
                Thank you for reaching out!
              </h3>
              <p className="text-xs text-[#7D5A68] max-w-sm mx-auto">
                We've received your note and will get back to you shortly via <strong>{email}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#BE185D] hover:underline font-semibold"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amelia"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. amelia@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                    Subject Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834]"
                  >
                    <option value="Order Inquiry">Order Inquiry &amp; Tracking</option>
                    <option value="Custom Gift Ribbon">Custom Gift Ribbon &amp; Calligraphy</option>
                    <option value="Restock Question">Restock &amp; New Arrivals</option>
                    <option value="Bulk/Wholesale">School Organization / Bulk Order</option>
                    <option value="Other">Other Thoughts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                    Order ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. #KL-49201"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FFF8FA] border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A3B49] mb-1">
                  How can we help you? *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details with us..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 text-xs bg-[#FFF8FA] border border-[#F0C9DA] rounded-xl focus:outline-none focus:border-[#BE185D] text-[#4A2834]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message to Manila Studio</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
