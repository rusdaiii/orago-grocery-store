import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { MdClear } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import { removeSearchParams } from '@/lib/url';

const ActiveFilter = ({
  productCount,
}: {
  productCount: number | undefined;
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const query = searchParams.toString();

  const handleRemoveFilter = useCallback(
    (key: string | number) => {
      const newParamsRemoved = removeSearchParams(searchParams, [key]);

      router.push(`?${newParamsRemoved}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex justify-center sm:justify-between border-t border-b border-gray-200 mt-5 py-2">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <h2 className="text-sm text-gray-500 font-normal mr-5">
          Active Filters:
        </h2>
        {query && (
          <div className="flex items-center gap-2">
            {query.split('&').map((item, index) => {
              const [key, value] = item.split('=');
              if (key === 'page') return null;
              return (
                <div key={index} className="flex items-center gap-1">
                  <span className="text-sm font-medium capitalize">{key}:</span>
                  <span className="text-sm font-medium">{value}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-3 h-3"
                    onClick={() => handleRemoveFilter(key)}
                  >
                    <MdClear />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="sm:flex hidden gap-1 items-center">
        <h2 className="text-sm font-semibold">{productCount}</h2>
        <span className="text-sm text-gray-500 font-normal">Results found</span>
      </div>
    </div>
  );
};

export default ActiveFilter;
