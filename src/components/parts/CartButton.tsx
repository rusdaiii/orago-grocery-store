'use client';
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { RiLoader5Fill } from 'react-icons/ri';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { addToCart } from '@/repositories/cart';
import { Product } from '@/repositories/products/types';

import { Link } from './Link';

type CartButtonProps = {
  product: Product;
  quantity?: number;
  size?: 'icon' | 'default' | 'sm';
  children?: React.ReactNode;
  className?: string;
};
const CartButton = ({
  product,
  size = 'default',
  children,
  className,

  quantity = 1,
}: CartButtonProps) => {
  const { data: session } = useSession();

  const { user } = session || {};

  const router = useRouter();

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart-items'],
      });

      toast({
        title: 'Success',
        description: `${product.attributes.name} added to cart`,
        action: (
          <Link href="/shopping-cart/checkout">
            <Button className="bg-white text-black hover:bg-white ">
              Checkout
            </Button>
          </Link>
        ),
      });
    },
  });

  const { isPending: isAddingToCart } = addToCartMutation;

  const productTotalPrice = product.attributes.sellingPrice
    ? product.attributes.sellingPrice
    : product.attributes.mrp;

  const onSubmit = useCallback(() => {
    if (!user) return router.push('/login');

    const payload = {
      quantity,
      amount: productTotalPrice * quantity,
      productId: product.id,
      userId: user?.id,
    };

    addToCartMutation.mutate(payload);
  }, [
    addToCartMutation,
    product.id,
    quantity,
    user,
    productTotalPrice,
    router,
  ]);
  return (
    <Button
      className={cn(
        `rounded-full  ${size !== 'icon' ? 'w-full' : ''}`,
        className
      )}
      size={size}
      onClick={() => onSubmit()}
      disabled={isAddingToCart}
    >
      {isAddingToCart ? (
        <RiLoader5Fill className="animate-spin w-5 h-5" />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default CartButton;
