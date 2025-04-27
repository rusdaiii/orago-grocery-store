import { Image } from '@/types/image';
import { SuccessResponseData } from '@/types/response';

// eslint-disable-next-line import-alias/import-alias
import { Product } from '../products/types';

export type Categories = {
  id: number;
  attributes: {
    name: string;
    color: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    icon: Image;
    products: {
      data: Product[];
    };
  };
};

export type getCategoriesResponse = SuccessResponseData<Categories[]>;
