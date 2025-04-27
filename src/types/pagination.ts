export type Meta = {
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
};

export type MetaLimit = {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
};
