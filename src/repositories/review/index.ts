import fetcher from '@/lib/fetcher';
import { queryGenerator } from '@/lib/queryGenerator';

import { ProductReviewResponse } from './types';

export const getReviews = async (productId: number, limitNumber: number) => {
  const response = await fetcher<ProductReviewResponse>({
    url: '/ratings',
    query: queryGenerator({
      filters: {
        product: {
          id: productId,
        },
      },
      populate: {
        users_permissions_user: {
          fields: 'fullName',
        },
      },
      pagination: {
        start: 0,
        limit: limitNumber,
      },
    }),
  });

  return response;
};
