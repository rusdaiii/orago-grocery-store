'use client';
import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { MdClear } from 'react-icons/md';
import { RiLoader5Fill } from 'react-icons/ri';
import { useDebounce } from 'use-debounce';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useGetSearchProducts } from '@/query/products';

import SearchResult from './SearchResult';

type SearchbarProps = {
  className?: string;
};

const recommendedSearches = [
  'Steak',
  'Chicken',
  'Pasta',
  'Raw',
  'Meat',
  'Salmon',
];

const Searchbar = ({ className }: SearchbarProps) => {
  const [focus, setFocus] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      search: '',
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (focus && !(event?.target as Element)?.closest('form')) {
        setFocus(false);
      }
    };

    if (focus) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [focus]);

  const [debounceSearch] = useDebounce(searchValue, 500);

  const { data: products, isPending } = useGetSearchProducts(debounceSearch);

  const shouldShowSearchResult = focus && debounceSearch.length > 0;

  const handleClearSearch = useCallback(() => {
    reset({ search: '' });
    setSearchValue('');
  }, [reset]);

  return (
    <div className={cn('relative w-full', className)}>
      <form
        onChange={handleSubmit((data) => setSearchValue(data.search))}
        onClick={() => setFocus(true)}
      >
        <Input
          className="pl-9"
          placeholder="Search..."
          value={searchValue}
          autoComplete="off"
          {...register('search')}
        />
        {shouldShowSearchResult && !isPending ? (
          <Button
            size="icon"
            variant="ghost"
            type="button"
            onClick={handleClearSearch}
            className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
          >
            <MdClear />
          </Button>
        ) : null}
        <FiSearch className="absolute left-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />

        {shouldShowSearchResult && isPending ? (
          <RiLoader5Fill className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground animate-spin" />
        ) : null}

        {shouldShowSearchResult ? (
          <SearchResult
            isFetchingProducts={isPending}
            products={products?.data}
          />
        ) : focus ? (
          <div className="absolute grid w-full z-50 mt-2">
            <div className="grid bg-white shadow-md ">
              <span className="flex justify-between p-3">
                <h2 className="uppercase font-medium">recommended for you</h2>
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
                {recommendedSearches.map((search) => (
                  <span key={search} className="">
                    <Button
                      variant="ghost"
                      type="button"
                      className="text-lg text-start  flex items-center gap-3"
                      onClick={() => setSearchValue(search)}
                    >
                      <FiSearch className="h-4 w-4 text-muted-foreground" />
                      {search}
                    </Button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Searchbar;
