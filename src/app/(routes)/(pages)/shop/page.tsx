const Shop = dynamic(() => import('@/components/pages/Shop'));

import dynamic from 'next/dynamic';

import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Shop' },
  { withSuffix: true }
);

const ShopPage = () => {
  return <Shop />;
};

export default ShopPage;
