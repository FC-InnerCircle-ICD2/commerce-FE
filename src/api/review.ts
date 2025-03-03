import { fetchWithAuth } from '@/store/fetchWithAuth';

export interface IReviewContent {
  reviewImages: [
    {
      id: number;
      url: string;
      fileOrder: number;
    },
  ];
  id: number;
  productName: string;
  productOptionName: string;
  rating: number;
  content: string;
  createdAt: string;
}

export interface IReview {
  content: Array<IReviewContent>;
  page: {
    size: 10;
    number: 0;
    totalElements: 1;
    totalPages: 1;
  };
}

const PRODUCT_BASE_URL = 'https://product-api.emmotional-cart.click';

export const getReview = async (productId: number): Promise<IReview> => {
  const response = await fetch(`${PRODUCT_BASE_URL}/api/v1/products/${productId}/reviews`);
  const data: IReview = await response.json();
  return data;
};

export type ReviewProps = {
  productId: number;
  formData: FormData;
};

export const postReviews = async (props: ReviewProps) => {
  const response = await fetchWithAuth(`${PRODUCT_BASE_URL}/api/v1/products/${props.productId}/review`, {
    method: 'POST',
    body: props.formData,
  });

  if (!response.ok) {
    throw new Error('Failed to place order');
  }

  const data = await response.json();
  return data;
};
