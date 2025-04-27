import { IoBagCheckOutline } from 'react-icons/io5';
import { LuPhoneCall } from 'react-icons/lu';
import { PiMoneyLight } from 'react-icons/pi';
import { TbTruckDelivery } from 'react-icons/tb';

const data = [
  {
    title: 'Free Shipping',
    description: 'Free shipping with discount',
    icon: (
      <TbTruckDelivery
        className="w-16 h-16 bg-primary/10 rounded-full p-4 text-primary"
        strokeWidth={1}
      />
    ),
  },
  {
    title: 'Great Support 24/7',
    description: 'Support online 24 hours',
    icon: (
      <LuPhoneCall
        className="w-16 h-16 bg-primary/10 rounded-full p-4 text-primary"
        strokeWidth={1.3}
      />
    ),
  },
  {
    title: '100% Secure Payment',
    description: 'we ensure your payment is 100% secure',
    icon: (
      <IoBagCheckOutline className="w-16 h-16 bg-primary/10 rounded-full p-4 text-primary" />
    ),
  },
  {
    title: 'Money Back Guarantee',
    description: '30 days money back guarantee',
    icon: (
      <PiMoneyLight className="w-16 h-16 bg-primary/10 rounded-full p-4 text-primary" />
    ),
  },
];

const Feature = () => {
  return (
    <section className="container flex justify-center items-center py-10">
      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:border-b-[1px] border-gray-100 pb-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center "
            >
              {item.icon}
              <h1 className="font-bold text-sm text-center">{item.title}</h1>
              <p className="text-xs text-gray-500 text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
