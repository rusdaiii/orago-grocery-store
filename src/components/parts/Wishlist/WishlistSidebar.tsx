'use client';
import Image from 'next/image';
import { IoMdHeartEmpty } from 'react-icons/io';

import { Link } from '@/components/parts/Link';
import RemoveWishlistButton from '@/components/parts/Wishlist/RemoveWishlistButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import formatCurrency from '@/lib/currencyFormat';
import { cn } from '@/lib/utils';
import { useGetSavedProduct } from '@/query/save';

type UserCartSidebarProps = {
  userId: number | undefined;
};

const WishlistSidebar = ({ userId }: UserCartSidebarProps) => {
  const { data: savedProducts } = useGetSavedProduct(userId);

  const WishlistIcon = ({ className }: { className?: string }) => (
    <div className="relative flex">
      <IoMdHeartEmpty className={cn('flex-1 w-8 h-8', className)} />

      {savedProducts?.saves.length ? (
        <Badge
          variant="destructive"
          className="absolute w-2 h-2 p-1 right-0 top-0 rounded-full cursor-default"
        />
      ) : null}
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger>
        <WishlistIcon />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader className="flex justify-center items-center">
          <IoMdHeartEmpty className="w-8 h-8" />

          <SheetTitle className="uppercase font-normal text-hover cursor-pointer">
            WIshlist
          </SheetTitle>
        </SheetHeader>

        {!savedProducts && (
          <div className="flex flex-col justify-center items-center h-full gap-5">
            <h2 className="text-lg font-thin">
              Please login to view your Wishlist
            </h2>
            <SheetClose asChild>
              <Button>
                <Link href="/login">Login</Link>
              </Button>
            </SheetClose>
          </div>
        )}

        {savedProducts?.saves.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full gap-5">
            <h2 className="text-lg font-thin">Your Wishlist is empty</h2>
            <SheetClose asChild>
              <Button>
                <Link href="/shop">Explore products</Link>
              </Button>
            </SheetClose>
          </div>
        )}

        <ScrollArea className="flex-grow">
          <div className="flex flex-col gap-5">
            {savedProducts?.saves.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-3 group hover:bg-gray-50 p-2"
              >
                <div className="flex items-center gap-3">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="h-10 w-10 sm:w-14 sm:h-14"
                  >
                    <Image
                      src={item.product.image[0].url}
                      alt={item.product.name}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex flex-col gap-1">
                    <h2>{item.product.name}</h2>

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
                  </div>
                </div>

                <RemoveWishlistButton
                  productId={item.id}
                  className="absolute right-5 group-hover:translate-x-0 translate-x-14 
                  transition-all duration-500 ease-in-out rounded-full"
                />
              </div>
            ))}
          </div>
        </ScrollArea>

        {savedProducts ? (
          <>
            {savedProducts?.saves.length !== 0 && (
              <SheetClose asChild>
                <Link href="/wishlist">
                  <Button className="rounded-full w-full" variant="soft">
                    View Wishlist
                  </Button>
                </Link>
              </SheetClose>
            )}
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default WishlistSidebar;
