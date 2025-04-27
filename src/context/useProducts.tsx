import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import { getProducts } from '@/repositories/products';
import { Product } from '@/repositories/products/types';

import { FilterType } from './types';

type ProductsContextType = {
  filter: {};
  setFilter: Dispatch<SetStateAction<FilterType>>;
  products: Product[] | undefined;
  page: number;
  pageCount: number;
  isLoading: boolean;
  error: any;
};

const INITIAL_STATE = {
  filter: {},
  setFilter: () => {},
  products: [],
  page: 1,
  pageCount: 1,
  isLoading: false,
  error: null,
};

const ProductsContext = createContext<ProductsContextType>(INITIAL_STATE);

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filter, setFilter] = useState<FilterType>({});
  const [products, setProducts] = useState(undefined as Product[] | undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const response = await getProducts(filter);

        setProducts(response.data);

        setPage(response.meta.pagination.page);

        setPageCount(response.meta.pagination.pageCount);
      } catch (err) {
        setError(err as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filter]);

  return (
    <ProductsContext.Provider
      value={{ filter, setFilter, products, page, pageCount, isLoading, error }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
