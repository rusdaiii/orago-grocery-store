import { MetaLimit } from '@/types/pagination';
import { SuccessResponseData } from '@/types/response';

export type Ratings = {
  id: number;
  attributes: {
    value: number;
    comment: string;
    createdAt: string;
    users_permissions_user: {
      data: {
        id: number;
        attributes: {
          fullName: string;
        };
      };
    };
  };
};

export type ProductReviewResponse = SuccessResponseData<Ratings[]> & {
  meta: MetaLimit;
};
