import { Image } from '@/types/image';
import { SuccessResponseData } from '@/types/response';

export type Slider = {
  id: number;
  attributes: {
    campaignName: string;
    description: string;
    url: string;
    type: string;
    image: Image;
  };
};

export type getSliderResponse = SuccessResponseData<Slider[]>;
