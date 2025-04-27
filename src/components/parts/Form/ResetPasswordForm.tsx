'use client';

import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
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
import { PasswordInput } from '@/components/ui/password-input';
import { useToast } from '@/components/ui/use-toast';
import { resetPasswordValidation } from '@/lib/validation';
import { resetPassword } from '@/repositories/auth';

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof resetPasswordValidation>>({
    resolver: zodResolver(resetPasswordValidation),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Password updated successfully.',
      });

      form.reset();

      setTimeout(() => {
        router.push('/login');
      }, 1000);
    },
  });

  const { isPending: isUpdatingPassword } = resetPasswordMutation;

  const onSubmit = useCallback(
    (data: z.infer<typeof resetPasswordValidation>) => {
      const payload = {
        code: searchParams.get('code') as string,
        ...data,
      };

      resetPasswordMutation.mutate(payload);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resetPasswordMutation]
  );

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isUpdatingPassword || !form.formState.isValid}
          >
            Update Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
