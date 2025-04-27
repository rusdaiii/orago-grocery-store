/* eslint-disable import-alias/import-alias */

import { ProductImage } from '@/types/image';

import { User } from '../auth/types';
import { Product } from '../products/types';

export type SaveProductPayload = {
  userId: number | undefined;
  productId: number;
};

export type SavedProduct = {
  id: number;
  product: Omit<Product['attributes'], 'id'> & {
    id: number;
    image: [ProductImage['data'][0]['attributes']];
    categories: {
      id: number;
      name: string;
      slug: string;
    }[];
  };
};

export interface GetSavedProductsResponse extends User {
  saves: SavedProduct[];
}
