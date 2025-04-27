import AdditionalProductDetail from '@/components/parts/Product/AdditionalProductDetail/AdditionalProductDetail';
import CarouselProduct from '@/components/parts/Product/CarouselProduct';
import ProductDetail from '@/components/parts/Product/ProductDetail';
import { getProductDetail, getRelatedProducts } from '@/repositories/products';

type ProductDetailProps = {
  productSlug: string;
};

const ProductDetails = async ({ productSlug }: ProductDetailProps) => {
  const { data: product } = await getProductDetail(productSlug);

  const categorySlug = product[0].attributes.categories.data[0].attributes.slug;

  const { data: relatedProductsResponse } = await getRelatedProducts(
    categorySlug
  );

  const relatedProducts = relatedProductsResponse.filter(
    (item) => item.id !== product[0].id
  );

  return (
    <div className="container">
      <ProductDetail product={product[0]} />
      <AdditionalProductDetail product={product[0]} />
      <CarouselProduct
        productList={relatedProducts}
        title="Related Products"
        type="ProductPage"
      />
    </div>
  );
};

export default ProductDetails;
