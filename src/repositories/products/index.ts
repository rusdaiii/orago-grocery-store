import { FilterType } from '@/context/types';
import fetcher from '@/lib/fetcher';
import { queryGenerator } from '@/lib/queryGenerator';

import { getProductDetailResponse, getProductsResponse } from './types';

export const getProducts = async (filters?: FilterType) => {
  const response = await fetcher<getProductsResponse>({
    url: `/products`,

    query: queryGenerator({
      ...filters,
      populate: {
        ratings: '*',
      },
    }),
  });

  return response;
};

export const getProductDetail = async (slug: string) => {
  const response = await fetcher<getProductDetailResponse>({
    url: `/products`,
    query: queryGenerator({
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        ratings: '*',
      },
    }),
  });

  return response;
};

export const getSearchProducts = async (payload: string) => {
  const response = await fetcher<getProductsResponse>({
    url: `/products`,
    query: queryGenerator({
      filters: {
        name: {
          $containsi: payload,
        },
      },
      populate: {
        ratings: '*',
      },
    }),
  });

  return response;
};

export const getRelatedProducts = async (category: string) => {
  const response = await fetcher<getProductsResponse>({
    url: `/products`,
    query: queryGenerator({
      filters: {
        categories: {
          slug: {
            $eq: category,
          },
        },
      },
      pagination: {
        start: 0,
        limit: 5,
      },
      populate: {
        ratings: '*',
      },
    }),
  });

  return response;
};

export const getHotDealsProducts = async () => {
  const response = await fetcher<getProductsResponse>({
    url: `/products`,
    query: queryGenerator({
      filters: {
        sellingPrice: {
          $gt: 0,
        },
      },
      sort: {
        sellingPrice: 'desc',
      },
      populate: {
        ratings: '*',
      },
    }),
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  const result = response.data
    .filter((item) => {
      const higherDiscount =
        ((item.attributes.mrp - item.attributes.sellingPrice) /
          item.attributes.mrp) *
        100;

      return higherDiscount >= 25;
    })
    .sort((low, high) => high.attributes.mrp - low.attributes.mrp)
    .slice(0, 3);

  return result;
};

export const getBestRatingProducts = async () => {
  const response = await fetcher<getProductsResponse>({
    url: `/products`,
    query: queryGenerator({
      filters: {
        averageRating: {
          $gt: 3,
        },
      },
      pagination: {
        start: 0,
        limit: 5,
      },
      sort: {
        averageRating: 'desc',
      },
      populate: {
        ratings: '*',
      },
    }),
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  return response.data;
};

export const getBestSellerProducts = async () => {
  const response = await fetcher<getProductsResponse>({
    url: `/products`,
    query: queryGenerator({
      sort: {
        totalSelling: 'desc',
      },
      pagination: {
        start: 0,
        limit: 5,
      },
      populate: {
        ratings: '*',
      },
    }),
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  return response.data;
};
