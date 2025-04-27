export type Image = {
  data: {
    id: number;
    attributes: {
      name: string;
      url: string;
    };
  };
};

export type ProductImage = {
  data: {
    id: number;
    attributes: {
      name: string;
      url: string;
      formats: {
        thumbnail: {
          url: string;
        };
      };
    };
  }[];
};
