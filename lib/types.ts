export type ServiceType = 'walk' | 'home_care' | 'hospital' | 'night' | 'long_stay';

export const SERVICE_LABELS: Record<ServiceType, string> = {
  walk: '散歩代行',
  home_care: '在宅ケア',
  hospital: '通院同伴',
  night: '夜間見守り',
  long_stay: '長期不在サポート',
};

export const SERVICE_ICONS: Record<ServiceType, string> = {
  walk: '🐕',
  home_care: '🏠',
  hospital: '🏥',
  night: '🌙',
  long_stay: '✈️',
};

export const SERVICE_DESCRIPTIONS: Record<ServiceType, string> = {
  walk: 'GPS記録・報告付き',
  home_care: '投薬対応可',
  hospital: '診察内容も記録します',
  night: 'シニアペット対応',
  long_stay: '複数日パック対応',
};

export interface MateService {
  type: ServiceType;
  pricePerHour: number;
}

export interface Review {
  id: string;
  ownerName: string;
  ownerEmoji: string;
  rating: number;
  date: string;
  comment: string;
  repeatCount: number;
}

export interface TrustScore {
  score: number;
  completedCount: number;
  repeatRate: number;
  avgRating: number;
  activeMonths: number;
}

export interface Mate {
  id: string;
  name: string;
  emoji: string;
  imageUrl?: string;
  bgGradient: string;
  area: string;
  city: string;
  bio: string;
  services: MateService[];
  tags: string[];
  trustScore: TrustScore;
  reviews: Review[];
  availableDates: number[];
  repeatCount?: number;
  isNew?: boolean;
}

export interface RequestFormData {
  serviceType: ServiceType;
  date: string;
  startTime: string;
  endTime: string;
  petInfo: string;
  petNote: string;
  message: string;
}

export interface Pet {
  id: string;
  owner_id?: string;
  name: string;
  breed: string;
  category: 'dog' | 'cat' | 'rabbit' | 'other';
  age: string;
  gender: 'male' | 'female';
  imageUrl?: string;
  description: string;
  area: string;
  status: 'looking_for_mate' | 'booked' | 'none';
  distance?: string;
  trustScore?: TrustScore;
}

export type BookingStatus = 'pending' | 'matching' | 'confirmed' | 'completed' | 'cancelled';
export type MatchingMode = 'ai' | 'premium';

export interface Booking {
  id: string;
  ownerId: string;
  petId: string;
  mateId?: string;
  serviceType: ServiceType;
  status: BookingStatus;
  mode: MatchingMode;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice?: number;
  createdAt: string;
}
