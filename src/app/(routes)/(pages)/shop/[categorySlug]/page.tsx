const Shop = dynamic(() => import('@/components/pages/Shop'));

import dynamic from 'next/dynamic';

import generateMetadata from '@/lib/metadata';

type Params = {
  params: {
    categorySlug: string;
  };
};

export const metadata = generateMetadata(
  { title: 'Categories' },
  { withSuffix: true }
);

const ProductsCategoryPage = async ({ params }: Params) => {
  const { categorySlug } = params;

  return <Shop slug={categorySlug} />;
};

export default ProductsCategoryPage;
