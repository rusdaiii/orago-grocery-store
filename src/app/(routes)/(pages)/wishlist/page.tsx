const Wishlist = dynamic(() => import('@/components/pages/Wishlist'));

import dynamic from 'next/dynamic';

import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Wishlist' },
  { withSuffix: true }
);

const WishlistPage = () => {
  return <Wishlist />;
};

export default WishlistPage;
