
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

export interface User {
  id: string;
  name: string;
  email: string;
}
