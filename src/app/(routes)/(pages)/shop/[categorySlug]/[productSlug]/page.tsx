import dynamic from 'next/dynamic';

const ProductDetails = dynamic(
  () => import('@/components/pages/ProductDetails')
);

type Params = {
  params: {
    productSlug: string;
  };
};

const ProductDetailsPage = ({ params }: Params) => {
  const { productSlug } = params;

  return <ProductDetails productSlug={productSlug} />;
};

export default ProductDetailsPage;
