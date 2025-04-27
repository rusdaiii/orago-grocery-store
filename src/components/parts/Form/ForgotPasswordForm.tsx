'use client';
import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
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
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { forgotPasswordValidation } from '@/lib/validation';
import { forgotPassword } from '@/repositories/auth';

const ForgotPasswordForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof forgotPasswordValidation>>({
    resolver: zodResolver(forgotPasswordValidation),
    defaultValues: {
      email: '',
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: ({ ok }) => {
      if (ok) {
        toast({
          title: 'Success',
          description: 'Reset link sent to your email.',
        });
      }

      form.reset();
    },
  });

  const { isPending: isSendingEmail } = forgotPasswordMutation;

  const onSubmit = useCallback(
    (data: z.infer<typeof forgotPasswordValidation>) => {
      forgotPasswordMutation.mutate(data);
    },
    [forgotPasswordMutation]
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@mail.com"
                    className="rounded-md focus-visible:ring-secondary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSendingEmail || !form.formState.isValid}
          >
            Send Reset Link
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
