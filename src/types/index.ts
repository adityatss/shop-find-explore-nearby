
export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  address: string;
  location: UserLocation;
  posterUrl?: string;
  items: Item[];
  owner: string;
  phone: string;
  email: string;
  openingHours: string;
  category: string;
  createdBy?: string; // Track who created this shop
  isOpen?: boolean; // Track if shop is currently open/closed
}

export interface User {
  id: string;
  name: string;
  email: string;
}
