import fetcher from '@/lib/fetcher';

import { getSliderResponse } from './types';

export const getSlider = async () => {
  const response = await fetcher<getSliderResponse>({
    url: '/sliders',
    query: 'populate=*',
    next: {
      revalidate: 60 * 60 * 24 * 7,
    },
  });

  return response;
};
