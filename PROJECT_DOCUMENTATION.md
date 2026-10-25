# PROJECT DOCUMENTATION & SCHOOL REPORT
## KLISHÉ — Your Everyday Dose of Pretty
**E-Commerce Website & Brand Showcase (Stationery & Accessories)**

---

### 1. Project Overview & Brand Identity
- **Brand Name:** KLISHÉ
- **Tagline:** “Your Everyday Dose of Pretty.”
- **Brand Message:** “KLISHÉ — Your Everyday Dose of Pretty. Little things, lovely finds, and thoughtful gifts made to brighten your day.”
- **Target Market:** Students, teenagers, young adults, stationery enthusiasts, and gift shoppers across the Philippines.
- **Aesthetic Direction:** Pink Coquette Aesthetic (Baby Pink `#FFF5F8`, Blush Rose `#BE185D`, Ivory Cream `#FFFDFD`, Deep Berry `#831843`, Satin Ribbon Bows `୨ৎ`, Faux Pearls, and Romantic Serif Typography).

---

### 2. Website Architecture & Pages
| Page / Module | Description & Key Functionalities |
| :--- | :--- |
| **Homepage** | Hero campaign banner, 4-pillar trust strip, visual category cards, bestseller grid, brand story, new arrivals, promotional gift banner, customer reviews, newsletter signup, and footer. |
| **Shop All** | Complete interactive catalog with real-time keyword search, category filter tabs, price sorting (low to high, high to low, rating, new), in-stock toggle, and filter reset. |
| **Product Detail (PDP)** | Image gallery with thumbnail switcher, Philippine Peso price (₱), stock counter, color/style variant selector, quantity stepper, add-to-cart, wishlist toggle, and product dimensions/materials care accordions. |
| **Wishlist System** | Save favorite items from catalog or PDP, persistent in `localStorage`, real-time item counter badge displayed next to the account icon in the header, and accessible in the User Account section with a "Move to Bag" feature. |
| **User Account & Auth** | Simulated Member Lounge with Log In, Create Account, 1-Click Demo Login, Profile view with saved Philippine address, Order History, Wishlist tab, and Coquette Club Rewards balance (points & tier). |
| **Loyalty Program** | "Coquette Club Rewards": Earn 1 Point per ₱10 spent on every order. Redeem 50 or 100 points at checkout for instant ₱50 or ₱100 discounts. |
| **Shopping Bag (Cart)** | Slide-out drawer and dedicated page, quantity stepper, line item removal, free shipping progress bar (₱499 threshold), handwritten gift card note input, and voucher codes (`PRETTY10`, `BOWLOVE`, `FREESHIP`). |
| **Checkout Form** | Multi-field validation: Customer name, email, contact number, Philippine delivery address (House/Street, Barangay, City, Province, Postal Code), courier method selector, and mode of payment. Includes "Add Signature Gift Wrapping (+₱30)" option. |
| **Modes of Payment** | Philippine payment options: GCash (QR/Mobile number), Maya, Cash on Delivery (COD), BDO/BPI Bank Transfer, and Credit/Debit Card. Clearly marked as simulated transactions for academic project safety. |
| **Order Confirmation** | Celebration view with generated Order ID (`#KL-XXXXX`), simulated tracking number (`JT-PH-XXXXX`), 4-step packaging and delivery timeline, itemized receipt breakdown (with gift wrapping fee and loyalty points earned badge), and printable receipt. |
| **Project Doc & Export** | Dedicated report page with 1-click **"Save to My Google Drive"** (Google Docs & JSON project data), **"Download .DOC Document"**, and **"Download Project Data (JSON)"** for teacher or portfolio submission without needing GitHub. |
| **About Us** | The founding story of KLISHÉ, Manila studio craftsmanship, double-faced satin ribbons, and 120gsm ink-proof paper philosophy. |
| **Contact Us** | Interactive customer care inquiry form, studio address in Quezon City, email support, phone hotline, and hours. |
| **FAQs & Policies** | Accordion-based FAQs, shipping delivery guidelines across NCR/provinces, 7-day return policy, data privacy statement (RA 10173), and terms. |

---

### 3. Product Catalog & Pricing Table (Philippine Pesos ₱70–₱350)
*All notebooks & journals are strictly priced between ₱250 and ₱350.*

| Product Name | Category | Price (₱) | Stock | Variants |
| :--- | :--- | :---: | :---: | :--- |
| Sweet Romance Heart & Ribbon Sticky Notes Pad | Stationery | ₱70.00 | 30 | Scalloped Hearts, Double Bow, Vintage Frame |
| Petite Pearl Daisy & Starlet Snap Clips (Pack of 4) | Hair Accessories | ₱75.00 | 19 | Daisy Blossoms, Celestial Stars, Mixed Bouquet |
| Rose Gold Bow Slim Gel Ink Pen Trio | Pens & Writing | ₱89.00 | 24 | Classic Black 0.5mm, Soft Dark Sepia 0.5mm, Pastel Pink & Black |
| Coquette Ruffle Organza & Silk Scrunchie Set (Trio) | Hair Accessories | ₱98.00 | 16 | Sweet Ballet, Pure Ivory, Petal Pink |
| Vintage Romance Stickers & Lace Washi Tape Set | Stickers & Crafts | ₱115.00 | 18 | Pink Ballet & Bows, Victorian Rose, Angelic Lace |
| Fleur Satin Ribbon Bow Hair Clips (Duo) | Ribbon Bows | ₱125.00 | 12 | Baby Pink Duo, Blush & Dusty Rose, Ivory Cream |
| Personalized Monogram Pearl Bow Charm Keychain | Keychains | ₱145.00 | 14 | Initial A, C, J, K, M, S, R |
| L'Amour Pearl & Ribbon French Claw Clip | Claw Clips | ₱175.00 | 8 | Opalescent Baby Pink, Pearlized Ivory, Rose Glow |
| Dreamy Moments Gold-Embossed Journal | Notebooks & Journals | ₱295.00 | 15 | Dotted Bullet, Subtle Lined, Blank Sketching |
| Personalized Lettering Ribbon Stationery Box | Gifts & Bundles | ₱320.00 | 7 | Rose Gold Ink, Antique Gold Ink, Blush Pink Ink |
| Cherish Every Day Undated Velvet Agenda & Planner | Notebooks & Journals | ₱340.00 | 9 | Dusty Rose Velvet, Baby Pink Plush, Ivory Chenille |
| The 'Pretty in Pink' Curated Luxury Gift Bundle | Gifts & Bundles | ₱350.00 | 6 | Blush Rose Satin, Baby Pink Chiffon, Ivory Silk |

---

### 4. Technical Stack & Implementation
- **Frontend Framework:** React 19 + TypeScript (SPA)
- **Styling:** Tailwind CSS with bespoke coquette palette & typography
- **Cloud & Integrations:** Google Drive API OAuth Integration (1-click export to user's Google Drive)
- **Iconography:** Lucide Icons
- **Typography:** Playfair Display, Cormorant Garamond, Plus Jakarta Sans
- **State Management:** React Context API (`ShopContext`) with browser `localStorage` persistence
- **Build System:** Vite 8

---

### 5. Academic Safety & Simulated Transactions Note
This application was engineered as an e-commerce website prototype for academic demonstration. All payment gateways (GCash, Maya, Bank Transfer, Cards) operate safely in **simulation mode** with zero real financial exchange or collection of confidential banking credentials. Gift wrapping (+₱30) and loyalty points redemption calculate dynamically in the cart and checkout pipeline.
