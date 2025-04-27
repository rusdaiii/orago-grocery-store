'use client';

import { FC, useCallback, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { z } from 'zod';

import UserAvatar from '@/components/parts/UserAvatar';
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
import { accountUpdateValidation } from '@/lib/validation';
import { getUserInformationKey } from '@/query/user';
import { updateUserAvatar, updateUserInformation } from '@/repositories/user';

type AccountSettingProps = {
  user: {
    id: number | undefined;
    fullName: string;
    email: string;
    phone: string;
  };
};

const AccountSetting: FC<AccountSettingProps> = ({ user }) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { update, data: session } = useSession();

  const form = useForm<z.infer<typeof accountUpdateValidation>>({
    resolver: zodResolver(accountUpdateValidation),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    form.setValue('fullName', user.fullName);
    form.setValue('email', user.email);
    form.setValue('phone', user.phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateUserMutation = useMutation({
    mutationFn: updateUserInformation,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: getUserInformationKey(),
      });

      toast({
        title: 'User Information Updated',
        description: 'User information has been updated successfully',
      });

      await update({
        fullName: form.getValues('fullName'),
      });
    },
  });

  const updateUserAvatarMutation = useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: getUserInformationKey(),
      });

      toast({
        title: 'User Avatar Updated',
        description: 'User avatar has been updated successfully',
      });

      await update({
        picture: data.image,
      });
    },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof accountUpdateValidation>) => {
      updateUserMutation.mutate({
        id: session?.user.id!,
        fullName: data.fullName,
        phone: data.phone!,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateUserMutation]
  );

  const onUploadSuccess = (results: CloudinaryUploadWidgetResults) => {
    console.log(results);

    const info = results?.info as CloudinaryUploadWidgetInfo;

    console.log(info);

    updateUserAvatarMutation.mutate({
      id: session?.user.id!,
      image: info.secure_url,
    });
  };

  return (
    <div>
      <Card>
        <CardHeader className="border-b border-border">
          <h1 className="font-semibold">Account Setting</h1>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-5 content-center">
            <div className="md:order-last flex flex-col items-center justify-start">
              <UserAvatar
                userName={session?.user.name || ''}
                image={session?.user.picture}
                className="w-40 h-40"
              />
              <CldUploadWidget
                signatureEndpoint={process.env.NEXT_PUBLIC_SIGNATURE_ENDPOINT}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                options={{
                  sources: ['local'],
                  multiple: false,
                  maxFileSize: 2000000,
                  cropping: true,
                  croppingAspectRatio: 1,
                  clientAllowedFormats: ['png', 'jpeg', 'jpg', 'gif'],
                }}
                onSuccess={(results, { widget }) => {
                  onUploadSuccess(results);
                  widget.close();
                }}
              >
                {({ open }) => {
                  return (
                    <Button
                      onClick={() => open()}
                      className="mt-4"
                      variant="outline"
                      disabled={!session?.user}
                    >
                      Chose Image
                    </Button>
                  );
                }}
              </CldUploadWidget>
            </div>

            <div className="w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Full Name" {...field} />
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
                          <Input disabled {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full md:w-fit rounded-full"
                    disabled={
                      updateUserMutation.isPending || !form.formState.isValid
                    }
                  >
                    {updateUserMutation.isPending ? (
                      <RiLoader5Fill className="animate-spin w-5 h-5" />
                    ) : (
                      'Update'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSetting;
