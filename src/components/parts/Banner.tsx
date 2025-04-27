/* eslint-disable no-unused-vars */
'use client';
import { FaArrowRightLong } from 'react-icons/fa6';

import { Link } from '@/components/parts/Link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import formatCurrency from '@/lib/currencyFormat';
import { cn } from '@/lib/utils';

type BannerProps = {
  title: string;
  campaign: string;
  price?: number;
  cta: string;
  className?: string;
  imageurl?: string;
  campaignDuration?: number;
};

const Banner = ({
  title,
  campaign,
  price,
  cta,
  className,
  imageurl,
  campaignDuration,
}: BannerProps) => {
  return (
    <div
      className={cn(
        'flex items-center rounded-xl bg-cover h-[300px]',
        className || imageurl
      )}
    >
      <div className="flex items-center bg-black bg-opacity-40 w-full h-full rounded-xl">
        <div className="flex flex-col gap-4 p-10">
          <span className="flex flex-col gap-1">
            <h1 className="font-medium text-white uppercase">{title}</h1>
            <h2 className="text-3xl font-semibold text-white">{campaign}</h2>
          </span>
          {price && (
            <span className="flex items-center gap-2">
              <h3 className="text-sm text-gray-100">Starting At:</h3>
              <Badge className="bg-warning">{formatCurrency(price)}</Badge>
            </span>
          )}

          {cta && (
            <Link href={cta}>
              <Button className="w-fit rounded-full">
                Shop Now
                <FaArrowRightLong className="ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
