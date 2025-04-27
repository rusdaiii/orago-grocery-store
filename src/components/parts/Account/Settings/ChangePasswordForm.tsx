'use client';

import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
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
import { PasswordInput } from '@/components/ui/password-input';
import { useToast } from '@/components/ui/use-toast';
import { setAccessToken } from '@/lib/cookies';
import { passwordUpdateValidation } from '@/lib/validation';
import { changePassword } from '@/repositories/auth';

const ChangePasswordForm = () => {
  const { data: session } = useSession();

  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof passwordUpdateValidation>>({
    resolver: zodResolver(passwordUpdateValidation),
    defaultValues: {
      currentPassword: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: async (data) => {
      const { user, jwt: accessToken } = data;

      const signInResponse = await signIn('credentials', {
        redirect: false,
        id: user.id,
        name: user.fullName,
        email: user.email,
        jwt: accessToken,
      });

      if (signInResponse?.error) {
        return toast({
          title: 'Error',
          description: signInResponse.error,
        });
      }

      form.reset();

      toast({
        title: 'Success',
        description: 'Password changed successfully!',
      });

      setAccessToken(accessToken);

      router.refresh();
    },
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof passwordUpdateValidation>) => {
      changePasswordMutation.mutate(data);
    },
    [changePasswordMutation]
  );

  return (
    <div>
      <Card>
        <CardHeader className="border-b border-border">
          <h1 className="font-semibold">Change Password</h1>
          {session?.user.provider !== 'credentials' && (
            <p className="text-sm text-gray-500">
              {`You are currently logged in with ${session?.user.provider}. You can only change
              your password if you have signed up with an email and password.`}
            </p>
          )}
        </CardHeader>
        <CardContent className="pt-5">
          <div>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Current Password
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Enter Current Password"
                          disabled={session?.user.provider !== 'credentials'}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          New Password
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Enter New Password"
                            disabled={session?.user.provider !== 'credentials'}
                            {...field}
                          />
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
                        <FormLabel>
                          Confirm Password
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Confirm New Password"
                            disabled={session?.user.provider !== 'credentials'}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-fit rounded-full"
                  disabled={session?.user.provider !== 'credentials'}
                >
                  Change Password
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordForm;
