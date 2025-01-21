import { BASE_URL } from '@/constants/constant';
import { CategoryApis } from '@/constants/apiUrl';

export interface ICategory {
  productCategoryId: number;
  name: string;
  parentCategoryId: number | null;
  subCategories: Array<ICategory>;
}

interface ICategoryAPI {
  productCategories: ICategory[];
}

export const getCategory = async (): Promise<ICategory[]> => {
  const response = await fetch(`${BASE_URL}${CategoryApis.getCategory}`);

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const data: ICategoryAPI = await response.json();
  return data.productCategories;
};
