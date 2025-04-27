'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { PiHandbag } from 'react-icons/pi';

import CartButton from '@/components/parts/CartButton';
import { Link } from '@/components/parts/Link';
import RatingStats from '@/components/parts/RatingStats';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import formatCurrency from '@/lib/currencyFormat';
import { useGetSavedProduct } from '@/query/save';

import RemoveWishlistButton from './RemoveWishlistButton';

const WishlistTable = () => {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const { data: savedProducts } = useGetSavedProduct(userId);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase">Product</TableHead>
            <TableHead className="uppercase">Price</TableHead>
            <TableHead className="uppercase">Rating</TableHead>
            <TableHead>
              <span className="sr-only">Action</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {savedProducts?.saves.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link
                  href={`/shop/${item.product.categories[0].slug}/${item.product.slug}`}
                  className="flex items-center gap-5"
                >
                  <Image
                    src={item.product.image[0].url}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="hidden md:block"
                  />
                  <span>{item.product.name}</span>
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 cursor-default">
                  <div className="flex flex-col sm:flex-row gap-1">
                    {item.product.sellingPrice && (
                      <h2 className="text-xs sm:text-sm">
                        {formatCurrency(item.product.sellingPrice)}
                      </h2>
                    )}

                    <h2
                      className={` text-xs sm:text-sm ${
                        item.product.sellingPrice &&
                        'line-through text-gray-400'
                      }`}
                    >
                      {formatCurrency(item.product.mrp)}
                    </h2>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <RatingStats
                  rating={item.product.averageRating}
                  isHalfStar={true}
                />
              </TableCell>

              <TableCell>
                <div className="flex justify-end items-center gap-5">
                  <CartButton
                    product={{
                      id: item.product.id,
                      attributes: {
                        ...item.product,
                      },
                    }}
                    size="icon"
                    className="w-8 h-8"
                  >
                    <PiHandbag className="w-5 h-5" />
                  </CartButton>
                  <RemoveWishlistButton productId={item.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WishlistTable;
