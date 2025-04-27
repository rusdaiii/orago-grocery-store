import dynamic from 'next/dynamic';

const Checkout = dynamic(() => import('@/components/pages/Checkout'));

import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Checkout' },
  { withSuffix: true }
);

const CheckoutPage = () => {
  return <Checkout />;
};

export default CheckoutPage;
