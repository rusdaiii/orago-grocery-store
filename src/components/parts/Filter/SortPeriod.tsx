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

const SortPeriod = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const sortName = searchParams.get('sort');

  const handleChangeSort = useCallback(
    (period: string) => {
      const newParamsRemoved = removeSearchParams(searchParams, ['sort']);

      const newSearchParams = combineSearchParams(newParamsRemoved, {
        sort: period,
      });

      router.push(`?${newSearchParams}`);
    },
    [router, searchParams]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="rounded-sm">
        <Button variant="outline" className="flex items-center font-normal">
          <h2>
            Sort by:{' '}
            <span className="capitalize">
              {sortName === 'desc'
                ? 'Latest'
                : sortName === 'asc'
                ? 'Oldest'
                : 'Latest'}
            </span>
          </h2>

          <FaChevronDown className="w-3 h-3 ml-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-sm">
        <DropdownMenuItem onClick={() => handleChangeSort('desc')}>
          Latest
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeSort('asc')}>
          Oldest
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortPeriod;
