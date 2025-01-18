import { buildUrl } from '@/utils/buildUrl';
import type { ICategory } from './category';

interface IProvider {
  providerId: number;
  name: string;
  description: string;
}

export interface IProduct {
  productId: number;
  name: string;
  description: string;
  price: number;
  productCategory: ICategory;
  provider: IProvider;
  options: [
    {
      id: number;
      name: string;
      value: string;
      quantity: number;
      optionOrder: number;
      sellPrice: number;
    },
  ];
  images: [
    {
      id: number;
      url: string;
      fileOrder: number;
      isRepresentative: boolean;
    },
  ];
}

interface IProductAPI {
  productes: IProduct[];
  //   TODO: page interface 만들어논거로 교체 예정
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

const PRODUCT_URL = '/api/v1/product';

export type ProductsProps = {
  /** 조회할 카테고리 ID */
  productCategoryId?: number;
  /** 검색할 제품 이름 */
  name?: string;
  /** 별점  */
  rating?: number;
  /** 정렬기준
   * registration=등록순, sales=판매량순, priceAsc=낮은가격순, priceDesc=높은가격순
   */
  sort?: 'registration' | 'sales' | 'priceAsc' | 'priceDesc';
  page?: number;
  size?: number;
};

export const getProducts = async ({ productCategoryId, name, rating, sort }: ProductsProps): Promise<IProduct[]> => {
  const url = buildUrl(`https://virtserver.swaggerhub.com/STAM0325/Ecommerce-MVP/1.0${PRODUCT_URL}`, {
    productCategoryId,
    sort,
    rating,
    name,
  });
  console.log(url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const data: IProductAPI = await response.json();
  console.log(data);
  return data.productes;
};
