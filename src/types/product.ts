import { IProduct } from '@/api/product';

export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterProps {
  products: IProduct[];
  selectedPrice?: PriceRange;
}
