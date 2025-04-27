'use client';
import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { z } from 'zod';

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
import { signUpValidation } from '@/lib/validation';
import { register } from '@/repositories/auth';

import GoogleAuthButton from './GoogleAuthButton';
import { AuthFormProps } from './type';

const SignupForm = ({ buttonVariant, rounded }: AuthFormProps) => {
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: async (data) => {
      const { user, jwt: accessToken } = data;

      const signInResponse = await signIn('credentials', {
        redirect: false,
        id: user.id,
        name: user.fullName,
        email: user.email,
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
        description: 'Account Created Successfully',
      });

      setAccessToken(accessToken);

      router.refresh();
    },
  });

  const { isPending: isRegistering } = registerMutation;

  const onSubmit = useCallback(
    async (values: z.infer<typeof signUpValidation>) => {
      registerMutation.mutate(values);
    },
    [registerMutation]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="John Doe"
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="johndoe"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="mail@example.com"
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
                  {...field}
                  placeholder="********"
                  className="rounded-none focus-visible:ring-secondary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="********"
                  className="rounded-none focus-visible:ring-secondary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={`w-full rounded-none ${rounded ? 'rounded-full' : ''}`}
          disabled={isRegistering}
          variant={buttonVariant}
        >
          {isRegistering ? (
            <div className="flex justify-center items-center gap-2">
              <RiLoader5Fill className="h-4 w-4 animate-spin" />
              Signing up
            </div>
          ) : (
            <h2 className="uppercase font-normal">Sign up</h2>
          )}
        </Button>

        <Separator />

        <GoogleAuthButton />
      </form>
    </Form>
  );
};

export default SignupForm;
