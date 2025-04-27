'use client';
import Image from 'next/image';
import { redirect, useSearchParams } from 'next/navigation';

import completeOrderIllustration from '@/assets/illustrations/successful_purchase.svg?url';
import { Link } from '@/components/parts/Link';
import { Button } from '@/components/ui/button';

const CheckoutComplete = () => {
  const searchParams = useSearchParams();

  const orderId = searchParams.get('order_id');

  const transaction_status = searchParams.get('transaction_status');

  if (transaction_status === 'pending') {
    redirect('/account/orders-history');
  }

  return (
    <section className="container flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-5">
        <Image
          src={completeOrderIllustration}
          width={800}
          height={800}
          quality={100}
          alt="Logo"
          className="w-[350px] h-[350px]"
        />
        <span className="text-center">
          <h1 className="text-3xl font-semibold mb-5">
            Your payment has been confirmed
          </h1>
          <p>
            Your order has been confirmed and is being processed. <br /> You
            will receive an email with your order details shortly.
          </p>
        </span>

        <Button className=" rounded-full">
          <Link href={`/account/orders-history/${orderId}`}>
            Go To Order Details
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CheckoutComplete;
