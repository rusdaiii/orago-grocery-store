import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const CheckoutSuccess = dynamic(
  () => import('@/components/pages/Checkout/Success')
);

import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Checkout Success' },
  { withSuffix: true }
);

const CheckoutSuccesPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (!searchParams.order_id && !searchParams.token) {
    return redirect('/');
  }

  return <CheckoutSuccess />;
};

export default CheckoutSuccesPage;
