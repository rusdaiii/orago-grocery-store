import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getOrderDetails, getOrders } from '@/repositories/order';

export const getOrdersKey = (
  userId: number | undefined,
  page: number,
  pageSize: number | undefined
) => ['orders', { userId }, { page }, { pageSize }];

export const getOrderDetailsKey = (orderId: number) => [
  'order details',
  { orderId },
];

export const useGetOrders = (
  userId: number | undefined,
  page: number,
  pageSize: number | undefined
) => {
  const result = useQuery({
    queryKey: getOrdersKey(userId, page, pageSize),
    queryFn: () => getOrders(userId, page, pageSize),
    placeholderData: keepPreviousData,
  });

  return result;
};

export const useGetOrderDetails = (orderId: number) => {
  const result = useQuery({
    queryKey: getOrderDetailsKey(orderId),
    queryFn: () => getOrderDetails(orderId),
  });

  return result;
};
