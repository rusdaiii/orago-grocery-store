import dynamic from 'next/dynamic';

import generateMetadata from '@/lib/metadata';

const ForgotPassword = dynamic(
  () => import('@/components/pages/Auth/ForgotPassword')
);

export const metadata = generateMetadata(
  { title: 'Forgot Password' },
  { withSuffix: true }
);

const ForgotPasswordPage = () => {
  return <ForgotPassword />;
};

export default ForgotPasswordPage;
