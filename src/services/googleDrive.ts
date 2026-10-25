import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  signOut
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { PRODUCTS } from '../data/products';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive.file');

let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initDriveAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else if (!isSigningIn) {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const signInWithGoogleForDrive = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Could not retrieve access token from Google');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } finally {
    isSigningIn = false;
  }
};

export const getDriveAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const signOutDrive = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface DriveUploadResult {
  docFile: { id: string; name: string; webViewLink?: string };
  dataFile: { id: string; name: string; webViewLink?: string };
}

/**
 * Uploads the project report and data directly to the user's Google Drive.
 * Converts the report into a real Google Doc so they can view and edit it in Google Docs!
 */
export const uploadProjectToGoogleDrive = async (accessToken: string): Promise<DriveUploadResult> => {
  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  // 1. Prepare HTML content to be converted into a native Google Doc
  const docHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>KLISHÉ - School Project Documentation</title>
<style>
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  h1 { color: #831843; font-size: 26px; }
  h2 { color: #9D174D; font-size: 18px; margin-top: 20px; }
  table { width: 100%; border-collapse: collapse; margin-top: 15px; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
  th { background-color: #FFF0F5; color: #831843; }
</style>
</head>
<body>
  <h1>KLISHÉ — “Your Everyday Dose of Pretty”</h1>
  <p><strong>Brand Tagline:</strong> “Your Everyday Dose of Pretty.”</p>
  <p><strong>Brand Message:</strong> “KLISHÉ — Your Everyday Dose of Pretty. Little things, lovely finds, and thoughtful gifts made to brighten your day.”</p>
  <p><strong>Target Market:</strong> Students, teenagers, young adults, stationery lovers, and gift shoppers.</p>
  <p><strong>Live Web Application:</strong> https://ais-pre-zdkva43ctk4omzvbtx7r6w-90008916979.asia-northeast1.run.app</p>
  
  <h2>1. Project Scope &amp; Completed Features</h2>
  <ul>
    <li><strong>Homepage:</strong> Announcement bar, brand wordmark, hero banner, category cards, bestsellers, new arrivals, promotional gift banner, customer reviews, newsletter, and footer.</li>
    <li><strong>Boutique Catalog:</strong> Hair Accessories, Ribbon Bows, Claw Clips, Stationery, Notebooks, Pens, Stickers, Keychains, and Gift Bundles.</li>
    <li><strong>Interactive Shopping Features:</strong> Real-time search, category filters, price sorting, product variations, quantity selectors, Add to Cart, item removal, automatic subtotal calculations, and vouchers (PRETTY10, BOWLOVE).</li>
    <li><strong>Wishlist System:</strong> Persistent wishlist with live item counter badge next to the account icon in the header, accessible inside the user's account lounge.</li>
    <li><strong>Checkout &amp; Modes of Payment:</strong> Validation for customer name, email, contact number, delivery address (Barangay, City, Province, Postal Code), order notes, delivery options, and Philippine modes of payment (GCash, Maya, COD, BDO/BPI Bank Transfer, and Card).</li>
    <li><strong>Order Confirmation:</strong> Order #KL-XXXXX, tracking code, packaging timeline, itemized receipt breakdown, and printable confirmation.</li>
  </ul>

  <h2>2. Product Catalog &amp; Prices (PHP ₱)</h2>
  <table>
    <thead>
      <tr>
        <th>Item Name</th>
        <th>Category</th>
        <th>Price (₱)</th>
        <th>Stock</th>
      </tr>
    </thead>
    <tbody>
      ${PRODUCTS.map(p => `<tr><td>${p.name}</td><td>${p.category}</td><td>₱${p.price.toFixed(2)}</td><td>${p.stock} units</td></tr>`).join('')}
    </tbody>
  </table>

  <h2>3. Technology Stack</h2>
  <p>Built with React 19, TypeScript, Tailwind CSS, and Vite. Stored persistently across browser sessions using localStorage.</p>
</body>
</html>`;

  // Upload Google Doc
  const docMetadata = {
    name: 'KLISHÉ — School Project Report & Documentation',
    mimeType: 'application/vnd.google-apps.document'
  };

  const docMultipartBody = 
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(docMetadata) +
    delimiter +
    'Content-Type: text/html\r\n\r\n' +
    docHtml +
    closeDelimiter;

  const docRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: docMultipartBody
  });

  if (!docRes.ok) {
    const errText = await docRes.text();
    throw new Error(`Failed to upload Google Doc: ${errText}`);
  }
  const docFile = await docRes.json();

  // 2. Upload JSON Data File (KiB file)
  const jsonMetadata = {
    name: 'KLISHE_Project_Data.json',
    mimeType: 'application/json'
  };

  const jsonData = JSON.stringify({
    project: "KLISHÉ Online Shop",
    brandTagline: "Your Everyday Dose of Pretty",
    liveAppUrl: "https://ais-pre-zdkva43ctk4omzvbtx7r6w-90008916979.asia-northeast1.run.app",
    products: PRODUCTS,
    techStack: ["React 19", "TypeScript", "Tailwind CSS v4", "Vite 8"],
    features: [
      "Product search & category filtering",
      "Wishlist system with real-time header count",
      "User account login & registration lounge",
      "Shopping bag drawer with free shipping progress bar",
      "Simulated Philippine payment modes (GCash, Maya, COD, Bank Transfer)",
      "Order receipt with tracking number & timeline"
    ]
  }, null, 2);

  const jsonMultipartBody = 
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(jsonMetadata) +
    delimiter +
    'Content-Type: application/json\r\n\r\n' +
    jsonData +
    closeDelimiter;

  const jsonRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: jsonMultipartBody
  });

  const dataFile = jsonRes.ok ? await jsonRes.json() : { id: '', name: 'KLISHE_Project_Data.json' };

  return { docFile, dataFile };
};
