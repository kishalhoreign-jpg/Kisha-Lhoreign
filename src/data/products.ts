import { Product, CustomerReview } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_coquette_boutique_1792953391556.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-satin-bow-clips',
    name: "Fleur Satin Ribbon Bow Hair Clips (Duo)",
    category: 'Ribbon Bows',
    parentCategory: 'Hair Accessories',
    price: 125,
    originalPrice: 150,
    rating: 4.9,
    reviewCount: 42,
    description: "Handcrafted from double-faced French satin ribbon with delicate freshwater faux pearl charms. Features non-slip alligator clips that comfortably hold thin to thick hair without tugging.",
    stock: 12,
    images: [
      '/src/assets/images/product_satin_bow_clips_1792953392030.jpg',
      '/src/assets/images/hero_coquette_boutique_1792953391556.jpg'
    ],
    variants: [
      {
        name: 'Color',
        options: ['Baby Pink Duo', 'Blush & Dusty Rose', 'Ivory Cream Duo']
      }
    ],
    tags: ['Bestseller', 'Handmade', 'Hair Clip'],
    isBestseller: true,
    isNewArrival: false,
    dimensions: "12cm x 9cm each bow",
    materials: "Premium Korean Satin, Gold-plated Alloy Clip, Faux Pearl Charm",
    careInstructions: "Gently spot clean with a damp cloth. Store flat or pinned on a ribbon board."
  },
  {
    id: 'prod-pearl-claw-clip',
    name: "L'Amour Pearl & Ribbon French Claw Clip",
    category: 'Claw Clips',
    parentCategory: 'Hair Accessories',
    price: 175,
    originalPrice: 210,
    rating: 4.8,
    reviewCount: 38,
    description: "An iridescent opalescent pink claw clip hand-inlaid with miniature ivory pearls and a sculpted ribbon bow centerpiece. Designed with heavy-duty interlocking teeth for an all-day comfortable French twist hold.",
    stock: 8,
    images: [
      '/src/assets/images/product_pearl_claw_clip_1792953393080.jpg',
      '/src/assets/images/hero_coquette_boutique_1792953391556.jpg'
    ],
    variants: [
      {
        name: 'Finish',
        options: ['Opalescent Baby Pink', 'Pearlized Ivory', 'Rose Quartz Glow']
      }
    ],
    tags: ['Bestseller', 'French Twist', 'Pearls'],
    isBestseller: true,
    isNewArrival: false,
    dimensions: "10.5cm length, 5cm height",
    materials: "Eco-friendly Cellulose Acetate, Alloy Spring, Acrylic Pearls",
    careInstructions: "Avoid contact with direct perfume spray. Wipe dry with microfiber cloth."
  },
  {
    id: 'prod-coquette-journal',
    name: "Dreamy Moments Gold-Embossed Hardbound Journal",
    category: 'Notebooks & Journals',
    parentCategory: 'Stationery',
    price: 295,
    originalPrice: 340,
    rating: 5.0,
    reviewCount: 56,
    description: "Our signature coquette journal featuring a woven blush pink linen hardbound cover stamped with lustrous gold foil bows and filigree. Filled with 192 pages of 120gsm ink-proof bleed-resistant ivory paper, floral corner flourishes, and a silky blush ribbon bookmark.",
    stock: 15,
    images: [
      '/src/assets/images/product_coquette_journal_set_1792953391897.jpg',
      '/src/assets/images/hero_coquette_boutique_1792953391556.jpg'
    ],
    variants: [
      {
        name: 'Layout',
        options: ['Dotted Bullet Pages', 'Subtle Lined Pages', 'Blank Sketching Pages']
      }
    ],
    tags: ['Bestseller', 'Gold Foil', '120gsm Paper'],
    isBestseller: true,
    isNewArrival: false,
    dimensions: "A5 Size (14.8cm x 21cm), 192 pages",
    materials: "Linen hardcover, 120gsm fountain-pen friendly ivory paper, Satin ribbon",
    careInstructions: "Keep in a cool dry space away from excessive moisture."
  },
  {
    id: 'prod-luxury-gift-box',
    name: "The 'Pretty in Pink' Curated Luxury Gift Bundle",
    category: 'Gifts & Bundles',
    parentCategory: 'Gifts & Bundles',
    price: 350,
    originalPrice: 395,
    rating: 5.0,
    reviewCount: 64,
    description: "The ultimate unboxing experience! Packed inside an elegant blush rigid keepsake gift box tied with a generous satin ribbon bow. Includes 1 Fleur Satin Bow Hair Clip, 1 Pearl Snap Clip set, 1 Gold-foil Notepad, 1 Rose Gold Bow Pen, 2 Floral Sticker Sheets, and a personalized hand-calligraphed note card with wax seal.",
    stock: 6,
    images: [
      '/src/assets/images/product_gift_bundle_box_1792953392942.jpg',
      '/src/assets/images/hero_coquette_boutique_1792953391556.jpg'
    ],
    variants: [
      {
        name: 'Ribbon Color',
        options: ['Blush Rose Satin', 'Baby Pink Chiffon', 'Ivory Pearl Silk']
      }
    ],
    tags: ['Gift Ready', 'Bestseller', 'Bundle & Save'],
    isBestseller: true,
    isNewArrival: true,
    dimensions: "Box size: 24cm x 18cm x 8cm",
    materials: "Rigid gift board box, Satin ribbons, Stationery items, Gold foil wax seal",
    careInstructions: "Gift card is customizable at checkout via Order Notes."
  },
  {
    id: 'prod-rose-gold-bow-pens',
    name: "Rose Gold Bow Slim Gel Ink Pen Trio",
    category: 'Pens & Writing',
    parentCategory: 'Stationery',
    price: 89,
    originalPrice: 110,
    rating: 4.8,
    reviewCount: 29,
    description: "A set of 3 ultra-smooth 0.5mm black gel ink pens crowned with sculpted rose gold bow finials. Metal barrel with soft baby pink powder-coated finish for comfortable, fatigue-free study sessions and journaling.",
    stock: 24,
    images: [
      '/src/assets/images/product_coquette_journal_set_1792953391897.jpg'
    ],
    variants: [
      {
        name: 'Ink Color',
        options: ['Classic Black 0.5mm', 'Soft Dark Sepia 0.5mm', 'Pastel Pink & Black Duo']
      }
    ],
    tags: ['Stationery', 'Gel Pen', 'Study Must-Have'],
    isBestseller: false,
    isNewArrival: true,
    dimensions: "14cm length, 0.5mm fine needle tip",
    materials: "Aluminum alloy barrel, Rose gold electroplated topper",
    careInstructions: "Refillable with standard 0.5mm gel pen refills."
  },
  {
    id: 'prod-pearl-snap-clips',
    name: "Petite Pearl Daisy & Starlet Snap Clips (Pack of 4)",
    category: 'Hair Accessories',
    parentCategory: 'Hair Accessories',
    price: 75,
    originalPrice: 95,
    rating: 4.7,
    reviewCount: 21,
    description: "Four sweet miniature snap clips embellished with cluster pearls forming dainty daisies and sparkling starbursts. Perfect for pinning back bangs, accenting braids, or stacking.",
    stock: 19,
    images: [
      '/src/assets/images/hero_coquette_boutique_1792953391556.jpg',
      '/src/assets/images/product_satin_bow_clips_1792953392030.jpg'
    ],
    variants: [
      {
        name: 'Design Theme',
        options: ['Daisy Blossoms', 'Celestial Stars & Hearts', 'Mixed Bouquet']
      }
    ],
    tags: ['Hair Accessories', 'Pearls', 'Budget Friendly'],
    isBestseller: false,
    isNewArrival: false,
    dimensions: "5.5cm length each",
    materials: "Gold-toned brass clip base, Artificial pearls, Resin studs",
    careInstructions: "Keep dry and store inside the complimentary velvet pouch."
  },
  {
    id: 'prod-coquette-stickers-washi',
    name: "Vintage Romance Stickers & Lace Washi Tape Set",
    category: 'Stickers & Crafts',
    parentCategory: 'Stationery',
    price: 115,
    originalPrice: 140,
    rating: 4.9,
    reviewCount: 33,
    description: "Curated craft kit including 2 rolls of delicate floral lace washi tape and 4 matte waterproof PET sticker sheets with bows, cherubs, vintage mirrors, and rose floral bouquets. Ideal for scrapbookers and toploaders.",
    stock: 18,
    images: [
      '/src/assets/images/product_coquette_journal_set_1792953391897.jpg',
      '/src/assets/images/product_gift_bundle_box_1792953392942.jpg'
    ],
    variants: [
      {
        name: 'Theme',
        options: ['Pink Ballet & Bows', 'Victorian Rose Garden', 'Angelic Cherub Lace']
      }
    ],
    tags: ['Stickers', 'Washi Tape', 'Aesthetic'],
    isBestseller: false,
    isNewArrival: true,
    dimensions: "Washi tape: 15mm x 5m each; Sticker sheets: 10cm x 15cm",
    materials: "Washi paper, Matte waterproof PET vinyl",
    careInstructions: "Peels cleanly without sticky residue on paper and phone cases."
  },
  {
    id: 'prod-initial-bow-keychain',
    name: "Personalized Monogram Pearl Bow Charm Keychain",
    category: 'Keychains',
    parentCategory: 'Gifts & Bundles',
    price: 145,
    originalPrice: 170,
    rating: 4.9,
    reviewCount: 47,
    description: "Make it yours! A handcrafted bag charm featuring a glossy blush ribbon bow, gold letter charm of your choice (A-Z), baby heart pendant, and pearl beaded drop. Attaches easily to tote bags, keys, or pencil cases.",
    stock: 14,
    images: [
      '/src/assets/images/product_satin_bow_clips_1792953392030.jpg',
      '/src/assets/images/hero_coquette_boutique_1792953391556.jpg'
    ],
    variants: [
      {
        name: 'Initial Charm',
        options: ['Initial A', 'Initial C', 'Initial J', 'Initial K', 'Initial M', 'Initial S', 'Initial R']
      }
    ],
    tags: ['Personalized', 'Keychains', 'Custom Gift'],
    isBestseller: true,
    isNewArrival: false,
    dimensions: "11cm total hanging length",
    materials: "Gold-plated zinc alloy, Glass seed beads, Faux pearl, Satin cord",
    careInstructions: "Wipe with soft cloth. Avoid submerging in water."
  },
  {
    id: 'prod-velvet-planner',
    name: "Cherish Every Day Undated Velvet Agenda & Planner",
    category: 'Notebooks & Journals',
    parentCategory: 'Stationery',
    price: 340,
    originalPrice: 380,
    rating: 4.8,
    reviewCount: 22,
    description: "An undated 12-month aesthetic life planner wrapped in soft dusty-rose crushed velvet. Features weekly habit trackers, monthly reflection spreads, pastel grid memo pages, and two rose-gold stamped ribbon bookmarks.",
    stock: 9,
    images: [
      '/src/assets/images/product_coquette_journal_set_1792953391897.jpg'
    ],
    variants: [
      {
        name: 'Cover Color',
        options: ['Dusty Rose Velvet', 'Baby Pink Plush', 'Ivory Pearl Chenille']
      }
    ],
    tags: ['Planner', 'Velvet', 'Undated'],
    isBestseller: false,
    isNewArrival: true,
    dimensions: "B6 Size (13cm x 18.5cm), 224 pages",
    materials: "Crushed velvet hardcover, 100gsm smooth cream paper",
    careInstructions: "Store with care to maintain plush velvet texture."
  },
  {
    id: 'prod-lace-scrunchies',
    name: "Coquette Ruffle Organza & Silk Scrunchie Set (Trio)",
    category: 'Hair Accessories',
    parentCategory: 'Hair Accessories',
    price: 98,
    originalPrice: 120,
    rating: 4.9,
    reviewCount: 19,
    description: "A dreamy trio of cloud-soft hair scrunchies trimmed with delicate French lace ruffles and satin piping. Gentle on hair to prevent friction, creasing, and breakage.",
    stock: 16,
    images: [
      '/src/assets/images/product_pearl_claw_clip_1792953393080.jpg',
      '/src/assets/images/product_satin_bow_clips_1792953392030.jpg'
    ],
    variants: [
      {
        name: 'Set Style',
        options: ['Sweet Ballet (Blush, White, Rose)', 'Pure Ivory & Lace', 'Petal Pink Monochrome']
      }
    ],
    tags: ['Hair Care', 'Scrunchies', 'Silk & Lace'],
    isBestseller: false,
    isNewArrival: false,
    dimensions: "Approx. 11cm diameter",
    materials: "High-grade Chiffon Organza, Elastic core, Cotton lace trim",
    careInstructions: "Hand wash gently in cold water with mild detergent; air dry."
  },
  {
    id: 'prod-custom-calligraphy-bundle',
    name: "Personalized Lettering Ribbon Stationery Box",
    category: 'Gifts & Bundles',
    parentCategory: 'Gifts & Bundles',
    price: 320,
    originalPrice: 360,
    rating: 5.0,
    reviewCount: 31,
    description: "Customized gift set featuring an envelope stationery suite with your recipient's name hand-lettered in gold calligraphy, 10 deckled-edge cotton note cards, matching wax seals, and a pair of blush bow clips.",
    stock: 7,
    images: [
      '/src/assets/images/product_gift_bundle_box_1792953392942.jpg'
    ],
    variants: [
      {
        name: 'Ink & Seal',
        options: ['Rose Gold Ink + Rose Wax', 'Antique Gold Ink + Pearl Wax', 'Blush Pink Ink + White Wax']
      }
    ],
    tags: ['Personalized', 'Calligraphy', 'Stationery'],
    isBestseller: false,
    isNewArrival: true,
    dimensions: "Stationery box 16cm x 22cm x 4cm",
    materials: "Handmade deckle edge paper, Real metallic calligraphy ink, Flexible sealing wax",
    careInstructions: "Indicate custom recipient name in checkout notes."
  },
  {
    id: 'prod-sweet-sticky-notes',
    name: "Sweet Romance Heart & Ribbon Sticky Notes Pad",
    category: 'Stationery',
    parentCategory: 'Stationery',
    price: 70,
    originalPrice: 90,
    rating: 4.7,
    reviewCount: 34,
    description: "Delightful self-adhesive memo pads shaped like delicate scalloped hearts and ribbon bows. Ideal for book annotations, reminder notes, study flashcards, and planner tabs.",
    stock: 30,
    images: [
      '/src/assets/images/product_gift_bundle_box_1792953392942.jpg',
      '/src/assets/images/hero_coquette_boutique_1792953391556.jpg'
    ],
    variants: [
      {
        name: 'Pad Shape',
        options: ['Scalloped Hearts (80 sheets)', 'Double Bow Topper (80 sheets)', 'Vintage Frame (80 sheets)']
      }
    ],
    tags: ['Stationery', 'Sticky Notes', 'School Essentials'],
    isBestseller: false,
    isNewArrival: false,
    dimensions: "7.5cm x 7.5cm, 80 sheets per pad",
    materials: "80gsm adhesive writeable paper",
    careInstructions: "Re-stickable adhesive leaves zero residue on book pages."
  }
];

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: "Amelia V.",
    location: "Quezon City, Metro Manila",
    rating: 5,
    date: "October 18, 2026",
    comment: "The Fleur Satin Bow Clips are even more stunning in person! The satin feels buttery soft and the pearl charms add the most romantic touch. Delivered in a cute pink box with dried rose petals. Will order again!",
    productName: "Fleur Satin Ribbon Bow Hair Clips",
    verified: true
  },
  {
    id: 'rev-2',
    author: "Chloe S.",
    location: "Cebu City",
    rating: 5,
    date: "October 14, 2026",
    comment: "I used the Dreamy Moments Journal for my daily gratitude practice. The paper is genuinely 120gsm—no bleed-through even with my wet fountain pens! It makes studying and journaling feel like a royal ritual.",
    productName: "Dreamy Moments Gold-Embossed Hardbound Journal",
    verified: true
  },
  {
    id: 'rev-3',
    author: "Bianca R.",
    location: "Taguig City, BGC",
    rating: 5,
    date: "October 9, 2026",
    comment: "Got the 'Pretty in Pink' gift bundle for my bestie's 18th birthday. She literally cried happy tears when she untied the satin bow! The packaging alone is worth 10 stars.",
    productName: "The 'Pretty in Pink' Curated Luxury Gift Bundle",
    verified: true
  },
  {
    id: 'rev-4',
    author: "Danielle M.",
    location: "Davao City",
    rating: 5,
    date: "September 28, 2026",
    comment: "The French pearl claw clip holds my thick hair the ENTIRE day without hurting my scalp. The pearlescent pink acrylic catches the light so prettily. 10/10 recommend for school or aesthetic work days!",
    productName: "L'Amour Pearl & Ribbon French Claw Clip",
    verified: true
  }
];

