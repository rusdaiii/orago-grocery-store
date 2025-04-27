import { Address } from '@/repositories/user/types';

export type AddressPayload = Omit<Address, 'id'> & {
  addressId?: number;
};
