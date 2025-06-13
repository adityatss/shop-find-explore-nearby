
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
}

export interface Hostel {
  id: string;
  name: string;
  description: string;
  address: string;
  location: UserLocation;
  posterUrl?: string;
  owner: string;
  phone: string;
  email: string;
  checkInTime: string;
  checkOutTime: string;
  amenities: string[];
  pricePerNight: number;
  availableRooms: number;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
