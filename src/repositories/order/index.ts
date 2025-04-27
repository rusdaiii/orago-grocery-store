import fetcher from '@/lib/fetcher';
import { queryGenerator } from '@/lib/queryGenerator';

import {
  OrderPayload,
  CreateOrderResponse,
  UpdateOrderResponse,
  GetOrdersResponse,
  GetOrderDetailsResponse,
  UpdateOrderPayload,
} from './type';

export const createOrder = async (payload: OrderPayload) => {
  const data = {
    ...payload,
  };

  const response = await fetcher<CreateOrderResponse>({
    url: '/orders',
    method: 'POST',
    body: JSON.stringify({ data }),
  });

  return response;
};

export const getOrders = async (
  userId: number | undefined,
  page: number,
  pageSize: number | undefined
) => {
  if (!userId) return null;

  const response = await fetcher<GetOrdersResponse>({
    url: '/orders',
    query: queryGenerator({
      filters: {
        userId: +userId!,
      },
      populate: {
        orderItemList: '*',
        payment: '*',
      },
      pagination: {
        pageSize,
        page,
      },
      sort: {
        createdAt: 'desc',
      },
    }),
  });

  return response;
};

export const updateOrder = async (payload: UpdateOrderPayload) => {
  const data = {
    paymentStatus: payload.status,
    paymentMethod: payload.paymentMethod,
  };

  const response = await fetcher<UpdateOrderResponse>({
    url: `/orders/${payload.orderId}`,
    method: 'PUT',
    body: JSON.stringify({ data }),
  });

  return response;
};

export const getOrderDetails = async (orderId: number) => {
  const response = await fetcher<GetOrderDetailsResponse>({
    url: `/orders/${orderId}`,
    query: queryGenerator({
      populate: {
        orderItemList: '*',
        payment: '*',
      },
    }),
  });

  return response;
};
