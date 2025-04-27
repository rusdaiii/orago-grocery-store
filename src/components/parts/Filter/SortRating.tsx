import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';

import RatingStats from '@/components/parts/RatingStats';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const SortRating = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const ratingValue = searchParams.get('rating');

  const handleChangeSort = useCallback(
    (period: number) => {
      const newParamsRemoved = removeSearchParams(searchParams, ['rating']);

      const newSearchParams = combineSearchParams(newParamsRemoved, {
        rating: period,
      });

      router.push(`?${newSearchParams}`);
    },
    [router, searchParams]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="rounded-sm">
        <Button variant="outline" className="flex items-center font-normal">
          <span className="flex items-center gap-0">
            {ratingValue ? (
              <RatingStats rating={Number(ratingValue)} />
            ) : (
              <span className="">Select Rating</span>
            )}
          </span>

          <FaChevronDown className="w-3 h-3 ml-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-sm">
        {Array.from({ length: 5 }, (_, i) => (
          <DropdownMenuItem key={i} onClick={() => handleChangeSort(i + 1)}>
            <span className="flex items-center gap-1">
              <RatingStats rating={i + 1} />
              {i + 1}
              <p className="text-sm font-normal">{i < 4 ? '& up' : 'only'}</p>
            </span>
          </DropdownMenuItem>
        )).reverse()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortRating;
