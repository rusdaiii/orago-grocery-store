import { useQuery } from '@tanstack/react-query';

import { getSearchProducts } from '@/repositories/products';

export const getProductsKey = () => ['products'];

export const useGetSearchProducts = (payload: string) => {
  const result = useQuery({
    queryKey: [payload],
    queryFn: () => getSearchProducts(payload),
    enabled: !!payload,
  });

  return result;
};
