import { buildUrl } from '@/utils/buildUrl';
import { ICategory } from './category';
import { BASE_URL } from '@/constants/constant';

export interface IProductImages {
  id: number;
  fileOrder: number;
  url: string;
  type: string;
}

export interface IProductOptionDetail {
  /** option id */
  id: number;
  /** 옵션 값 */
  value: string;
  /** 재고 수량 */
  quantity: number;
  /** 이미지 순서 */
  order: number;
  /** 추가 금액 */
  additionalPrice: number;
}

export interface IProductOptions {
  /** 옵션 ID */
  id: number;
  /** 옵션 이름 */
  name: string;
  optionDetails: IProductOptionDetail[];
}

export interface IProduct {
  /** 상품 ID */
  productId: number;
  /** 상품 이름 */
  name: string;
  /** 상품 설명 */
  description: string;
  /** 상품 가격 */
  price: number;
  /** 상품 별점 */
  rating: number;
  /** 카테고리 정보*/
  category: ICategory;
  /** 공급자 */
  provider: {
    /** 공급자 ID */
    id: number;
    /** 공급자 이름 */
    name: string;
    /** 공급자 정보 */
    description: string;
  };
  /** 상품 옵션 */
  options: IProductOptions[];
  images: IProductImages[];
}

interface IProductAPI {
  content: IProduct[];
  //   TODO: page interface 만들어논거로 교체 예정
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export const PRODUCT_URL = 'api/v1/products/search';

export type SORT_OPTIONS = 'CREATE_DESC' | 'SALES_DESC' | 'PRICE_ASC' | 'PRICE_DESC';

export type ProductsProps = {
  /** 상품 아이디 */
  productId?: number;
  /** 1Depth 상품 카테고리 ID */
  categoryId?: number;
  /** 상품 이름, 상품 설명 (부분 일치 가능) */
  keyword?: string;
  /** 상품 최소 가격 */
  priceMin?: number;
  /** 상품 최대 가격 */
  priceMax?: number;
  /** 별점 (0~5) */
  rating?: number;
  /**
   * 정렬 기준. CREATE_DESC=등록순, SALES_DESC=판매량순, PRICE_ASC=낮은가격순, PRICE_DESC=높은가격순
   */
  sortOption?: SORT_OPTIONS;
  /** 페이지 수 */
  pageNumber?: number;
  /** 페이지 사이즈 */
  pageSize?: number;
};

export interface IProductDetail extends IProduct {
  id: number;
  reviewStatistic: { averageRating: number; reviewCount: number };
}

export const getProducts = async (props: ProductsProps): Promise<IProductAPI> => {
  const url = buildUrl(`${BASE_URL}${PRODUCT_URL}`, props);

  const response = await fetch(url);

  const data: IProductAPI = await response.json();
  return data;
};

export async function getProduct(productId: string): Promise<IProductDetail> {
  const response = await fetch(`${BASE_URL}api/v1/products/${productId}`);
  if (!response.ok) {
    throw new Error('상품 정보를 불러오는데 실패했습니다.');
  }
  return response.json();
}
