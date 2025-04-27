// eslint-disable-next-line import-alias/import-alias
import { User } from '../auth/types';

export type Address = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
};

export type successGetUserInfoResponse = User & {
  fullName: string;
  phone: string;
  address: Address;
};

export type UpdateUserInformationPayload = {
  id: number;
  fullName: string;
  phone: string;
};

export type UpdateUserAvatarPayload = {
  id: number;
  image: string;
};
