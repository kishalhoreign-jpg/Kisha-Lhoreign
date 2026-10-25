import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  WishlistItem, 
  Order, 
  UserProfile, 
  ShippingAddress, 
  PaymentMethod, 
  DeliveryOption,
  Category 
} from '../types';
import { PRODUCTS, SHIPPING_RATES } from '../data/products';

interface ShopContextType {
  // Navigation & Page State
  activePage: string;
  setActivePage: (page: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedVariant?: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;

  // Discount Codes
  discountCode: string;
  appliedDiscount: { code: string; percent?: number; fixed?: number; freeShipping?: boolean } | null;
  discountError: string;
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;
  calculatedDiscount: number;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  wishlistCount: number;
  wishlistModalOpen: boolean;
  setWishlistModalOpen: (open: boolean) => void;
  moveToCartFromWishlist: (product: Product) => void;

  // User Account & Authentication
  currentUser: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string, phone?: string) => void;
  logout: () => void;
  accountModalOpen: boolean;
  setAccountModalOpen: (open: boolean) => void;
  accountActiveTab: 'profile' | 'orders' | 'wishlist' | 'login' | 'register';
  setAccountActiveTab: (tab: 'profile' | 'orders' | 'wishlist' | 'login' | 'register') => void;

  // Loyalty Points Program
  loyaltyPoints: number;
  redeemedPoints: number;
  pointsDiscount: number;
  redeemPoints: (points: number) => void;
  resetRedeemedPoints: () => void;
  pointsEarnedThisOrder: number;

  // Gift Wrapping
  hasGiftWrapping: boolean;
  setHasGiftWrapping: (has: boolean) => void;
  giftWrappingFee: number;

  // Checkout & Orders
  selectedDeliveryOption: DeliveryOption;
  setSelectedDeliveryOption: (opt: DeliveryOption) => void;
  shippingFee: number;
  orderTotal: number;
  orders: Order[];
  latestOrder: Order | null;
  placeOrder: (
    shippingAddress: ShippingAddress, 
    paymentMethod: PaymentMethod,
    paymentMethodLabel: string,
    notes?: string
  ) => Order;

  // Notifications / Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('klishe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('klishe_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);

