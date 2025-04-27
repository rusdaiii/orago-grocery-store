import dynamic from 'next/dynamic';

const Auth = dynamic(() => import('@/components/pages/Auth'));

import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Sign In' },
  { withSuffix: true }
);

const LoginPage = () => {
  return <Auth page="login" />;
};

export default LoginPage;
