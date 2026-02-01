
export type UserRole = 'LANDLORD' | 'RENTER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  businessName?: string; // For Landlords
  moveInDate?: string;   // For Renters
  duration?: string;     // For Renters
  rating: number;
  reviewsCount: number;
  joinedAt: number;
}

export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  targetId: string; // Could be a Property ID or a User ID (for renter ratings)
  content: string;
  rating: number;
  timestamp: number;
}

export enum FurnishingType {
  FURNISHED = 'Furnished',
  SEMI_FURNISHED = 'Semi-furnished',
  UNFURNISHED = 'Unfurnished'
}

export enum TenantPreference {
  BACHELOR = 'Bachelor',
  FAMILY = 'Family',
  BOTH = 'Both'
}

export enum FoodPreference {
  VEG = 'Veg Only',
  NON_VEG = 'Veg/Non-Veg'
}

export interface PropertyLocation {
  country: string;
  state: string;
  district: string;
  city: string;
  area: string;
  address: string;
  landmark: string;
  houseNumber: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Property {
  id: string;
  landlordId: string;
  title: string;
  description: string;
  photos: string[];
  videos: string[];
  rent: number;
  deposit: number;
  location: PropertyLocation;
  furnishing: FurnishingType;
  tenantType: TenantPreference;
  foodPreference: FoodPreference;
  facilities: string[];
  createdAt: number;
  interestedCount: number;
  reviews: Review[];
}
