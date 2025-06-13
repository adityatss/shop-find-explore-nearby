
import { Shop } from '../types';

export const mockShops: Shop[] = [
  {
    id: '1',
    name: 'Tech Haven Electronics',
    description: 'Your one-stop destination for the latest gadgets, smartphones, laptops, and electronic accessories. We offer competitive prices and excellent customer service.',
    address: '123 Tech Street, Digital City',
    location: { latitude: 40.7128, longitude: -74.0060 },
    posterUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    owner: 'John Smith',
    items: [
      { id: 'item1', name: 'iPhone 15 Pro', quantity: 5 },
      { id: 'item2', name: 'Samsung Galaxy S24', quantity: 8 },
      { id: 'item3', name: 'MacBook Air M2', quantity: 3 },
      { id: 'item4', name: 'iPad Pro', quantity: 6 },
      { id: 'item5', name: 'AirPods Pro', quantity: 12 },
      { id: 'item6', name: 'Wireless Charger', quantity: 15 },
      { id: 'item7', name: 'Phone Cases', quantity: 25 },
    ]
  },
  {
    id: '2',
    name: 'Fresh Mart Grocery',
    description: 'Premium quality fresh fruits, vegetables, dairy products, and daily essentials. We source directly from local farms to ensure freshness.',
    address: '456 Green Avenue, Foodie District',
    location: { latitude: 40.7589, longitude: -73.9851 },
    posterUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    owner: 'Maria Garcia',
    items: [
      { id: 'item8', name: 'Organic Apples', quantity: 50 },
      { id: 'item9', name: 'Fresh Milk', quantity: 20 },
      { id: 'item10', name: 'Whole Wheat Bread', quantity: 15 },
      { id: 'item11', name: 'Free Range Eggs', quantity: 30 },
      { id: 'item12', name: 'Organic Bananas', quantity: 40 },
      { id: 'item13', name: 'Greek Yogurt', quantity: 18 },
      { id: 'item14', name: 'Spinach', quantity: 25 },
      { id: 'item15', name: 'Tomatoes', quantity: 35 },
    ]
  },
  {
    id: '3',
    name: 'BookWorm Library & Café',
    description: 'A cozy bookstore and café combining the love of reading with great coffee. Browse our collection of books while enjoying artisanal coffee and pastries.',
    address: '789 Literature Lane, Arts Quarter',
    location: { latitude: 40.7831, longitude: -73.9712 },
    posterUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2086&q=80',
    owner: 'David Chen',
    items: [
      { id: 'item16', name: 'Fiction Novels', quantity: 45 },
      { id: 'item17', name: 'Science Books', quantity: 30 },
      { id: 'item18', name: 'Coffee Beans', quantity: 12 },
      { id: 'item19', name: 'Croissants', quantity: 8 },
      { id: 'item20', name: 'Art Books', quantity: 20 },
      { id: 'item21', name: 'Espresso', quantity: 100 },
      { id: 'item22', name: 'Bookmarks', quantity: 50 },
    ]
  },
  {
    id: '4',
    name: 'Style Studio Fashion',
    description: 'Trendy clothing and accessories for men and women. From casual wear to formal attire, we have everything to keep you stylish and comfortable.',
    address: '321 Fashion Boulevard, Style District',
    location: { latitude: 40.7505, longitude: -73.9934 },
    posterUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    owner: 'Sarah Johnson',
    items: [
      { id: 'item23', name: 'Denim Jeans', quantity: 25 },
      { id: 'item24', name: 'Cotton T-Shirts', quantity: 40 },
      { id: 'item25', name: 'Summer Dresses', quantity: 15 },
      { id: 'item26', name: 'Leather Jackets', quantity: 8 },
      { id: 'item27', name: 'Sneakers', quantity: 20 },
      { id: 'item28', name: 'Handbags', quantity: 12 },
      { id: 'item29', name: 'Sunglasses', quantity: 18 },
    ]
  },
  {
    id: '5',
    name: 'Home & Garden Paradise',
    description: 'Everything you need for your home and garden. From furniture and décor to plants and gardening tools, create your perfect living space.',
    address: '654 Home Street, Garden City',
    location: { latitude: 40.7282, longitude: -74.0776 },
    posterUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80',
    owner: 'Michael Brown',
    items: [
      { id: 'item30', name: 'Indoor Plants', quantity: 30 },
      { id: 'item31', name: 'Garden Tools', quantity: 15 },
      { id: 'item32', name: 'Decorative Vases', quantity: 20 },
      { id: 'item33', name: 'Outdoor Furniture', quantity: 5 },
      { id: 'item34', name: 'Fertilizer', quantity: 25 },
      { id: 'item35', name: 'Flower Seeds', quantity: 40 },
      { id: 'item36', name: 'Watering Cans', quantity: 12 },
    ]
  }
];
