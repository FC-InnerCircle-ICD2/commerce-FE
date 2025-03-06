import { fetchWithAuth } from '@/store/fetchWithAuth';

export interface IUser {
  userId: number;
  roles: string[];
  name: string;
}

export const getUser = async () => {
  const response = await fetchWithAuth('https://member-api.emmotional-cart.click/api/v1/members/me');

  if (!response.ok) {
    throw new Error('Failed to place order');
  }

  const data: IUser = await response.json();
  return data;
};
