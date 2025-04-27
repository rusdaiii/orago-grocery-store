'use client';
import { FC, useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { RiLoader5Fill } from 'react-icons/ri';

import { useToast } from '@/components/ui/use-toast';
import { setAccessToken } from '@/lib/cookies';
import { providerSignIn } from '@/repositories/auth';

import CountDownView from './CountdownView';

type AuthProviderRedirectProps = {
  provider: string;
};

const AuthProviderRedirect: FC<AuthProviderRedirectProps> = ({ provider }) => {
  const [text, setText] = useState('Loading...');

  const params = useSearchParams();

  const router = useRouter();

  const { toast } = useToast();

  const providerSignInMutation = useMutation({
    mutationFn: () => providerSignIn({ provider, id_token: params.toString() }),
    onSuccess: async (data) => {
      setText(
        'You have been successfully logged in. You will be redirected in a few seconds...'
      );

      const { user, jwt: accessToken } = data;

      setAccessToken(accessToken);
      await signIn('credentials', {
        redirect: false,
        id: user.id,
        name: user.username,
        email: user.email,
        picture: user.image,
        jwt: accessToken,
        provider: user.provider,
      });
    },
    onError: (error: any) => {
      setText('An error occurred while logging in. Please try again.');

      toast({
        title: 'Error',
        description: error.error.message,
        variant: 'destructive',
      });
    },
  });

  useEffect(() => {
    providerSignInMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container flex flex-col justify-center items-center w-full">
      {providerSignInMutation.isPending && (
        <RiLoader5Fill className="w-16 h-16 animate-spin text-primary" />
      )}

      {providerSignInMutation.isSuccess && (
        <CountDownView message={text} onEnd={() => router.push('/')} />
      )}

      {providerSignInMutation.isError && (
        <CountDownView message={text} onEnd={() => router.push('/login')} />
      )}
    </div>
  );
};

export default AuthProviderRedirect;
