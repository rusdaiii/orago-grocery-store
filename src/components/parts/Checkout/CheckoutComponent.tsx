/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useCallback, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSnapPay } from '@/hooks/useSnapPay';
import { ORDER_STATUS } from '@/lib/constants/orders';
import formatCurrency from '@/lib/currencyFormat';
import { shippingInformationValidation } from '@/lib/validation';
import { useGetCartItems } from '@/query/cart';
import { useGetUserInformation } from '@/query/user';
import { createOrder, updateOrder } from '@/repositories/order';
import { SuccessPaymentResponse } from '@/types/midtrans';

const CheckoutComponent = () => {
  const [checked, setChecked] = useState(false);

  const { snapPay } = useSnapPay();

  const { data: user } = useGetUserInformation();

  const address = user?.address;
  const userId = user?.id;

  const form = useForm<z.infer<typeof shippingInformationValidation>>({
    resolver: zodResolver(shippingInformationValidation),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      phone: '',
      notes: '',
    },
  });

  const { data: cartItems } = useGetCartItems(userId);

  const totalPrice = cartItems?.reduce((acc, item) => acc + item.amount, 0);

  const queryClient = useQueryClient();

  const router = useRouter();

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: ({ token, orderId }) => {
      snapPay(token, {
        onSuccess: async (result: SuccessPaymentResponse) => {
          const payload = {
            orderId: +result.order_id,
            status: ORDER_STATUS.PAID,
            paymentMethod: result.payment_type,
          };

          await updateOrder(payload);

          router.replace(result.finish_redirect_url);
        },
        onClose: () => {
          router.replace(
            `/shopping-cart/checkout/success?order_id=${orderId}&token=${token}`
          );
        },
      });

      queryClient.invalidateQueries({
        queryKey: ['cart-items'],
      });

      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
    },
  });

  const { isPending: isCreatingOrder } = createOrderMutation;

  const onSubmit = useCallback(
    (data: z.infer<typeof shippingInformationValidation>) => {
      if (!userId) return;

      const payload = {
        userId: +userId,
        ...data,
        totalOrderAmount: totalPrice,
        orderItemList:
          cartItems?.map((item) => {
            return {
              productName: item.name,
              quantity: item.quantity,
              price: item.sellingPrice ? +item.sellingPrice : item.actualPrice,
              product: item.product,
              image: item.image,
              slug: item.slug,
            };
          }) || [],
      };

      createOrderMutation.mutate(payload);

      form.reset();
    },

    [cartItems, totalPrice, createOrderMutation]
  );

  const existingAddress = () => {
    if (address) {
      form.setValue('firstName', address.firstName, { shouldValidate: true });
      form.setValue('lastName', address.lastName, { shouldValidate: true });
      form.setValue('address', address.address, { shouldValidate: true });
      form.setValue('city', address.city, { shouldValidate: true });
      form.setValue('state', address.state, { shouldValidate: true });
      form.setValue('zip', address.zip, { shouldValidate: true });
      form.setValue('email', address.email, { shouldValidate: true });
      form.setValue('phone', address.phone, { shouldValidate: true });
    }
  };

  useEffect(() => {
    if (checked) {
      existingAddress();
    } else {
      form.reset();
    }
  }, [checked]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-6 grid-rows-1 gap-5">
          <div className="lg:col-span-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Shipping Address
            </h2>

            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="firstName"
                        placeholder="Your First Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="lastName"
                        placeholder="Your Last Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <FormControl>
                      <Input {...field} id="address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <FormControl>
                      <Input {...field} id="city" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="state">State</FormLabel>
                    <FormControl>
                      <Input {...field} id="state" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="zip">ZIP Code</FormLabel>
                    <FormControl>
                      <Input {...field} id="zip" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-4 mt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input {...field} id="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <FormControl>
                      <Input {...field} id="phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {address && (
              <div className="flex gap-2 items-center pt-5">
                <Checkbox onCheckedChange={() => setChecked(!checked)} />
                <label
                  className="text-sm font-medium leading-none 
              peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Use existing address
                </label>
              </div>
            )}

            <div className="pt-5">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="notes">Order Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        id="notes"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-5">
            <Card className="">
              <CardHeader>
                <h1 className="text-xl font-medium">Order Summary</h1>
              </CardHeader>
              <CardContent>
                {cartItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                      <h1>{item.name}</h1>
                      <span>x{item.quantity}</span>
                    </div>
                    <span className="font-medium text-sm">
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
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <h1 className="text-gray-500">Subtotal:</h1>
                  <span className="font-medium text-sm">
                    {formatCurrency(totalPrice || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <h1 className="text-gray-500">Shipping:</h1>
                  <span className="font-medium text-sm">Free</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <h1 className="text-gray-500">Total:</h1>
                  <span className="font-medium">
                    {formatCurrency(totalPrice || 0)}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-5">
                <Button
                  className="w-full rounded-full"
                  disabled={isCreatingOrder || !form.formState.isValid}
                  type="submit"
                >
                  {isCreatingOrder ? (
                    <RiLoader5Fill className="animate-spin w-7 h-7" />
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutComponent;
