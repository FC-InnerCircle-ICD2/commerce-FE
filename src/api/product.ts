import { buildUrl } from '@/utils/buildUrl';
import { MOCK_URL, BASE_URL } from '@/constants/constant';

interface IProductOptions {
  /** 옵션 ID */
  id: number;
  /** 옵션 이름 */
  name: string;
  optionDetails: Array<{
    /** 옵션 값 */
    value: string;
    /** 재고 수량 */
    quantity: number;
    /** 추가 금액 */
    additionalPrice: number;
    /** 이미지 순서 */
    fileOrder: number;
    /** 이미지 url */
    url: string;
  }>;
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
  category: {
    /** 카테고리 ID */
    categoryId: number;
    /** 카테고리 이름 */
    name: string;
  };
  /** 공급자 */
  provider: {
    /** 공급자 ID */
    providerId: number;
    /** 공급자 이름 */
    name: string;
  };
  /** 상품 옵션 */
  options: IProductOptions[];
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

export const PRODUCT_URL = '/v1/products/search';

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

export const getProducts = async (props: ProductsProps): Promise<IProduct[]> => {
  const url = buildUrl(`${BASE_URL}${PRODUCT_URL}`, props);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const data: IProductAPI = await response.json();
  return data.content;
};
