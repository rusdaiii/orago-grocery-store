import { useQuery } from '@tanstack/react-query';

import { getUserInformation } from '@/repositories/user';

export const getUserInformationKey = () => ['user/me'];

export const useGetUserInformation = () => {
  const result = useQuery({
    queryKey: getUserInformationKey(),
    queryFn: getUserInformation,
  });

  return result;
};
