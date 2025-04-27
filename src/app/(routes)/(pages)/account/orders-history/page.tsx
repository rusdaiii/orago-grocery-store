import dynamic from 'next/dynamic';

const OrderHistory = dynamic(() => import('@/components/pages/OrderHistory'));

import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Order History' },
  { withSuffix: true }
);

const OrderHistoryPage = () => {
  return <OrderHistory />;
};

export default OrderHistoryPage;
