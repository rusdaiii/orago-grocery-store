import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const CheckoutComplete = dynamic(
  () => import('@/components/pages/Checkout/Complete')
);

import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Checkout Complete' },
  { withSuffix: true }
);

const CompleteCheckoutPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (!searchParams.order_id && !searchParams.token) {
    return redirect('/');
  }
  return <CheckoutComplete />;
};

export default CompleteCheckoutPage;
