import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  ExternalLink,
  CloudUpload,
  Loader2,
  Copy,
  Check,
  Share2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { signInWithGoogleForDrive, uploadProjectToGoogleDrive, DriveUploadResult } from '../services/googleDrive';

export const ProjectDocPage: React.FC = () => {
  const { setActivePage, showToast } = useShop();

  // Google Drive state
  const [isUploadingToDrive, setIsUploadingToDrive] = useState(false);
  const [driveUploadResult, setDriveUploadResult] = useState<DriveUploadResult | null>(null);
  const [driveError, setDriveError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const shopLiveUrl = 'https://ais-pre-zdkva43ctk4omzvbtx7r6w-90008916979.asia-northeast1.run.app';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shopLiveUrl);
    }
    setCopiedLink(true);
    showToast('🎀 Shop website link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToGoogleDrive = async () => {
    setIsUploadingToDrive(true);
    setDriveError(null);
    try {
      showToast('Connecting to your Google Drive... 🌸');
      const { accessToken } = await signInWithGoogleForDrive();
      showToast('Uploading project document to your Drive...');
      const result = await uploadProjectToGoogleDrive(accessToken);
      setDriveUploadResult(result);
      showToast('🎀 Successfully saved to your Google Drive!');
    } catch (err: any) {
      console.error(err);
      setDriveError(err?.message || 'Failed to save to Google Drive. Please try again.');
    } finally {
      setIsUploadingToDrive(false);
    }
  };

  const handleDownloadDoc = () => {
    const docContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>KLISHÉ - School Project Documentation</title>
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; padding: 40px; }
  h1 { color: #831843; font-size: 28px; border-bottom: 2px solid #BE185D; padding-bottom: 8px; }
  h2 { color: #9D174D; font-size: 20px; margin-top: 24px; border-bottom: 1px solid #FCE7F0; padding-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; margin-top: 15px; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 13px; }
  th { background-color: #FFF0F5; color: #831843; }
  .tagline { color: #BE185D; font-style: italic; font-size: 16px; }
</style>
</head>
<body>
  <h1>KLISHÉ — “Your Everyday Dose of Pretty”</h1>
  <p class="tagline">Online Shop Website for Coquette Stationery, Satin Ribbon Bows & Curated Gift Bundles</p>
  <p><strong>Brand Message:</strong> “KLISHÉ — Your Everyday Dose of Pretty. Little things, lovely finds, and thoughtful gifts made to brighten your day.”</p>
  <p><strong>Target Market:</strong> Students, teenagers, young adults, stationery lovers, and gift shoppers.</p>
  <p><strong>Aesthetic Identity:</strong> Baby pink, blush pink, ivory, white, and rose pink, with satin bows (୨ৎ), pearls, delicate hearts, and elegant serif typography.</p>
  
  <h2>1. Pages & Implemented Features</h2>
  <ul>
    <li><strong>Homepage:</strong> Announcement bar, logo, navigation menu, search bar, account icon, shopping cart, hero banner, Shop Now button, product categories, bestsellers, new arrivals, promotions, About Us section, customer reviews, newsletter, and footer.</li>
    <li><strong>Shop All & Categories:</strong> Hair Accessories, Ribbon Bows, French Claw Clips, Stationery, Notebooks & Journals, Pens & Writing, Stickers, Keychains, and Gift Bundles.</li>
    <li><strong>Shopping Features:</strong> Real-time search, category filters, price sorting, product variations, quantity selectors, Add to Cart, item removal, automatic subtotal calculations, discount codes (PRETTY10, BOWLOVE, FREESHIP), and shipping fees.</li>
    <li><strong>Wishlist System:</strong> Persistent wishlist with live counter badge next to the account icon in the header, accessible from the user's account section.</li>
    <li><strong>Checkout & Simulated Payments:</strong> Validation for customer name, email, contact number, delivery address (Barangay, City, Province, Postal Code), order notes, delivery options, and Philippine modes of payment (GCash, Maya, COD, BDO/BPI Bank Transfer, and Card).</li>
    <li><strong>Order Confirmation:</strong> Order #KL-XXXXX, packaging timeline, itemized receipt breakdown, and printable confirmation.</li>
  </ul>

  <h2>2. Product Catalog & Prices in Philippine Pesos (₱)</h2>
  <table>
    <thead>
      <tr><th>Item Name</th><th>Category</th><th>Price (₱)</th><th>Stock</th></tr>
    </thead>
    <tbody>
      ${PRODUCTS.map(p => `<tr><td>${p.name}</td><td>${p.category}</td><td>₱${p.price.toFixed(2)}</td><td>${p.stock} units</td></tr>`).join('')}
    </tbody>
  </table>

  <h2>3. Technical Specifications</h2>
  <p>Built with React 19, TypeScript, Tailwind CSS, and Vite. Stored persistently across browser sessions via localStorage.</p>
</body>
</html>`;

    const blob = new Blob([docContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'KLISHE_School_Project_Report.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-[#FCE7F0] shadow-sm print:hidden">
        <button
          onClick={() => setActivePage('home')}
          className="text-xs font-semibold text-[#BE185D] hover:text-[#9D174D] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Online Shop</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Direct Google Drive Button */}
          <button
            onClick={handleSaveToGoogleDrive}
            disabled={isUploadingToDrive}
            className="px-4 py-2.5 bg-gradient-to-r from-[#4285F4] to-[#34A853] hover:opacity-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-95"
            title="Save directly to your Google Drive account"
          >
            {isUploadingToDrive ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Google Drive...</span>
              </>
            ) : (
              <>
                <CloudUpload className="w-4 h-4" />
                <span>Save to My Google Drive</span>
              </>
            )}
          </button>

          {/* Download as .DOC Word Document */}
          <button
            onClick={handleDownloadDoc}
            className="px-4 py-2.5 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
            title="Download Word Document to your device"
          >
            <Download className="w-4 h-4" />
            <span>Download .DOC</span>
          </button>

          {/* Save as PDF */}
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-white hover:bg-[#FFF0F5] border border-[#F0C9DA] text-[#831843] text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-[#BE185D]" />
            <span>Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Live Store Link for Submission / Sharing */}
      <div className="p-5 bg-gradient-to-r from-[#FFF5F8] to-[#FFF0F5] border border-[#F9D5E5] rounded-3xl space-y-3 shadow-xs print:hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#831843] uppercase tracking-wider flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-[#BE185D]" />
                <span>Live Shop Link (For Teacher / Submission / Sharing)</span>
              </span>
              <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] text-[10px] font-semibold rounded-full">
                Active Online
              </span>
            </div>
            <p className="text-xs text-[#7D5A68]">
              Share this live preview link with your instructor, classmates, or friends:
            </p>
            <div className="pt-1">
              <code className="text-xs font-mono text-[#831843] bg-white px-3 py-1.5 rounded-xl border border-[#F0C9DA] inline-block break-all select-all">
                {shopLiveUrl}
              </code>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-[#BE185D] hover:bg-[#9D174D] active:scale-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Link Copied! ୨ৎ</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <a
              href={shopLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 bg-white hover:bg-[#FFF0F5] border border-[#F0C9DA] text-[#831843] text-xs font-semibold rounded-xl transition-colors flex items-center gap-1"
              title="Open shop in new tab"
            >
              <span>Open</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#BE185D]" />
            </a>
          </div>
        </div>
      </div>

      {/* Google Drive Upload Success Notification */}
      {driveUploadResult && (
        <div className="p-5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-[#15803D]">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <h3 className="text-sm font-bold">Successfully Saved to Your Google Drive!</h3>
          </div>
          <p className="text-xs text-[#166534]">
            Your document has been uploaded as an editable Google Doc in your Google Drive. You can open and view it right now:
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {driveUploadResult.docFile.webViewLink && (
              <a
                href={driveUploadResult.docFile.webViewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Open Document in Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <span className="text-xs text-[#166534]">
              File: <strong>{driveUploadResult.docFile.name}</strong>
            </span>
          </div>
        </div>
      )}

      {driveError && (
        <div className="p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-2xl text-xs text-[#B91C1C]">
          <p>{driveError}</p>
        </div>
      )}

      {/* Printable Document Paper Sheet */}
      <div className="bg-white rounded-3xl border border-[#FCE7F0] p-8 sm:p-12 shadow-sm space-y-8 print:border-none print:shadow-none print:p-0">
        
        {/* Document Header */}
        <div className="border-b-2 border-[#BE185D] pb-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#BE185D]">
              School Project Documentation &amp; Technical Report
            </span>
            <span className="text-xs text-gray-400 font-mono">Academic Year 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A2834]">
            KLISHÉ — “Your Everyday Dose of Pretty”
          </h1>
          <p className="text-xs sm:text-sm text-[#7D5A68]">
            E-Commerce Storefront for Coquette Stationery, Satin Ribbon Bows &amp; Curated Gift Bundles
          </p>
        </div>

        {/* 1. Executive Summary */}
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-[#831843] border-b border-[#FCE7F0] pb-1">
            1. Executive Summary &amp; Brand Concept
          </h2>
          <p className="text-xs text-[#5A3B49] leading-relaxed">
            <strong>Brand Name:</strong> KLISHÉ<br />
            <strong>Tagline:</strong> “Your Everyday Dose of Pretty.”<br />
            <strong>Brand Message:</strong> “KLISHÉ — Your Everyday Dose of Pretty. Little things, lovely finds, and thoughtful gifts made to brighten your day.”<br />
            <strong>Target Market:</strong> High school &amp; university students, teenagers, young adults, stationery collectors, and gift givers.<br />
            <strong>Design Aesthetic:</strong> Pink Coquette aesthetic featuring pastel baby pink, blush rose, ivory cream, and deep berry paired with satin ribbon bows (୨ৎ), delicate faux pearls, floral corner flourishes, and classic serif typography.
          </p>
        </section>

        {/* 2. System Features & Modules */}
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-[#831843] border-b border-[#FCE7F0] pb-1">
            2. System Architecture &amp; Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5A3B49]">
            <div className="p-3 bg-[#FFF8FA] rounded-xl border border-[#FCE7F0]">
              <strong className="block text-[#831843] mb-1">✓ Product Catalog &amp; Search</strong>
              <span>Interactive search by keyword, category filtering, in-stock toggle, and price sorting in Philippine Pesos (₱).</span>
            </div>
            <div className="p-3 bg-[#FFF8FA] rounded-xl border border-[#FCE7F0]">
              <strong className="block text-[#831843] mb-1">✓ Wishlist System</strong>
              <span>Users can favorite products from cards and detail modal. Saved items sync to browser storage and display a count badge next to the account icon.</span>
            </div>
            <div className="p-3 bg-[#FFF8FA] rounded-xl border border-[#FCE7F0]">
              <strong className="block text-[#831843] mb-1">✓ User Authentication &amp; Profile</strong>
              <span>Member Lounge modal with Log In, Register, 1-Click Demo Login, Order Tracking status, and saved address.</span>
            </div>
            <div className="p-3 bg-[#FFF8FA] rounded-xl border border-[#FCE7F0]">
              <strong className="block text-[#831843] mb-1">✓ Shopping Bag &amp; Vouchers</strong>
              <span>Subtotal calculations, free shipping progress bar (₱999 threshold), gift card handwritten note input, and voucher application (PRETTY10, BOWLOVE).</span>
            </div>
            <div className="p-3 bg-[#FFF8FA] rounded-xl border border-[#FCE7F0]">
              <strong className="block text-[#831843] mb-1">✓ Philippine Modes of Payment</strong>
              <span>Safe simulated checkout supporting GCash, Maya, Cash on Delivery (COD), BDO/BPI Bank Transfer, and Credit Cards.</span>
            </div>
            <div className="p-3 bg-[#FFF8FA] rounded-xl border border-[#FCE7F0]">
              <strong className="block text-[#831843] mb-1">✓ Order Confirmation &amp; Receipt</strong>
              <span>Instant order ID (#KL-XXXXX), tracking code (JT-PH-XXXXX), packaging timeline, and printable receipt.</span>
            </div>
          </div>
        </section>

        {/* 3. Product Catalog Table */}
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-[#831843] border-b border-[#FCE7F0] pb-1">
            3. Product Catalog &amp; Pricing Inventory
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FFF0F5] text-[#831843] font-semibold border-b border-[#F0C9DA]">
                  <th className="p-2.5">Item Name</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5 text-right">Price (₱)</th>
                  <th className="p-2.5 text-center">Stock</th>
                  <th className="p-2.5">Sample Variant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FCE7F0] text-[#5A3B49]">
                {PRODUCTS.map((p) => (
                  <tr key={p.id}>
                    <td className="p-2.5 font-medium">{p.name}</td>
                    <td className="p-2.5">{p.category}</td>
                    <td className="p-2.5 text-right font-serif font-bold text-[#831843]">₱{p.price.toFixed(2)}</td>
                    <td className="p-2.5 text-center">{p.stock} units</td>
                    <td className="p-2.5 text-[#7B5967]">{p.variants?.[0]?.options?.[0] || 'Standard'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Technical Stack */}
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-[#831843] border-b border-[#FCE7F0] pb-1">
            4. Technology &amp; Implementation Details
          </h2>
          <ul className="text-xs text-[#5A3B49] space-y-1.5 list-disc pl-5">
            <li><strong>Frontend Framework:</strong> React 19 + TypeScript with Vite build tooling.</li>
            <li><strong>Styling System:</strong> Tailwind CSS v4 with custom serif &amp; sans font typography.</li>
            <li><strong>Cloud Integration:</strong> Google Drive API (v3) OAuth for direct document export to user's Drive.</li>
            <li><strong>State &amp; Persistence:</strong> React Context API integrated with browser <code>localStorage</code> for cart, wishlist, and orders.</li>
            <li><strong>Simulated Security:</strong> Educational demo environment ensuring zero sensitive data exposure.</li>
          </ul>
        </section>

        {/* Footer of Document */}
        <div className="pt-6 border-t border-[#FCE7F0] flex items-center justify-between text-[11px] text-[#8A6A78]">
          <span>KLISHÉ Online Shop Project — Prepared for Academic Submission</span>
          <span>Live at: ais-pre-zdkva43ctk4omzvbtx7r6w-90008916979.asia-northeast1.run.app</span>
        </div>

      </div>

    </div>
  );
};
