import { Product } from '@/repositories/products/types';

import CardMiniProduct from './CardMiniProduct';

type HighlightProductProps = {
  productList: Product[];
  title?: string;
};

const HighlightProduct = ({ title, productList }: HighlightProductProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-medium">{title}</h1>
      <div className="flex flex-col gap-3 w-full">
        {productList.map((product) => (
          <CardMiniProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HighlightProduct;
