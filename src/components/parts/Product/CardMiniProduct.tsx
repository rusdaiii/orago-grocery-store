import Image from 'next/image';
import { PiEye, PiHandbag } from 'react-icons/pi';

import CartButton from '@/components/parts/CartButton';
import Dialog from '@/components/parts/Dialog/ProductDialog';
import RatingStats from '@/components/parts/RatingStats';
import SaveProductButton from '@/components/parts/SaveProductButton';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import formatCurrency from '@/lib/currencyFormat';
import { Product } from '@/repositories/products/types';

import ProductDetail from './ProductDetail';

type CardMiniProductProps = {
  product: Product;
};

const CardMiniProduct = ({ product }: CardMiniProductProps) => {
  return (
    <Card
      className="flex gap-2 group items-center rounded-md p-2 relative hover:border-primary transition-colors 
      ease-in-out duration-300"
    >
      <Image
        src={product.attributes.image.data[0].attributes.url}
        alt={product.attributes.name}
        width={200}
        height={200}
        className="object-cover w-20 h-20"
      />
      {product.attributes.sellingPrice && (
        <Badge variant="destructive" className="absolute top-3 right-3">
          {Math.round(
            ((product.attributes.mrp - product.attributes.sellingPrice) /
              product.attributes.mrp) *
              100
          ).toString()}
          {'% Off'}
        </Badge>
      )}
      <div className="flex flex-col gap-1 w-full">
        <div className="group-hover:hidden">
          <h1 className="text-base">{product.attributes.name}</h1>
          <div className="flex md:flex-col xl:flex-row gap-1">
            {product.attributes.sellingPrice && (
              <h2 className="font-semibold text-sm">
                {formatCurrency(product.attributes.sellingPrice)}
              </h2>
            )}

            <h2
              className={`font-semibold text-sm  ${
                product.attributes.sellingPrice && 'line-through text-gray-400'
              }`}
            >
              {formatCurrency(product.attributes.mrp)}
            </h2>
          </div>
          <RatingStats
            rating={product.attributes.averageRating}
            isHalfStar={true}
          />
        </div>

        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-10  opacity-0 group-hover:opacity-100 flex gap-2
          group-hover:delay-100 group-hover:duration-300 group-hover:transition-all
          group-hover:translate-x-0"
        >
          <CartButton product={product} size="icon" className="">
            <PiHandbag className="w-5 h-5" />
          </CartButton>

          <Dialog
            dialogTriggerIcon={<PiEye className="w-5 h-5 text-gray-600" />}
            buttonVariant="outline"
            dialogContent={<ProductDetail product={product} />}
          />

          <SaveProductButton product={product} variant="outline" />
        </div>
      </div>
    </Card>
  );
};

export default CardMiniProduct;
