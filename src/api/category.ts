import { MOCK_URL } from '@/constants/constant';
import { CategoryApis } from '@/constants/apiUrl';
import { IPaging } from '@/interface';

export interface ICategory {
  id: number;
  name: string;
  parentCategoryId: number | null;
  subCategories: Array<ICategory>;
}

interface ICategoryAPI {
  contents: ICategory[];
  page: IPaging;
}

export const getCategory = async (): Promise<ICategory[]> => {
  const response = await fetch(`${MOCK_URL}${CategoryApis.getCategory}?page=1&size=8&sort=%5B"created%2CDESC"%5D`);

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const data: ICategoryAPI = await response.json();
  return data.contents;
};
