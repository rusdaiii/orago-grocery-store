/* eslint-disable no-unused-vars */

import { create } from 'zustand';

import { SuccessPaymentResponse } from '@/types/midtrans';

type OptionsType = {
  onSuccess?: (result: SuccessPaymentResponse) => void;
  onPending?: (result: SuccessPaymentResponse) => void;
  onClose?: () => void;
  onError?: (error: any) => void;
};

type SnapPayState = {
  snapPay: (paymentToken: string, options?: OptionsType) => void;
};

export const useSnapPayState = create<SnapPayState>()(() => ({
  snapPay: (paymentToken: string, options) => {
    window.snap.pay(paymentToken, {
      ...options,
    });
  },
}));

export const useSnapPay = () => {
  const { snapPay } = useSnapPayState();

  return { snapPay };
};
