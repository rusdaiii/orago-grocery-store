import dynamic from 'next/dynamic';
import Image from 'next/image';

import forgotPasswordIcon from '@/assets/illustrations/forgot_password.svg?url';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
const ForgotPasswordForm = dynamic(
  () => import('@/components/parts/Form/ForgotPasswordForm')
);

const ForgotPassword = () => {
  return (
    <section className="container flex justify-center">
      <Card className="p-5">
        <CardHeader className="flex flex-col items-center gap-10">
          <Image
            src={forgotPasswordIcon}
            width={800}
            height={800}
            quality={100}
            alt="Forgot Password Illustration"
            className="w-[250px] h-[250px] mx-auto"
          />
          <span>
            <h1 className="text-2xl font-semibold text-center">
              Forgot Your Password?
            </h1>
            <p className="text-center text-gray-500 max-w-sm text-sm mt-3">
              Tell us your email address and we will send you a link to reset
              your password.
            </p>
          </span>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default ForgotPassword;
