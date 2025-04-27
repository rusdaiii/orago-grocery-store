import dynamic from 'next/dynamic';

import generateMetadata from '@/lib/metadata';
const Auth = dynamic(() => import('@/components/pages/Auth'));

export const metadata = generateMetadata(
  { title: 'Sign Up' },
  { withSuffix: true }
);

const RegisterPage = () => {
  return <Auth page="register" />;
};

export default RegisterPage;
