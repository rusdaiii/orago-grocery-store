import { FaArrowRightLong } from 'react-icons/fa6';

import { Link } from '@/components/parts/Link';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/repositories/products/types';

import CardProduct from './CardProduct';

type CarouselProductProps = {
  productList: Product[];
  title: string;
  type?: 'HomePage' | 'ProductPage';
};
const CarouselProduct = ({
  productList,
  title,
  type = 'HomePage',
}: CarouselProductProps) => {
  if (productList?.length === 0 && type === 'HomePage') {
    return (
      <div className="mt-5 w-full flex justify-center items-center min-h-[400px]">
        <h2 className="text-green-600 font-bold text-2xl">No Products Found</h2>
      </div>
    );
  } else if (productList?.length === 0 && type === 'ProductPage') return null;

  let productUrl;

  if (title === 'Popular Products') {
    productUrl = '/?rating=4';
  } else if (title === 'Best Selling Products') {
    productUrl = '';
  }

  return (
    <section className="mt-5 container">
      <div
        className={`flex flex-row py-8 items-center ${
          type === 'HomePage' ? 'justify-between' : 'justify-center'
        } `}
      >
        <h2 className="font-semibold text-2xl md:text-4xl ">{title}</h2>

        {type === 'HomePage' && (
          <Link
            href={`/shop/${productUrl}`}
            className="flex items-center"
            type="button"
          >
            <h3 className="text-sm text-primary">View all</h3>
            <FaArrowRightLong className="ml-2 h-4 w-4 text-primary" />
          </Link>
        )}
      </div>

      <Carousel opts={{ loop: true, align: 'start' }}>
        <CarouselContent>
          {productList?.map((product, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 lg:basis-1/4 py-5"
            >
              <CardProduct product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden 2xl:flex" />
        <CarouselNext className="hidden 2xl:flex" />
        <CarouselDots className="pt-5" />
      </Carousel>
    </section>
  );
};

export default CarouselProduct;
