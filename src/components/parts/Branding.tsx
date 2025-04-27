import Image from 'next/image';
import { FaArrowRightLong, FaCheck } from 'react-icons/fa6';

import { Link } from '@/components/parts/Link';
import { Button } from '@/components/ui/button';

const brandingData = [
  {
    title: 'Healthy & natural food for lovers of healthy food.',
    description: `Indulge in healthy and natural foods that tantalize your taste buds. 
    Crafted with select natural ingredients, our food is not only delicious but also nourishing. 
    Experience true freshness and flavor, as health is our top priority.`,
  },
  {
    title: 'Every day fresh and quality products for you.',
    description: `Every day, we serve fresh and quality products just for you. 
    Made with care and to high cleanliness standards, we ensure that every product you purchase is the finest. 
    Feel the difference with our fresh and high-quality products every day.`,
  },
];

const Branding = () => {
  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <Image
            src="/images/branding.webp"
            alt="branding"
            width={400}
            height={400}
            className="md:w-10/12 lg:w-full rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-3xl md:text-4xl text-center lg:text-start font-semibold py-4">
            100% Trusted <br className="hidden lg:block" /> Organic Food Store
          </h1>

          {brandingData.map((item, index) => (
            <div key={index} className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <span className="bg-primary rounded-full p-1 text-white">
                  <FaCheck />
                </span>

                <span className="flex flex-col gap-2">
                  <h2 className="flex text-base md:text-lg font-medium">
                    {item.title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500">
                    {item.description}
                  </p>
                </span>
              </div>
            </div>
          ))}

          <Link href="/shop" className="flex justify-center lg:justify-start">
            <Button className="w-full md:w-1/2 lg:w-fit flex items-center rounded-full py-6 px-7">
              Shop Now
              <FaArrowRightLong className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Branding;
