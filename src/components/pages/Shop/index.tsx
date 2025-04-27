/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useCallback, useEffect, useMemo } from 'react';

import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const DropdownCategory = dynamic(
  () => import('@/components/parts/Category/DropdownCategory')
);
const ActiveFilter = dynamic(
  () => import('@/components/parts/Filter/ActiveFilter')
);
const LimitSizeProduct = dynamic(
  () => import('@/components/parts/Filter/LimitSizeProduct')
);
const SortPeriod = dynamic(
  () => import('@/components/parts/Filter/SortPeriod')
);
const SortRating = dynamic(
  () => import('@/components/parts/Filter/SortRating')
);
const Pagination = dynamic(() => import('@/components/parts/Pagination'));
import ProductList from '@/components/parts/Product/ProductList';
import { useProducts } from '@/context/useProducts';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

type ProductsCategoryProps = {
  slug?: string;
};

const Shop = ({ slug }: ProductsCategoryProps) => {
  const { products, isLoading, setFilter, page, pageCount } = useProducts();

  const searchParams = useSearchParams();

  const path = usePathname();

  const router = useRouter();

  const defaultFilter = useMemo(
    () => ({
      pagination: {
        page: Number(searchParams.get('page')) || 1,
        pageSize: Number(searchParams.get('limit')) || 12,
      },
      sort: {
        updatedAt: searchParams.get('sort') || 'desc',
      },
      filters: {
        averageRating: {
          $gte: Number(searchParams.get('rating')) || 0,
        },
      },
    }),
    [searchParams]
  );

  useEffect(() => {
    if (slug) {
      setFilter({
        ...defaultFilter,
        filters: {
          ...defaultFilter.filters,
          categories: {
            slug: {
              $eq: slug,
            },
          },
        },
      });
    } else {
      setFilter({
        ...defaultFilter,
        filters: {
          ...defaultFilter.filters,
        },
      });
    }
  }, [slug, searchParams]);

  const handleChangePage = useCallback(
    (page: number) => {
      const newRemovedSearchParams = removeSearchParams(searchParams, ['page']);

      const newSearchParams = combineSearchParams(newRemovedSearchParams, {
        page,
      });

      router.push(`${path}?${newSearchParams}`);
    },
    [path, searchParams]
  );

  return (
    <div>
      <section className="container py-1">
        <div className="flex flex-wrap gap-3 justify-center md:justify-between items-center">
          <div className="flex gap-3 items-center">
            <DropdownCategory />
            <SortRating />
          </div>

          <div className="flex gap-3 items-center">
            <SortPeriod />
            <LimitSizeProduct />
          </div>
        </div>

        <ActiveFilter productCount={products?.length} />

        <ProductList productList={products} isLoadingProduct={isLoading} />
        <Pagination
          page={page}
          pageCount={pageCount}
          changePage={handleChangePage}
          className="pt-10"
        />
      </section>
    </div>
  );
};

export default Shop;
