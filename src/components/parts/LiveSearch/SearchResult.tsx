import { RiLoader5Fill } from 'react-icons/ri';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from '@/repositories/products/types';

import ProductItem from './ProductItem';

type SearchResultProps = {
  isFetchingProducts: boolean;
  products: Product[] | undefined;
};

const SearchResult = ({ products, isFetchingProducts }: SearchResultProps) => {
  return (
    <div className="absolute w-full z-50 mt-4">
      <div className="grid bg-white shadow-md w-full">
        <span className="flex flex-col sm:flex-row items-center justify-between p-3">
          <h2 className="uppercase font-medium">Products</h2>
          <span className="text-sm font-medium">
            <span>{products?.length || 0}</span>
            <span className="ml-1 ">items found</span>
          </span>
        </span>
        <ScrollArea className="max-h-[350px] lg:max-h-[500px]">
          {isFetchingProducts ? (
            <div className="flex justify-center items-center h-32">
              <RiLoader5Fill className="animate-spin h-8 w-8 text-primary" />
            </div>
          ) : (
            <div className="flex flex-col gap-5 p-4">
              {!isFetchingProducts && products && products.length === 0 && (
                <p>No products found</p>
              )}
              {products?.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default SearchResult;
