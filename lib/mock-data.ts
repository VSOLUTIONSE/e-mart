import type { Product } from '@/types/product'
import type { Category } from '@/types/category'
import type { StoreSettings } from '@/types/store-settings'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic T-Shirt',
    description: 'Premium cotton t-shirt with a comfortable fit',
    price: 2999,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    ],
    category: 'clothing',
    inStock: true,
    featured: true,
    variants: ['Small', 'Medium', 'Large', 'XL'],
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 45000,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
    ],
    category: 'electronics',
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Leather Backpack',
    description: 'Stylish and durable leather backpack for everyday use',
    price: 12000,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    ],
    category: 'accessories',
    inStock: true,
    featured: false,
  },
  {
    id: '4',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking and notifications on your wrist',
    price: 56000,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500',
    ],
    category: 'electronics',
    inStock: true,
    featured: true,
    variants: ['Black', 'Silver', 'Rose Gold'],
  },
  {
    id: '5',
    name: 'Denim Jacket',
    description: 'Classic denim jacket with modern styling',
    price: 4500,
    images: [
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=500',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
    ],
    category: 'clothing',
    inStock: true,
    featured: false,
    variants: ['Small', 'Medium', 'Large', 'XL'],
  },
  {
    id: '6',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with premium switches',
    price: 12000,
    images: [
      'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500',
    ],
    category: 'electronics',
    inStock: true,
    featured: false,
  },
  {
    id: '7',
    name: 'Sunglasses',
    description: 'UV protection sunglasses with polarized lenses',
    price: 15000,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    ],
    category: 'accessories',
    inStock: true,
    featured: true,
    variants: ['Black', 'Tortoise', 'Gold'],
  },
  {
    id: '8',
    name: 'Running Shoes',
    description: 'Lightweight and breathable running shoes',
    price: 9000.99,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500',
    ],
    category: 'clothing',
    inStock: true,
    featured: true,
    variants: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
  },
  {
    id: '9',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 14999,   
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    ],
    category: 'electronics',
    inStock: true,
    featured: false,
  },
  {
    id: '10',
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with RFID protection',
    price: 2000,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
    ],
    category: 'accessories',
    inStock: true,
    featured: false,
    variants: ['Brown', 'Black', 'Tan'],
  },
  {
    id: '11',
    name: 'Graphic Hoodie',
    description: 'Cozy hoodie with a stylish graphic print',
    price: 49999,
    images: [
      'https://images.unsplash.com/photo-1544005313-94ddf028b3a3?w=500',
    ],
    category: 'clothing',
    inStock: true,
    featured: true,
    variants: ['Small', 'Medium', 'Large', 'XL'],
  },
  {
    id: '12',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with deep bass',
    price: 20000,
    images: [
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500',
    ],
    category: 'electronics',
    inStock: true,
    featured: true,
  },
  {
    id: '13',
    name: 'Wristband Fitness Tracker',
    description: 'Slim fitness tracker with heart rate monitor',
    price: 4999,
    images: [
      'https://images.unsplash.com/photo-1581093588402-4c8f8e6f8a2f?w=500',
    ],
    category: 'electronics',
    inStock: true,
    featured: false,
    variants: ['Black', 'Blue', 'Pink'],
  },
  {
    id: '14',
    name: 'Baseball Cap',
    description: 'Classic baseball cap with adjustable strap',
    price: 24000,
    images: [
      'https://images.unsplash.com/photo-1512443161738-8f6b7e6f8a2f?w=500',
    ],
    category: 'accessories',
    inStock: true,
    featured: false,
    variants: ['Black', 'White', 'Red'],
  },
  {
    id: '15',
    name: 'Chinos Pants',
    description: 'Comfortable chinos pants for casual wear',
    price: 54.99,
    images: [
      'https://images.unsplash.com/photo-1589927986089-358123789b8c?w=500',
    ],
    category: 'clothing',
    inStock: true,
    featured: false,
    variants: ['30', '32', '34', '36'],
  },
]

export const mockCategories: Category[] = [
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Apparel and garments',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Electronic devices and accessories',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Fashion accessories and more',
  },
]

export const mockStoreSettings: StoreSettings = {
  storeName: 'E-Mart Store',
  storeDescription: 'Your one-stop shop for quality products',
  logo: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200',
  currency: '₦', // Nigerian Naira
  themeColor: '#25D366', // WhatsApp green
  whatsappNumber: '+12345678900',
  welcomeMessage: 'Welcome to E-Mart! How can we help you today?',
  footer: '© 2025 E-Mart Store. All rights reserved.',
  emailContact: 'demo@emart.com',
  facebookUrl: 'https://facebook.com/emart',
  instagramUrl: 'https://instagram.com/emart',
  mission: 'To provide quality products at affordable prices',
  established: '2025',
  location: '123 Demo Street, Shopping District, 12345',
}
