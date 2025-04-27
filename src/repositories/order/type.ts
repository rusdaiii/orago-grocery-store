import { Meta } from '@/types/pagination';
import { SuccessResponseData } from '@/types/response';

type OrderItemPayload = {
  productName: string;
  quantity: number;
  price: number;
  product: number;
  image: string;
  slug: string;
};

export type OrderPayload = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  totalOrderAmount: number | undefined;
  userId: number;
  orderItemList: OrderItemPayload[];
};

export type UpdateOrderPayload = {
  orderId: number;
  status: string;
  paymentMethod?: string;
};

export type CreateOrderResponse = {
  orderId: number;
  id: number;
  token: string;
  redirect_url: string;
};

export type GetOrder = {
  id: number;
  attributes: Omit<OrderPayload, 'userId' | 'orderItemList'> & {
    paymentStatus: string;
    paymentMethod: string;
    orderStatus: string;
    createdAt: string;
    updatedAt: string;
    orderItemList: Omit<OrderItemPayload, 'product'>[];
    payment: {
      data: {
        id: number;
        attributes: {
          token: string;
          paymentMethod: string;
          redirect_url: string;
        };
      };
    };
  };
};

export type GetOrdersResponse = SuccessResponseData<GetOrder[]> & {
  meta: Meta;
};

export type GetOrderDetailsResponse = SuccessResponseData<GetOrder>;

export type UpdateOrderResponse = CreateOrderResponse;
