import fetcher from '@/lib/fetcher';
import { queryGenerator } from '@/lib/queryGenerator';

import { GetSavedProductsResponse, SaveProductPayload } from './type';

export const saveProduct = async (payload: SaveProductPayload) => {
  if (!payload.userId) return;

  const data = {
    product: payload.productId,
    users_permissions_user: +payload.userId,
  };

  const response = await fetcher({
    url: '/saves',
    method: 'POST',
    body: JSON.stringify({ data }),
  });

  return response;
};

export const getSavedProducts = async () => {
  const response = await fetcher<GetSavedProductsResponse>({
    url: `/users/me`,
    query: queryGenerator({
      populate: {
        saves: {
          populate: {
            product: {
              populate: {
                image: '*',
                categories: '*',
              },
            },
          },
        },
      },
    }),
  });

  return response;
};

export const removeSavedProduct = async (id: number | undefined) => {
  if (!id) return null;

  const response = await fetcher({
    url: `/saves/${id}`,
    method: 'DELETE',
  });

  return response;
};
