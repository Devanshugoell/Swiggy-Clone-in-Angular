export interface RestaurantInfo {
  id: string;
  name: string;
  cloudinaryImageId?: string;
  avgRating?: number | string;
  cuisines?: string[];
  areaName?: string;
  isNewlyOnboarded?: boolean;
  sla?: {
    slaString?: string;
    lastMileTravelString?: string;
  };
  aggregatedDiscountInfoV3?: {
    header?: string;
    subHeader?: string;
  };
}

export interface RestaurantWrapper {
  info: RestaurantInfo;
}

export interface BannerInfo {
  id: string;
  imageId: string;
  action?: {
    text?: string;
  };
}

export interface HomeData {
  title: string;
  banners: BannerInfo[];
  restaurants: RestaurantWrapper[];
}

export interface RestaurantMenuInfo {
  id?: string;
  name?: string;
  cuisines?: string[];
  city?: string;
  areaName?: string;
  avgRating?: number | string;
  totalRatings?: string;
  costForTwoMessage?: string;
  sla?: {
    slaString?: string;
    lastMileTravelString?: string;
  };
  feeDetails?: {
    amount?: number;
    message?: string;
  };
}

export interface MenuItemInfo {
  id: string;
  name: string;
  isVeg?: number;
  price?: number;
  defaultPrice?: number;
  imageId?: string;
  description?: string;
}

export interface MenuItemCard {
  card: {
    info: MenuItemInfo;
  };
  quantity?: number;
}

export interface MenuCategory {
  title: string;
  itemCards: MenuItemCard[];
}

export interface RestaurantMenuData {
  info: RestaurantMenuInfo;
  categories: MenuCategory[];
}

export interface SearchCuisine {
  id: string;
  imageId: string;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
