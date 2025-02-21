export interface ICategory {
  id: number;
  name: string;
  parentCategoryId: number | null;
  subCategories: Array<ICategory>;
}

export const getCategory = async (): Promise<ICategory[]> => {
  const response = await fetch(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://commerce-fe-teal.vercel.app'}/api/proxy`,
  );
  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const data: ICategory[] = await response.json();
  return data ?? [];
};
