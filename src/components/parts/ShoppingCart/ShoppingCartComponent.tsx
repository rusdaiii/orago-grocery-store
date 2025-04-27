'use client';
import { useEffect, useMemo, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { RiLoader5Fill } from 'react-icons/ri';
import { useDebouncedCallback } from 'use-debounce';

import { Link } from '@/components/parts/Link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import formatCurrency from '@/lib/currencyFormat';
import { useGetCartItems } from '@/query/cart';
import { updateCart } from '@/repositories/cart';
import { UpdateCartPayload } from '@/repositories/cart/types';

import RemoveCartItem from './RemoveCartItem';

type CartItemsType = {
  id: number;
  name: string;
  slug: string;
  quantity: number;
  amount: number;
  product: number;
  sellingPrice: number;
  actualPrice: number;
  image: string;
};

const ShoppingCartComponent = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: cartItemsResponse, isPending: isLoadingCartItems } =
    useGetCartItems(userId);

  const queryClient = useQueryClient();

  const [cartItems, setCartItems] = useState<CartItemsType[]>([]);

  useEffect(() => {
    if (cartItemsResponse) {
      setCartItems(cartItemsResponse);
    }
  }, [cartItemsResponse]);

  const totalPrice = cartItems?.reduce((acc, item) => acc + item.amount, 0);

  const updateCartItemMutation = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart-items'],
      });
    },
  });

  const debounced = useDebouncedCallback((payload: UpdateCartPayload) => {
    updateCartItemMutation.mutate(payload);
  }, 1000);

  const handleChangeQuantity = useMemo(
    () => (id: number, quantity: number) => {
      const item = cartItems.find((item) => item.id === id);

      if (!item) return;

      const amount = item.sellingPrice
        ? item.sellingPrice * quantity
        : item.actualPrice * quantity;

      setCartItems((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity,
              amount,
            };
          }

          return item;
        })
      );

      debounced({
        quantity,
        amount,
        cartId: id,
      });
    },
    [cartItems, debounced]
  );

  if (isLoadingCartItems) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <RiLoader5Fill className="w-20 h-20 text-primary animate-spin" />
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h1 className="text-base lg:text-xl font-medium text-center">
          Your shopping cart is empty
        </h1>
        <Link href="/shop">
          <Button className="mt-5">Continue shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <Card className="w-full h-fit">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="uppercase">Product</TableHead>
                <TableHead className="uppercase">Price</TableHead>
                <TableHead className="uppercase">Quantity</TableHead>
                <TableHead className="uppercase">Subtotal</TableHead>
                <TableHead>
                  <span className="sr-only">Action</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="hidden md:block"
                      />
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <div className="p-1 border flex gap-3 justify-center items-center w-fit rounded-full">
                      <Button
                        disabled={item.quantity == 1}
                        onClick={() =>
                          handleChangeQuantity(item.id, item.quantity - 1)
                        }
                        size="icon"
                        variant="ghost"
                        className="rounded-full w-5 h-5 lg:w-6 lg:h-6"
                      >
                        <FiMinus />
                      </Button>

                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          if (e.target.value === '') {
                            handleChangeQuantity(item.id, 1);
                          } else {
                            handleChangeQuantity(
                              item.id,
                              parseInt(e.target.value)
                            );
                          }
                        }}
                        className="text-center w-9 h-7 border border-border rounded-xl border-none bg-inherit focus:border-none focus:ring-0 focus:outline-none"
                      />

                      <Button
                        onClick={() =>
                          handleChangeQuantity(item.id, item.quantity + 1)
                        }
                        size="icon"
                        variant="ghost"
                        className="rounded-full w-5 h-5 lg:w-6 lg:h-6"
                      >
                        <FiPlus />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <h2 className="text-sm font-medium">
                      {item.sellingPrice
                        ? formatCurrency(item.sellingPrice * item.quantity)
                        : formatCurrency(item.actualPrice * item.quantity)}
                    </h2>
                  </TableCell>
                  <TableCell className="text-center">
                    <RemoveCartItem productId={item.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-full lg:w-[450px] h-fit">
        <CardContent className="p-5">
          <h1 className="text-base lg:text-xl font-semibold">Cart Total</h1>
          <div className="flex flex-col gap-5 mt-5">
            <div className="flex justify-between border-b border-border pb-3">
              <span className="text-sm lg:text-base text-gray-500">
                Subtotal:
              </span>
              <h2 className="text-sm font-medium">
                {formatCurrency(totalPrice || 0)}
              </h2>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <span className="text-sm lg:text-base text-gray-500">
                Shipping:
              </span>
              <h2 className="text-sm font-medium">Free</h2>
            </div>
            <div className="flex justify-between pb-3">
              <span className="text-sm lg:text-base text-gray-500">Total:</span>
              <h2 className="text-sm font-medium">
                {formatCurrency(totalPrice || 0)}
              </h2>
            </div>
            <Link
              href="/shopping-cart/checkout"
              className="flex justify-center"
            >
              <Button
                className="w-full md:w-1/2 lg:w-full rounded-full"
                disabled={updateCartItemMutation.isPending}
              >
                {updateCartItemMutation.isPending ? (
                  <RiLoader5Fill className="animate-spin w-8 h-8" />
                ) : (
                  'Proceed to Checkout'
                )}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCartComponent;
