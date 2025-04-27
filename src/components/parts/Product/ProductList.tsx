import { RiLoader5Fill } from 'react-icons/ri';

import { Product } from '@/repositories/products/types';

import CardProduct from './CardProduct';

type ProductListProps = {
  productList: Product[] | undefined;
  isLoadingProduct?: boolean;
};
const ProductList = ({ productList, isLoadingProduct }: ProductListProps) => {
  if (isLoadingProduct || productList === undefined) {
    return (
      <div className="mt-5 w-full flex justify-center items-center min-h-[500px]">
        <RiLoader5Fill className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (productList?.length === 0) {
    return (
      <div className="mt-5 w-full flex justify-center items-center min-h-[500px]">
        <h2 className="text-green-600 font-bold text-2xl">No Products Found</h2>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5">
        {productList?.map((product, index) => (
          <CardProduct key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
