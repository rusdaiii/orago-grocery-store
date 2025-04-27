import dynamic from 'next/dynamic';
import Image from 'next/image';

import resetPasswordIllustration from '@/assets/illustrations/my_password.svg?url';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const ResetPasswordForm = dynamic(
  () => import('@/components/parts/Form/ResetPasswordForm'),
  { ssr: false }
);

const ResetPassword = () => {
  return (
    <section className="container flex justify-center">
      <Card className="p-5">
        <CardHeader className="flex flex-col items-center gap-10">
          <Image
            src={resetPasswordIllustration}
            width={800}
            height={800}
            quality={100}
            alt="Logo"
            className="w-[250px] h-[250px] mx-auto"
          />
          <span>
            <h1 className="text-2xl font-semibold text-center">
              Reset Your Password
            </h1>
            <p className="text-center text-gray-500 max-w-sm text-sm mt-3">
              Set a new password for your account. make sure to remember it this
              time 😊.
            </p>
          </span>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default ResetPassword;
