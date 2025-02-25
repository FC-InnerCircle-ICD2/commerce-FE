import { BannerApis } from '@/constants/apiUrl';
import { BASE_URL } from '@/constants/constant';

export interface IBanner {
  id: number;
  type: string;
  title: string;
  bannerOrder: number;
  iconUrl: string;
  bannerImage: {
    id: number;
    url: string;
    fileOrder: number;
  };
  productBannerResponse: { id: number; linkUrl: string; linkType: number };
}

export const getBanners = async (): Promise<IBanner[]> => {
  const response = await fetch(`${BASE_URL}${BannerApis.getBanner}`);

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
