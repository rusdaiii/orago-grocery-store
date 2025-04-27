'use client';
import { useEffect } from 'react';

import { PiWarningCircle } from 'react-icons/pi';

import CheckoutComponent from '@/components/parts/Checkout/CheckoutComponent';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { clientKey, snapUrl } from '@/lib/constants/midtrans';

const Checkout = () => {
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
    <section className="container py-5">
      <Alert className="mb-5" variant="destructive">
        <PiWarningCircle className="h-5 w-5" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          <span>
            This is a demo website. Please do not use real credit card
            information.
            <br />
            To test the payment gateway, please use the simulator provided
            below.
            <br />
          </span>
          <a
            href="https://simulator.sandbox.midtrans.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-800 mt-10"
          >
            <Button variant="link" size="sm">
              Click here to open the simulator
            </Button>
          </a>
        </AlertDescription>
      </Alert>
      <CheckoutComponent />
    </section>
  );
};

export default Checkout;
