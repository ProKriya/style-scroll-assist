import headphonesImg from '@/assets/headphones.jpg';
import leatherJacketImg from '@/assets/leather-jacket.jpg';
import fitnessWatchImg from '@/assets/fitness-watch.jpg';
import denimJeansImg from '@/assets/denim-jeans.jpg';
import gamingMouseImg from '@/assets/gaming-mouse.jpg';
import bluetoothSpeakerImg from '@/assets/bluetooth-speaker.jpg';
import eveningDressImg from '@/assets/evening-dress.jpg';
import actionCameraImg from '@/assets/action-camera.jpg';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  category: 'fashion' | 'electronics' | 'gadgets';
  image: string;
  colors: Array<{
    name: string;
    hex: string;
  }>;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality noise-canceling headphones with premium sound quality and long battery life perfect for music lovers.',
    price: 299.99,
    discountedPrice: 199.99,
    category: 'electronics',
    image: headphonesImg,
    colors: [
      { name: 'Midnight Black', hex: '#1a1a1a' },
      { name: 'Silver', hex: '#c0c0c0' },
      { name: 'Rose Gold', hex: '#e8b4a0' }
    ],
    rating: 4.8,
    reviews: 1250
  },
  {
    id: '2',
    name: 'Designer Leather Jacket',
    description: 'Authentic leather jacket with modern cut and premium craftsmanship. Perfect for casual and semi-formal occasions.',
    price: 459.99,
    discountedPrice: 329.99,
    category: 'fashion',
    image: leatherJacketImg,
    colors: [
      { name: 'Classic Black', hex: '#000000' },
      { name: 'Brown', hex: '#8b4513' },
      { name: 'Navy', hex: '#1e3a8a' }
    ],
    rating: 4.7,
    reviews: 890
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor, GPS, and 7-day battery life for active lifestyle enthusiasts.',
    price: 249.99,
    discountedPrice: 179.99,
    category: 'gadgets',
    image: fitnessWatchImg,
    colors: [
      { name: 'Space Gray', hex: '#4a4a4a' },
      { name: 'Silver', hex: '#c0c0c0' },
      { name: 'Gold', hex: '#ffd700' }
    ],
    rating: 4.6,
    reviews: 2100
  },
  {
    id: '4',
    name: 'Vintage Denim Jeans',
    description: 'Classic fit denim jeans with premium cotton blend and timeless design that never goes out of style.',
    price: 89.99,
    discountedPrice: 59.99,
    category: 'fashion',
    image: denimJeansImg,
    colors: [
      { name: 'Classic Blue', hex: '#4169e1' },
      { name: 'Dark Wash', hex: '#191970' },
      { name: 'Light Blue', hex: '#87ceeb' }
    ],
    rating: 4.5,
    reviews: 750
  },
  {
    id: '5',
    name: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with customizable RGB lighting and ergonomic design for extended gaming sessions.',
    price: 79.99,
    discountedPrice: 49.99,
    category: 'electronics',
    image: gamingMouseImg,
    colors: [
      { name: 'RGB Black', hex: '#000000' },
      { name: 'White', hex: '#ffffff' }
    ],
    rating: 4.9,
    reviews: 1800
  },
  {
    id: '6',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact waterproof speaker with 360° sound and 24-hour battery life perfect for outdoor adventures.',
    price: 149.99,
    discountedPrice: 99.99,
    category: 'gadgets',
    image: bluetoothSpeakerImg,
    colors: [
      { name: 'Ocean Blue', hex: '#006994' },
      { name: 'Coral', hex: '#ff7f50' },
      { name: 'Forest Green', hex: '#228b22' }
    ],
    rating: 4.4,
    reviews: 950
  },
  {
    id: '7',
    name: 'Silk Evening Dress',
    description: 'Elegant silk dress with flowing design perfect for special occasions and evening events with sophisticated style.',
    price: 349.99,
    discountedPrice: 249.99,
    category: 'fashion',
    image: eveningDressImg,
    colors: [
      { name: 'Midnight Blue', hex: '#191970' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Emerald', hex: '#50c878' }
    ],
    rating: 4.8,
    reviews: 420
  },
  {
    id: '8',
    name: '4K Action Camera',
    description: 'Ultra HD action camera with image stabilization and waterproof casing for capturing life\'s adventures in stunning detail.',
    price: 399.99,
    discountedPrice: 299.99,
    category: 'electronics',
    image: actionCameraImg,
    colors: [
      { name: 'Stealth Black', hex: '#2c2c2c' },
      { name: 'Arctic White', hex: '#f8f8ff' }
    ],
    rating: 4.7,
    reviews: 1350
  }
];

export const categories = [
  { id: 'fashion', name: 'Fashion & Clothing', icon: '👕' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'gadgets', name: 'Gadgets & Accessories', icon: '⌚' }
];

export const searchSuggestions = [
  'wireless headphones',
  'leather jacket',
  'smart watch',
  'bluetooth speaker',
  'denim jeans',
  'gaming mouse',
  'evening dress',
  'action camera',
  'fashion accessories',
  'electronic devices'
];