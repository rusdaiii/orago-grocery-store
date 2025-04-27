'use client';
import Image from 'next/image';
import { PiEye, PiHandbag } from 'react-icons/pi';

import CartButton from '@/components/parts/CartButton';
import Dialog from '@/components/parts/Dialog/ProductDialog';
import { Link } from '@/components/parts/Link';
import RatingStats from '@/components/parts/RatingStats';
import SaveProductButton from '@/components/parts/SaveProductButton';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import formatCurrency from '@/lib/currencyFormat';
import { Product } from '@/repositories/products/types';

import ProductDetail from './ProductDetail';

type ProductItemProps = {
  product: Product;
};
const CardProduct = ({ product }: ProductItemProps) => {
  const categorySlug = product.attributes.categories.data[0].attributes.slug;

  return (
    <Card
      className="group hover:border-primary transition-colors 
      ease-in-out duration-300 rounded-md"
    >
      <CardContent>
        <div className="flex flex-col relative justify-center items-center gap-4 overflow-hidden">
          <Image
            src={product.attributes.image.data[0].attributes.url}
            alt={product.attributes.name}
            width={200}
            height={200}
            quality={100}
            loading="lazy"
            className="h-[300px] object-contain group-hover:scale-110 transition-all ease-in-out duration-300"
          />
          {product.attributes.sellingPrice && (
            <Badge variant="destructive" className="absolute top-5 left-0">
              {Math.round(
                ((product.attributes.mrp - product.attributes.sellingPrice) /
                  product.attributes.mrp) *
                  100
              ).toString()}
              {'% Off'}
            </Badge>
          )}

          <div
            className="flex flex-col gap-3 absolute top-3 -right-10 opacity-0 group-hover:opacity-100 
            group-hover:delay-100 group-hover:duration-300 group-hover:transition-all group-hover:-translate-x-10"
          >
            <SaveProductButton product={product} variant="outline" />

            <Dialog
              dialogTriggerIcon={<PiEye className="w-5 h-5 text-gray-600" />}
              buttonVariant="outline"
              dialogContent={<ProductDetail product={product} />}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <div>
          <Link href={`/shop/${categorySlug}/${product.attributes.slug}`}>
            <h2 className="text-start text-base group-hover:text-primary transition-colors ease-in-out duration-300">
              {product.attributes.name}
            </h2>
          </Link>

          <div className="flex items-center gap-1">
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

        <CartButton
          product={product}
          size="icon"
          className="bg-gray-50 text-foreground group-hover:bg-primary group-hover:text-white
          hover:bg-hard-primary transition-all ease-in-out duration-300 "
        >
          <PiHandbag className="w-5 h-5" />
        </CartButton>
      </CardFooter>
    </Card>
  );
};

export default CardProduct;
