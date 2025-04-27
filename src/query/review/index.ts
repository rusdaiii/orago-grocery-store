import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getReviews } from '@/repositories/review';

export const getReviewKey = (limit: number) => ['review', limit];

export const useGetReview = (productId: number, limit: number) => {
  const result = useQuery({
    queryKey: getReviewKey(limit),
    queryFn: () => getReviews(productId, limit),
    placeholderData: keepPreviousData,
  });

  return result;
};
