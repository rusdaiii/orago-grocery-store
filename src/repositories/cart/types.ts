// eslint-disable-next-line import-alias/import-alias
import { Product } from '../products/types';

export type CartPayload = {
  quantity: number;
  amount: number;
  productId: number;
  userId: number;
  users_permissions_user?: number;
};

export type UpdateCartPayload = {
  cartId: number;
  quantity: number;
  amount: number;
};

export type CartItems = {
  id: number;
  attributes: {
    quantity: number;
    amount: number;
    product: {
      data: Product;
    };
  };
};

export type CartItem = {
  id: number;
  attributes: {
    quantity: number;
    amount: number;
    userId: number;
    productId: number;
    product: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
  };
};

export type GetCartItemsResponse = {
  data: CartItems[];
};

export type FindCartItemResponse = {
  data: CartItem[];
};
