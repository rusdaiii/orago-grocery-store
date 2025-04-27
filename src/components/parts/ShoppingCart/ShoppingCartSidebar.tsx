/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import Image from 'next/image';
import { MdClear } from 'react-icons/md';
import { PiHandbag } from 'react-icons/pi';

import emptyCartIllustration from '@/assets/illustrations/empty_cart.svg?url';
import { Link } from '@/components/parts/Link';
import RemoveCartItem from '@/components/parts/ShoppingCart/RemoveCartItem';
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
import { useGetCartItems } from '@/query/cart';

type UserCartSidebarProps = {
  userId: number | undefined;
};

const ShoppingCartSidebar = ({ userId }: UserCartSidebarProps) => {
  const { data: cartItems, refetch } = useGetCartItems(userId);

  useEffect(() => {
    refetch();
  }, [userId]);

  const totalPrice = cartItems?.reduce((acc, item) => acc + item.amount, 0);

  const ShoppingCartIcon = ({ className }: { className?: string }) => (
    <div className="relative flex">
      <PiHandbag className={cn('flex-1 w-8 h-8 text-gray-700', className)} />

      {cartItems?.length ? (
        <Badge className="absolute -right-2 -top-2 h-6 w-6 p-1 justify-center rounded-full cursor-default">
          <span className="text-xs">{cartItems?.length}</span>
        </Badge>
      ) : null}
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex gap-3 items-center text-lg">
          <ShoppingCartIcon />

          <span className="hidden lg:flex flex-col text-start">
            <h2 className="text-xs">Shopping Cart:</h2>
            <h2 className="text-sm">{formatCurrency(totalPrice || 0)}</h2>
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader className="flex justify-center items-center">
          <ShoppingCartIcon className="w-9 h-9" />
          <SheetTitle className="uppercase font-normal text-hover cursor-pointer">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        {cartItems?.length == 0 && (
          <div className="flex flex-col justify-center items-center h-full gap-5">
            <Image
              src={emptyCartIllustration}
              width={200}
              height={200}
              alt="Empty cart"
              className="w-[200px] h-[200px] mx-auto"
            />

            <h2 className="text-lg font-thin text-center">
              Your shopping cart is empty
            </h2>
            <SheetClose asChild>
              <Link href="/shop">
                <Button>Continue shopping</Button>
              </Link>
            </SheetClose>
          </div>
        )}

        <ScrollArea className="flex-grow">
          <div className="flex flex-col gap-5">
            {cartItems?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-3"
              >
                <div className="flex items-center gap-3">
                  <Link
                    href={`/product/${item.slug}`}
                    className="h-10 w-10 sm:w-14 sm:h-14"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex flex-col gap-1">
                    <h2>{item.name}</h2>

                    <div className="flex items-center gap-1 cursor-default">
                      <h2 className="text-sm">{item.quantity}</h2>
                      <MdClear className="w-3 h-3" />

                      <div className="flex flex-col sm:flex-row gap-1">
                        {item.sellingPrice && (
                          <h2 className="text-xs sm:text-sm">
                            {formatCurrency(item.sellingPrice)}
                          </h2>
                        )}

                        <h2
                          className={` text-xs sm:text-sm ${
                            item.sellingPrice && 'line-through text-gray-400'
                          }`}
                        >
                          {formatCurrency(item.actualPrice)}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>

                <RemoveCartItem productId={item.id} />
              </div>
            ))}
          </div>
        </ScrollArea>

        {cartItems?.length ?? 0 > 1 ? (
          <div className="flex flex-col gap-2">
            <span className="flex justify-between">
              <h2 className="uppercase">Subtotal:</h2>
              <h2 className="text-sm md:text-base font-medium">
                {formatCurrency(totalPrice || 0)}
              </h2>
            </span>

            <SheetClose asChild>
              <Link href="/shopping-cart/checkout">
                <Button className="rounded-full w-full">Checkout</Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/shopping-cart">
                <Button className="rounded-full w-full" variant="soft">
                  View Cart
                </Button>
              </Link>
            </SheetClose>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartSidebar;
