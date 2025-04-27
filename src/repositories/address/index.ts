import fetcher from '@/lib/fetcher';

import { AddressPayload } from './types';

export const addAddress = async (payload: AddressPayload) => {
  const response = await fetcher({
    url: '/addresses',
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response;
};
