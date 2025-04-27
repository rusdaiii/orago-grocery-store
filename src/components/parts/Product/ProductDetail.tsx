'use client';
import { useState } from 'react';

import Image from 'next/image';
import { FaShareAlt } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { PiHandbag } from 'react-icons/pi';

import CartButton from '@/components/parts/CartButton';
import RatingStats from '@/components/parts/RatingStats';
import SaveProductButton from '@/components/parts/SaveProductButton';
import SocialMediaGroup from '@/components/parts/SocialMediaGroup';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import formatCurrency from '@/lib/currencyFormat';
import { Product } from '@/repositories/products/types';

type ProductItemDetailProps = {
  product: Product;
};

const ProductDetail = ({ product }: ProductItemDetailProps) => {
  // eslint-disable-next-line no-unused-vars
  const [productTotalPrice, setProductTotalPrice] = useState(
    product?.attributes.sellingPrice
      ? product.attributes.sellingPrice
      : product?.attributes.mrp
  );

  const [quantity, setQuantity] = useState(1);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-2 p-5
    bg-white text-black"
    >
      <div className="flex justify-center">
        <Image
          src={product?.attributes.image.data[0].attributes.url || '/logo.svg'}
          alt="image"
          width={1000}
          height={1000}
          quality={100}
          loading="lazy"
          className="w-1/2 lg:w-full lg:h-[350px] object-contain"
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl lg:text-4xl font-bold">
              {product?.attributes.name}
            </h2>
            <span className="flex items-center gap-2">
              <RatingStats
                rating={product?.attributes.averageRating}
                isHalfStar={true}
              />
              <h3 className="text-sm text-gray-400">
                {product?.attributes.ratings.data.length} Review
              </h3>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h2
              className={`font-semibold text-sm lg:text-lg ${
                product?.attributes.sellingPrice && 'line-through text-gray-500'
              }`}
            >
              {product?.attributes.sellingPrice
                ? formatCurrency(product.attributes.mrp)
                : formatCurrency(quantity * productTotalPrice)}
            </h2>

            {product?.attributes.sellingPrice && (
              <h2 className="font-semibold text-primary text-sm lg:text-xl">
                {formatCurrency(quantity * productTotalPrice)}
              </h2>
            )}

            {product?.attributes.sellingPrice && (
              <Badge className="rounded-full bg-red-200 text-red-400">
                {Math.round(
                  ((product.attributes.mrp - product.attributes.sellingPrice) /
                    product.attributes.mrp) *
                    100
                ).toString()}
                {'% Off'}
              </Badge>
            )}
          </div>
        </div>

        <div className="py-5 border-y border-gray-100">
          <p className="text-xs md:text-sm text-gray-500">
            {product?.attributes.description}
          </p>
        </div>

        <div className="flex justify-between items-center gap-3 pb-3 border-b border-gray-100">
          <div className="p-2 border flex gap-3 items-center rounded-full">
            <Button
              disabled={quantity == 1}
              onClick={() => setQuantity(quantity - 1)}
              size="icon"
              variant="ghost"
              className="rounded-full w-5 h-5 lg:w-7 lg:h-7"
            >
              <FiMinus />
            </Button>

            <h2 className="font-medium text-sm lg:text-lg">{quantity}</h2>

            <Button
              onClick={() => setQuantity(quantity + 1)}
              size="icon"
              variant="ghost"
              className="rounded-full w-5 h-5 lg:w-7 lg:h-7"
            >
              <FiPlus />
            </Button>
          </div>

          <CartButton quantity={quantity} product={product} className="w-full">
            <span className="flex justify-center items-center gap-2">
              <PiHandbag className="w-5 h-5" />
              Add to cart
            </span>
          </CartButton>

          <span className="hidden lg:flex">
            <SaveProductButton product={product} variant="outline" />
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <h2 className="font-medium text-sm">Category:</h2>
            <h3 className="text-gray-500 text-xs">
              {product?.attributes.categories.data[0].attributes.name}
            </h3>
          </span>

          <div className="flex items-center gap-1 lg:hidden">
            <span>
              <SaveProductButton product={product} variant="soft" />
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="soft"
                  size="icon"
                  className="rounded-full w-10 h-10"
                >
                  <FaShareAlt />
                </Button>
              </DialogTrigger>
              <DialogContent>Share</DialogContent>
            </Dialog>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <h2 className="font-medium text-sm">Share item:</h2>
            <SocialMediaGroup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
