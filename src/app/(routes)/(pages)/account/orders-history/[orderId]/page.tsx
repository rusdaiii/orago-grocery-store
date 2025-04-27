import dynamic from 'next/dynamic';

const OrderDetails = dynamic(
  () => import('@/components/pages/OrderHistory/OrderDetail')
);

type Params = {
  params: {
    orderId: string;
  };
};

const OrderDetailPage = ({ params }: Params) => {
  const { orderId } = params;

  return <OrderDetails orderId={orderId} />;
};

export default OrderDetailPage;
