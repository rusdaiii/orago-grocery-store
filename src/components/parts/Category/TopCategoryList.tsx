import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';

import { Link } from '@/components/parts/Link';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Categories } from '@/repositories/categories/types';

type CategoryListProps = {
  categoryList: Categories[];
};
const CategoryList = ({ categoryList }: CategoryListProps) => {
  return (
    <div className="mt-5 container">
      <div className="flex items-center justify-between py-8">
        <h2 className="font-semibold text-xl md:text-4xl ">
          Shop by Top Categories
        </h2>
        <Link href="/shop" className="flex items-center" type="button">
          <h3 className="text-sm text-primary">View all</h3>
          <FaArrowRightLong className="ml-2 h-4 w-4 text-primary" />
        </Link>
      </div>

      <Carousel opts={{ loop: true, align: 'start' }}>
        <CarouselContent>
          {categoryList
            ?.sort(
              (low, high) =>
                high.attributes.products.data.length -
                low.attributes.products.data.length
            )
            .map((category, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 py-5"
              >
                <Card
                  className="group hover:border-primary 
                transition-colors ease-in-out duration-300 rounded-md cursor-pointer"
                >
                  <Link href={`/shop/${category.attributes.slug}`}>
                    <CardContent className="flex flex-col gap-10 items-center p-7 group ">
                      <Image
                        src={category.attributes.icon.data.attributes.url}
                        alt="category"
                        width={100}
                        height={100}
                        className="group-hover:scale-110 transition-all ease-in-out duration-300 w-auto h-16"
                      />
                      <div className="flex flex-col gap-2">
                        <h2
                          className="text-sm md:text-base text-center font-semibold
                        group-hover:text-primary transition-colors ease-in-out duration-300"
                        >
                          {category.attributes.name}
                        </h2>
                        <h3 className="text-sm text-gray-500 text-center">
                          {category.attributes.products.data.length} Products
                        </h3>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="hidden 2xl:flex" />
        <CarouselNext className="hidden 2xl:flex" />
        <CarouselDots className="pt-5" />
      </Carousel>
    </div>
  );
};

export default CategoryList;
