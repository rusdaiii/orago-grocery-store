import { useQuery } from '@tanstack/react-query';

import { getCartItems } from '@/repositories/cart';

export const getCartKey = () => ['cart-items'];

export const useGetCartItems = (userId: number | undefined) => {
  const result = useQuery({
    queryKey: getCartKey(),
    queryFn: () => getCartItems(userId),
  });

  return result;
};
