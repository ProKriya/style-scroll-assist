import headphonesImg from '@/assets/headphones.jpg';
import leatherJacketImg from '@/assets/leather-jacket.jpg';
import fitnessWatchImg from '@/assets/fitness-watch.jpg';
import denimJeansImg from '@/assets/denim-jeans.jpg';
import gamingMouseImg from '@/assets/gaming-mouse.jpg';
import bluetoothSpeakerImg from '@/assets/bluetooth-speaker.jpg';
import eveningDressImg from '@/assets/evening-dress.jpg';
import actionCameraImg from '@/assets/action-camera.jpg';

export interface Product {
  product_id: string;
  vendor: string;
  title: string;
  price: number;
  mrp: number;
  currency: string;
  image_url: string;
  product_url: string;
  rating: string;
  rating_count: string;
  description_snippet: string;
  availability: string;
  scraped_at: string;
  category: 'fashion' | 'electronics' | 'gadgets';
}

// Products will be loaded dynamically from API
export let products: Product[] = [];

// Function to load products from API
export const loadProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/api/products.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    products = data;
    return data;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

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