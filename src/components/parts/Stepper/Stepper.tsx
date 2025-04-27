import { FC, useEffect, useState } from 'react';

import { BsCheck } from 'react-icons/bs';

type StepperProps = {
  orderProgress: string;
};

import './style.css';

const Stepper: FC<StepperProps> = ({ orderProgress = 'DELIVERED' }) => {
  const orderProgressList = [
    'ORDER_RECEIVED',
    'PROCESSING',
    'ON_DELIVERY',
    'DELIVERED',
  ];

  const [currentStep, setCurrentStep] = useState<number>(1);

  const [complete, setComplete] = useState<boolean>(false);

  useEffect(() => {
    const index = orderProgressList.findIndex((step) => step === orderProgress);

    setCurrentStep(index + 1);

    if (orderProgress === 'DELIVERED') {
      setComplete(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderProgress]);

  return (
    <div className="grid grid-cols-4 py-8 lg:py-10">
      {orderProgressList?.map((step, i) => (
        <div
          key={i}
          className={`step-item ${currentStep === i + 1 && 'active'} ${
            (i + 1 < currentStep || complete) && 'complete'
          } `}
        >
          <div className="step h-full">
            {i + 1 < currentStep || complete ? (
              <BsCheck className="w-5 h-5 md:w-10 md:h-10" />
            ) : (
              i + 1
            )}
          </div>

          <p className="text-gray-500 capitalize text-center text-[10px] h-8 mt-3 md:text-base">
            {step.replace('_', ' ').toLowerCase()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
