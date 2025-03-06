import { getUser } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return { user };
}
