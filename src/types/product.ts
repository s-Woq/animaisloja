export type CategorySlug = 'dogs' | 'cats' | 'birds' | 'fish' | 'small-animals' | 'accessories' | 'food' | 'toys' | 'grooming' | 'beds';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  badge?: string;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  stock: number;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}
