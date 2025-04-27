'use client';
import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { z } from 'zod';

import { Link } from '@/components/parts/Link';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { setAccessToken } from '@/lib/cookies';
import { signInValidation } from '@/lib/validation';
import { login } from '@/repositories/auth';

import GoogleAuthButton from './GoogleAuthButton';
import { AuthFormProps } from './type';

const SigninForm = ({ buttonVariant, rounded }: AuthFormProps) => {
  const { toast } = useToast();

  const router = useRouter();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      const { user, jwt: accessToken } = data;

      const signInResponse = await signIn('credentials', {
        redirect: false,
        id: user.id,
        name: user.fullName,
        email: user.email,
        picture: user.image,
        jwt: accessToken,
        provider: 'credentials',
      });

      if (signInResponse?.error) {
        return toast({
          title: 'Error',
          description: signInResponse.error,
        });
      }

      toast({
        title: 'Success',
        description: 'Login Successfully',
      });

      setAccessToken(accessToken);

      router.refresh();

      queryClient.invalidateQueries({
        queryKey: ['cart-items'],
      });

      queryClient.refetchQueries({
        queryKey: ['cart-items'],
      });
    },
  });

  const { isPending: isSigningIn } = loginMutation;

  const onSubmit = useCallback(
    (values: z.infer<typeof signInValidation>) => {
      loginMutation.mutate(values);
    },
    [loginMutation]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@mail.com"
                  className="rounded-none focus-visible:ring-secondary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="********"
                  className="rounded-none focus-visible:ring-secondary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-secondary hover:text-gray-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className={`w-full rounded-none ${rounded ? 'rounded-full' : ''}`}
          disabled={isSigningIn}
          variant={buttonVariant}
        >
          {isSigningIn ? (
            <div className="flex justify-center items-center gap-2">
              <RiLoader5Fill className="h-4 w-4 animate-spin" />
              Signing in
            </div>
          ) : (
            <h2 className="uppercase font-normal">Sign in</h2>
          )}
        </Button>

        <Separator />

        <GoogleAuthButton />
      </form>
    </Form>
  );
};

export default SigninForm;
