import { getUser } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

export function useUser(token: boolean) {
  const { data: user, refetch: userRefetch } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: token,
  });

  return { user, userRefetch };
}
