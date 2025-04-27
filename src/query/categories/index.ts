import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/repositories/categories';

export const getProjectKey = () => ['categories'];

export const useGetCategories = () => {
  const result = useQuery({
    queryKey: getProjectKey(),
    queryFn: () => getCategories(),
  });

  return result;
};
