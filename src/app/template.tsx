import React, { Suspense } from 'react';

import Loader from '@/components/parts/Loader';
import Nprogress from '@/components/parts/Nprogress';

const Template: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Nprogress />

      {children}
    </Suspense>
  );
};

export default Template;
