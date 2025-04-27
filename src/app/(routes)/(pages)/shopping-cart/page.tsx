import dynamic from 'next/dynamic';

const ShoppingCart = dynamic(() => import('@/components/pages/ShoppingCart'));

import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Shopping Cart' },
  { withSuffix: true }
);

const ShoppingCartPage = () => {
  return <ShoppingCart />;
};

export default ShoppingCartPage;
