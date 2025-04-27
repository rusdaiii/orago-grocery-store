/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { combineSearchParams, removeSearchParams } from '@/lib/url';

import OrderHistoryTable from './OrderHistoryTable';

const OrderHistoryComponent = () => {
  const router = useRouter();

  const path = usePathname();

  const searchParams = useSearchParams();

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

  const currentPage = Number(searchParams.get('page')) || 1;

  return (
    <section>
      <OrderHistoryTable
        currentPage={currentPage}
        handleChangePage={handleChangePage}
        pageSize={10}
      />
    </section>
  );
};

export default OrderHistoryComponent;
