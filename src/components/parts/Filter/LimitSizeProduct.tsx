import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const LimitSizeProduct = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const values = [12, 16, 20];

  const handleLimitSize = useCallback(
    (limit: number) => {
      const newParamsRemoved = removeSearchParams(searchParams, ['limit']);

      let newSearchParams = newParamsRemoved;

      if (limit > 0) {
        newSearchParams = combineSearchParams(newSearchParams, {
          limit,
        });
      }

      router.push(`?${newSearchParams}`);
    },
    [router, searchParams]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="rounded-sm">
        <Button variant="outline" className="flex items-center font-normal">
          <h2>
            Show:{' '}
            <span className="capitalize">
              {searchParams.get('limit') || 12}
            </span>
          </h2>

          <FaChevronDown className="w-3 h-3 ml-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-sm">
        {values.map((value, index) => (
          <DropdownMenuItem key={index} onClick={() => handleLimitSize(value)}>
            <h2>Show: {value}</h2>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LimitSizeProduct;
