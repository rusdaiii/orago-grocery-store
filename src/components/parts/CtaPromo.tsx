import { FaArrowRightLong } from 'react-icons/fa6';

import { Link } from '@/components/parts/Link';
import { Button } from '@/components/ui/button';

const CtaPromo = () => {
  return (
    <div
      className="relative flex justify-center overflow-hidden w-full h-full rounded-xl
      md:col-span-3 lg:col-auto"
    >
      <div
        className='absolute w-full h-full bg-[url("/images/highlight-promo.webp")] 
        transform bg-center lg:bg-left lg:scale-150 bg-cover'
      />
      <div className="z-10 py-5 px-10 text-center">
        <h1 className="uppercase text-base">Hot Sale</h1>
        <h2 className="text-3xl">
          <b>Save 30%</b> on Every Order
        </h2>
        <Link href="/shop">
          <Button className="mt-3 rounded-full bg-white text-primary hover:text-white px-5">
            Shop Now
            <FaArrowRightLong className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CtaPromo;