export const FAQS = [
  {
    question: "How long does shipping take within the Philippines?",
    answer: "For Metro Manila, orders arrive within 1–3 business days. For Provincial addresses (Luzon, Visayas, Mindanao), delivery typically takes 3–6 business days via our partner couriers (J&T Express, LBC, and GoGo Xpress)."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We support GCash, Maya (PayMaya), Cash on Delivery (COD nationwide), Bank Transfer (BDO, BPI, UnionBank), and Credit/Debit Cards. For this school project demo, all transactions are safely simulated!"
  },
  {
    question: "Can I request custom gift packaging or handwritten calligraphy?",
    answer: "Yes, absolutely! Every KLISHÉ order is wrapped with our signature satin bow. You can add a personalized recipient message in the 'Order Notes' section during checkout, and our team will hand-write it on an ivory keepsake card."
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes! Enjoy complimentary standard shipping on all orders totaling ₱499 and above. No coupon required—the discount will be applied automatically to your cart."
  },
  {
    question: "What is your return and exchange policy?",
    answer: "We accept returns or replacements within 7 days of delivery for damaged or incorrect items. Please reach out via our Contact form with your Order ID (#KL-XXXXX) and our customer care team will assist you right away."
  }
];

export const SHIPPING_RATES = {
  standard_metro: {
    label: "Standard Metro Manila (1–3 Days)",
    fee: 80,
    threshold: 499
  },
  provincial: {
    label: "Provincial Express (3–6 Days)",
    fee: 150,
    threshold: 699
  },
  express: {
    label: "Same-Day / Next-Day Priority (NCR)",
    fee: 200,
    threshold: 999
  }
};
