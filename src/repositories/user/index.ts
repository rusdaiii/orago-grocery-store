import fetcher from '@/lib/fetcher';
import { queryGenerator } from '@/lib/queryGenerator';

import {
  UpdateUserAvatarPayload,
  UpdateUserInformationPayload,
  successGetUserInfoResponse,
} from './types';

export const getUserInformation = async () => {
  const response = fetcher<successGetUserInfoResponse>({
    url: '/users/me',
    query: queryGenerator({
      populate: {
        address: '*',
      },
    }),
  });

  return response;
};

export const updateUserInformation = async (
  payload: UpdateUserInformationPayload
) => {
  const response = fetcher({
    url: `/users/${payload.id}`,
    method: 'PUT',
    body: JSON.stringify({
      fullName: payload.fullName,
      phone: payload.phone,
    }),
  });

  return response;
};

export const updateUserAvatar = async (payload: UpdateUserAvatarPayload) => {
  const response = fetcher<successGetUserInfoResponse>({
    url: `/users/${payload.id}`,
    method: 'PUT',
    body: JSON.stringify({
      image: payload.image,
    }),
  });
  return response;
};
