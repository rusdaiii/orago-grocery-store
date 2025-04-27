'use client';

import { FC, useCallback, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { shippingInformationValidation } from '@/lib/validation';
import { getUserInformationKey } from '@/query/user';
import { addAddress } from '@/repositories/address';
import { Address } from '@/repositories/user/types';

type ShippingAddressFormProps = {
  addresses: Address | undefined;
};

const ShippingAddressForm: FC<ShippingAddressFormProps> = ({ addresses }) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

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
    },
  });

  useEffect(() => {
    if (addresses) {
      form.setValue('firstName', addresses.firstName);
      form.setValue('lastName', addresses.lastName);
      form.setValue('address', addresses.address);
      form.setValue('city', addresses.city);
      form.setValue('state', addresses.state);
      form.setValue('zip', addresses.zip);
      form.setValue('email', addresses.email);
      form.setValue('phone', addresses.phone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  const createAddress = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Shipping address has been saved',
      });

      queryClient.invalidateQueries({
        queryKey: getUserInformationKey(),
      });
    },
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof shippingInformationValidation>) => {
      let payload;

      if (addresses) {
        payload = {
          addressId: addresses.id,
          ...data,
        };
      } else {
        payload = data;
      }

      createAddress.mutate(payload);
    },
    [createAddress, addresses]
  );

  return (
    <div id="address">
      <Card>
        <CardHeader className="border-b border-border">
          <h1 className="font-semibold">Shipping Address</h1>
        </CardHeader>
        <CardContent className="pt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="username">First Name</FormLabel>
                      <FormControl>
                        <Input {...field} id="firstName" placeholder="John" />
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
                        <Input {...field} id="lastName" placeholder="Doe" />
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
                        <Input
                          {...field}
                          id="address"
                          placeholder="Example Street 123"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="city">City</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="city"
                          placeholder="Jakarta Selatan"
                        />
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
                        <Input
                          {...field}
                          id="state"
                          placeholder="DKI Jakarta"
                        />
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
                        <Input {...field} id="zip" placeholder="12394" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="email"
                          placeholder="example@mail.com"
                        />
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
                        <Input
                          {...field}
                          id="phone"
                          placeholder="62892345678"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full md:w-fit mt-4 rounded-full"
                disabled={createAddress.isPending || !form.formState.isValid}
              >
                {createAddress.isPending ? (
                  <RiLoader5Fill className="animate-spin w-5 h-5" />
                ) : (
                  'Save'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingAddressForm;
