'use client';
import { useEffect } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import successOrderIllustration from '@/assets/illustrations/online_payments.svg?url';
import { Button } from '@/components/ui/button';
import { useSnapPay } from '@/hooks/useSnapPay';
import { clientKey, snapUrl } from '@/lib/constants/midtrans';

const CheckoutSuccess = () => {
  const searchParams = useSearchParams();

  const { snapPay } = useSnapPay();

  const token = searchParams.get('token') || '';

  useEffect(() => {
    const script = document.createElement('script');

    script.src = snapUrl || '';
    script.setAttribute('data-client-key', clientKey || '');
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="container flex justify-center items-center">
      <div className="flex flex-col items-center gap-5">
        <Image
          src={successOrderIllustration}
          width={800}
          height={800}
          quality={100}
          alt="Logo"
          className="w-[350px] h-[350px] mx-auto"
        />

        <span className="text-center">
          <h1 className="text-4xl font-semibold mb-5">
            Thank you for your order
          </h1>
          <p>Please complete your payment below</p>
        </span>

        <Button className="rounded-full" onClick={() => snapPay(token)}>
          Proceed to Payment
        </Button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
