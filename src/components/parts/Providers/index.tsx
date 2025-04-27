'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';

import { ProductsProvider } from '@/context/useProducts';
import { queryClientConfig } from '@/lib/queryClient';

const Providers = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ProductsProvider>{children}</ProductsProvider>

        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
