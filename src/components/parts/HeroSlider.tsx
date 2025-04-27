'use client';
import { useRef } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';

import { Link } from '@/components/parts/Link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';
import { Slider } from '@/repositories/slider/types';

type SliderProps = {
  sliderList: Slider[];
};

const HeroSlider = ({ sliderList }: SliderProps) => {
  const plugin = useRef(
    Autoplay({
      delay: 10000,
      stopOnInteraction: false,
      stopOnFocusIn: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section className="bg-green-gray-50">
      <Carousel plugins={[plugin.current]} opts={{ loop: true }}>
        <CarouselContent className="">
          {sliderList.map((slider, index) => {
            return (
              <CarouselItem key={index}>
                <section className="py-10 sm:py-10 lg:py-16">
                  <div className="px-4 container sm:px-6 lg:px-8">
                    <div className="grid items-center grid-cols-1 gap-15 lg:grid-cols-2">
                      <div>
                        <h2 className="uppercase text-center lg:text-left text-primary text-sm">
                          Welcome to Grocery Store
                        </h2>
                        <h1
                          className="mt-2 text-3xl text-center lg:text-left font-bold 
                        text-black sm:text-4xl lg:text-5xl xl:text-6xl"
                        >
                          {slider.attributes.campaignName}
                        </h1>

                        <p className="mt-8 text-center lg:text-left text-base sm:text-xl text-warning">
                          {slider.attributes.description}
                        </p>
                        <p className="mt-2 text-sm text-gray-400 text-center lg:text-left">
                          Free shipping on all your order, we deliver, you enjoy
                        </p>

                        <div className="mt-10 flex justify-center items-center lg:justify-start sm:space-x-8">
                          <Link href={slider.attributes.url}>
                            <Button className="px-10 rounded-full" size="lg">
                              Shop Now
                              <FaArrowRightLong className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="mt-7 lg:h-[400px]">
                        <Image
                          className="w-2/3 mx-auto md:w-1/2 lg:w-full"
                          src={slider.attributes.image.data.attributes.url}
                          width={300}
                          height={300}
                          loading="lazy"
                          alt={slider.attributes.campaignName}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselDots className="py-5" />
      </Carousel>
    </section>
  );
};

export default HeroSlider;
