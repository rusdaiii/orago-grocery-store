import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';

import { toast } from '@/components/ui/use-toast';

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME,
    },
    mutations: {
      onError: (error: any) => {
        /** You can use toast or notification here */

        toast({
          title: 'Error',
          description: error.error.message,
          variant: 'destructive',
        });
      },
    },
  },
};

export const getQueryClient = cache(() => new QueryClient(queryClientConfig));
