import { BlocksContent } from '@strapi/blocks-react-renderer';

import { Categories } from '@/repositories/categories/types';
import { Ratings } from '@/repositories/review/types';
import { ProductImage } from '@/types/image';
import { Meta } from '@/types/pagination';
import { SuccessResponseData } from '@/types/response';

export type Product = {
  id: number;
  attributes: {
    name: string;
    description: string;
    mrp: number;
    sellingPrice: number;
    itemQuantityType: string;
    averageRating: number;
    totalSelling: number;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: ProductImage;
    type: string;
    color: string;
    additionalDescription: BlocksContent;
    categories: {
      data: Categories[];
    };
    ratings: {
      data: Ratings[];
    };
  };
};

export type getProductsResponse = SuccessResponseData<Product[]> & {
  meta: Meta;
};

export type getProductDetailResponse = SuccessResponseData<Product[]>;
