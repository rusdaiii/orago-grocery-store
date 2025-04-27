import Image from 'next/image';

import { Link } from '@/components/parts/Link';
import RatingStats from '@/components/parts/RatingStats';
import formatCurrency from '@/lib/currencyFormat';
import { Product } from '@/repositories/products/types';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const categorySlug = product.attributes.categories.data[0].attributes.slug;

  return (
    <Link
      role="button"
      href={`/shop/${categorySlug}/${product.attributes.slug}`}
      className="flex  justify-between items-center gap-3 group"
    >
      <div className="flex gap-3 items-center">
        <Image
          src={product.attributes.image.data[0].attributes.url}
          alt={product.attributes.name}
          width={50}
          height={50}
          className="rounded-md"
        />
        <div>
          <h3 className="font-normal group-hover:text-hover">
            {product.attributes.name}
          </h3>
          <RatingStats
            rating={product.attributes.averageRating}
            isHalfStar={true}
          />
        </div>
      </div>
      <div className="hidden sm:flex flex-col-reverse items-center gap-1 ">
        {product.attributes.sellingPrice && (
          <h2 className="font-normal text-sm">
            {formatCurrency(product.attributes.sellingPrice)}
          </h2>
        )}

        <h2
          className={`font-normal text-sm  ${
            product.attributes.sellingPrice && 'line-through text-gray-400'
          }`}
        >
          {formatCurrency(product.attributes.mrp)}
        </h2>
      </div>
    </Link>
  );
};

export default ProductItem;
