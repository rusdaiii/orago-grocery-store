export type FilterType = {
  pagination?: {
    pageSize?: number;
    page?: number;
    pageCount?: number;
  };
  sort?: {
    updatedAt: string;
  };
  filters?: {
    name?: {
      $containsi: string;
    };
    slug?: {
      $eq?: string;
    };
    categories?: {
      slug: {
        $eq: string;
      };
    };
    averageRating?: {
      $gte: number;
    };
  };
};
