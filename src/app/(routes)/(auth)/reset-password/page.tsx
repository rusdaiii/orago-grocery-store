import dynamic from 'next/dynamic';

const ResetPassword = dynamic(
  () => import('@/components/pages/Auth/ResetPassword')
);

import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Reset Password' },
  { withSuffix: true }
);

const ResetPasswordPage = () => {
  return <ResetPassword />;
};

export default ResetPasswordPage;
