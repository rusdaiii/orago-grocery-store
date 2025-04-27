import fetcher from '@/lib/fetcher';
import { queryGenerator } from '@/lib/queryGenerator';

import {
  CartPayload,
  FindCartItemResponse,
  GetCartItemsResponse,
  UpdateCartPayload,
} from './types';

export const addToCart = async (payload: CartPayload) => {
  const data = {
    quantity: payload.quantity,
    amount: payload.amount,
    product: payload.productId,
    productId: payload.productId,
    userId: +payload.userId,
    users_permissions_user: +payload.userId,
  };

  const userItem = await findCartItem(payload.userId, payload.productId);

  if (userItem) {
    const updatedCartData = {
      cartId: userItem.id,
      quantity: userItem.attributes.quantity + payload.quantity,
      amount: userItem.attributes.amount + payload.amount,
    };

    return await updateCart(updatedCartData);
  }

  const response = await fetcher({
    url: '/user-carts',
    method: 'POST',
    body: JSON.stringify({ data }),
  });

  return response;
};

export const findCartItem = async (userId: number, productId: number) => {
  if (!userId) return null;

  const response = await fetcher<FindCartItemResponse>({
    url: `/user-carts`,
    query: `filters[userId][$eq]=${userId}
    &filters[productId][$eq]=${productId}`,
  });

  const cartItem = response.data[0];

  return cartItem;
};

export const updateCart = async (payload: UpdateCartPayload) => {
  const data = {
    quantity: payload.quantity,
    amount: payload.amount,
  };

  const response = await fetcher({
    url: `/user-carts/${payload.cartId}`,
    method: 'PUT',
    body: JSON.stringify({ data }),
  });
  return response;
};

export const getCartItems = async (userId: number | undefined) => {
  if (!userId) return [];

  const response = await fetcher<GetCartItemsResponse>({
    url: `/user-carts`,
    query: queryGenerator({
      filters: {
        userId: {
          $eq: userId,
        },
      },
      populate: {
        product: {
          populate: {
            image: {
              fields: ['formats'],
            },
          },
        },
      },
      sort: {
        createdAt: 'desc',
      },
    }),
  });

  const itemCartList = response.data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.product.data.attributes.name,
      slug: item.attributes.product.data.attributes.slug,
      quantity: item.attributes.quantity,
      amount: item.attributes.amount,
      product: item.attributes.product.data.id,
      sellingPrice: item.attributes.product.data.attributes.sellingPrice,
      actualPrice: +item.attributes.product.data.attributes.mrp,
      image:
        item.attributes.product.data.attributes.image.data[0].attributes.formats
          .thumbnail.url,
    };
  });

  return itemCartList;
};

export const removeCartItem = async (cartId: number) => {
  const response = await fetcher({
    url: `/user-carts/${cartId}`,
    method: 'DELETE',
  });

  return response;
};
