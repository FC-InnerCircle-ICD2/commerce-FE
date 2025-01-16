// types.ts
export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  productCategory: {
    productCategoryId: number;
    name: string;
    parentCategoryId: number;
    subCategories: any[];
  };
  provider: {
    providerId: number;
    name: string;
    description: string;
  };
  options: {
    id: number;
    name: string;
    value: string;
    quantity: number;
    optionOrder: number;
    sellPrice: number;
  }[];
  images: {
    id: number;
    url: string;
    fileOrder: number;
    isRepresentative: boolean;
  }[];
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterProps {
  products: Product[];
  selectedPrice?: PriceRange;
}