  // User Authentication
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('klishe_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [accountActiveTab, setAccountActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'login' | 'register'>('login');

  // Discounts
  const [discountCode, setDiscountCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent?: number; fixed?: number; freeShipping?: boolean } | null>(null);
  const [discountError, setDiscountError] = useState<string>('');

  // Delivery & Checkout
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<DeliveryOption>('standard_metro');
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('klishe_orders');
      if (saved) return JSON.parse(saved);
      // Default sample order so users can inspect order tracking immediately
      return [
        {
          id: 'KL-49201',
          createdAt: '2026-10-20T14:32:00Z',
          items: [
            {
              product: PRODUCTS[0],
              selectedVariant: 'Baby Pink Duo',
              quantity: 1,
              unitPrice: 85
            },
            {
              product: PRODUCTS[2],
              selectedVariant: 'Dotted Bullet Pages',
              quantity: 1,
              unitPrice: 220
            }
          ],
          subtotal: 305,
          discount: 30.5,
          discountCode: 'PRETTY10',
          shippingFee: 80,
          total: 354.5,
          shippingAddress: {
            fullName: 'Amelia Valderrama',
            email: 'amelia.valderrama@example.com',
            phone: '0917 892 4410',
            streetAddress: 'Unit 14B Sakura Residences, Katipunan Ave',
            barangay: 'Loyola Heights',
            city: 'Quezon City',
            province: 'Metro Manila',
            postalCode: '1108',
            orderNotes: 'Please wrap with extra pink satin ribbon! Gift for school graduation.'
          },
          paymentMethod: 'gcash',
          paymentMethodLabel: 'GCash (0917-***-4410)',
          deliveryOption: 'standard_metro',
          status: 'Wrapping with Satin Bow',
          trackingNumber: 'JT-PH-94829104'
        }
      ];
    } catch {
      return [];
    }
  });
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('klishe_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('klishe_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('klishe_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('klishe_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('klishe_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Product detail view
  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  // Cart Handlers
  const addToCart = (product: Product, selectedVariant?: string, quantity = 1) => {
    const variantKey = selectedVariant || (product.variants?.[0]?.options?.[0] ?? 'Standard');
    const itemId = `${product.id}-${variantKey}`;

    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === itemId);
      if (existing) {
        return prevCart.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: itemId,
          product,
          selectedVariant: variantKey,
          quantity
        }
      ];
    });

    showToast(`Added "${product.name}" to your shopping bag! 🌸`);
    setCartDrawerOpen(true);
  };

  const updateCartQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => 
      prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast("Item removed from your shopping bag.");
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Discount Codes
  const applyDiscountCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    setDiscountError('');
    if (!clean) {
      setDiscountError('Please enter a voucher code');
      return false;
    }
    if (clean === 'PRETTY10') {
      setAppliedDiscount({ code: 'PRETTY10', percent: 10 });
      showToast('🎀 10% OFF applied with code PRETTY10!');
      return true;
    } else if (clean === 'BOWLOVE') {
      setAppliedDiscount({ code: 'BOWLOVE', fixed: 50 });
      showToast('🎀 ₱50 discount applied with code BOWLOVE!');
      return true;
    } else if (clean === 'FREESHIP') {
      setAppliedDiscount({ code: 'FREESHIP', freeShipping: true });
      showToast('✨ Free Shipping unlocked with code FREESHIP!');
      return true;
    } else {
      setDiscountError('Invalid voucher code. Try PRETTY10 or BOWLOVE');
      return false;
    }
  };

  const removeDiscountCode = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    showToast('Voucher removed.');
  };

  let calculatedDiscount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.percent) {
      calculatedDiscount = Math.round((cartSubtotal * appliedDiscount.percent) / 100);
    } else if (appliedDiscount.fixed) {
      calculatedDiscount = Math.min(appliedDiscount.fixed, cartSubtotal);
    }
  }

  // Gift Wrapping
  const [hasGiftWrapping, setHasGiftWrapping] = useState<boolean>(false);
  const giftWrappingFee = hasGiftWrapping ? 30 : 0;

  // Loyalty Points Program
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('klishe_loyalty_points');
      return saved ? JSON.parse(saved) : 150; // Initial 150 points for demo
    } catch {
      return 150;
    }
  });
  const [redeemedPoints, setRedeemedPoints] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem('klishe_loyalty_points', JSON.stringify(loyaltyPoints));
    } catch (e) {
      console.error(e);
    }
  }, [loyaltyPoints]);

  const redeemPoints = (points: number) => {
    const validPoints = Math.min(points, loyaltyPoints, Math.floor(cartSubtotal));
    setRedeemedPoints(validPoints);
    if (validPoints > 0) {
      showToast(`🎀 Redeemed ${validPoints} Coquette Points for ₱${validPoints} discount!`);
    } else {
      showToast('Points redemption removed.');
    }
  };

  const resetRedeemedPoints = () => {
    setRedeemedPoints(0);
  };

  const pointsDiscount = redeemedPoints; // 1 point = ₱1

  // Shipping Calculations
  const rateConfig = SHIPPING_RATES[selectedDeliveryOption] || SHIPPING_RATES.standard_metro;
  const isFreeThreshold = cartSubtotal >= rateConfig.threshold;
  const hasFreeShippingVoucher = appliedDiscount?.freeShipping === true;
  const shippingFee = (cartSubtotal > 0 && (isFreeThreshold || hasFreeShippingVoucher)) ? 0 : (cartSubtotal > 0 ? rateConfig.fee : 0);

  const orderTotal = Math.max(0, cartSubtotal - calculatedDiscount - pointsDiscount + shippingFee + giftWrappingFee);
  const pointsEarnedThisOrder = Math.max(1, Math.floor(orderTotal / 10)); // 1 point per ₱10 spent

  // Wishlist Handlers
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some(item => item.productId === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      setWishlist(prev => [
        ...prev,
        {
          productId: product.id,
          product,
          addedAt: new Date().toISOString()
        }
      ]);
      showToast(`Saved "${product.name}" to your wishlist! 💖`);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.productId !== productId));
    showToast("Item removed from your wishlist.");
  };

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const wishlistCount = wishlist.length;

  // Account & Auth
  const login = (email: string, name = 'Klishé Darling') => {
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      phone: '0917 123 4567',
      defaultAddress: {
        fullName: name || email.split('@')[0],
        email,
        phone: '0917 123 4567',
        streetAddress: '12 Blossom Lane',
        barangay: 'San Lorenzo',
        city: 'Makati City',
        province: 'Metro Manila',
        postalCode: '1223'
      }
    };
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}! ✨`);
    setAccountModalOpen(false);
  };

  const register = (name: string, email: string, phone = '0917 000 0000') => {
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      defaultAddress: {
        fullName: name,
        email,
        phone,
        streetAddress: '',
        barangay: '',
        city: 'Metro Manila',
        province: 'Metro Manila',
        postalCode: '1000'
      }
    };
    setCurrentUser(user);
    showToast(`Account created! Welcome to KLISHÉ, ${name} 🌸`);
    setAccountModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    showToast("You've been signed out.");
  };

  // Place Order
  const placeOrder = (
    shippingAddress: ShippingAddress, 
    paymentMethod: PaymentMethod,
    paymentMethodLabel: string,
    notes?: string
  ): Order => {
    const newOrder: Order = {
      id: `KL-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      items: cart.map(item => ({
        product: item.product,
        selectedVariant: item.selectedVariant,
        quantity: item.quantity,
        unitPrice: item.product.price
      })),
      subtotal: cartSubtotal,
      discount: calculatedDiscount,
      discountCode: appliedDiscount?.code,
      shippingFee,
      giftWrappingFee,
      hasGiftWrapping,
      pointsDiscount: redeemedPoints,
      pointsEarned: pointsEarnedThisOrder,
      total: orderTotal,
      shippingAddress: {
        ...shippingAddress,
        orderNotes: notes || shippingAddress.orderNotes
      },
      paymentMethod,
      paymentMethodLabel,
      deliveryOption: selectedDeliveryOption,
      status: 'Processing',
      trackingNumber: `JT-PH-${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    // Update loyalty points
    setLoyaltyPoints(prev => Math.max(0, prev - redeemedPoints + pointsEarnedThisOrder));
    setRedeemedPoints(0);
    setHasGiftWrapping(false);

    setOrders(prev => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    setAppliedDiscount(null);
    setActivePage('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`🎀 Order placed! You earned ${pointsEarnedThisOrder} Coquette Loyalty Points! ✨`);
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        openProductDetail,
        closeProductDetail,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,
        cartDrawerOpen,
        setCartDrawerOpen,

        discountCode,
        appliedDiscount,
        discountError,
        applyDiscountCode,
        removeDiscountCode,
        calculatedDiscount,

        loyaltyPoints,
        redeemedPoints,
        pointsDiscount,
        redeemPoints,
        resetRedeemedPoints,
        pointsEarnedThisOrder,

        hasGiftWrapping,
        setHasGiftWrapping,
        giftWrappingFee,

        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        wishlistCount,
        wishlistModalOpen,
        setWishlistModalOpen,
        moveToCartFromWishlist,

        currentUser,
        isLoggedIn: !!currentUser,
        login,
        register,
        logout,
        accountModalOpen,
        setAccountModalOpen,
        accountActiveTab,
        setAccountActiveTab,

        selectedDeliveryOption,
        setSelectedDeliveryOption,
        shippingFee,
        orderTotal,
        orders,
        latestOrder,
        placeOrder,

        toastMessage,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
