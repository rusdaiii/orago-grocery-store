'use client';
import { Link } from '@/components/parts/Link';
import OrderAddress from '@/components/parts/OrderDetails/OrderAddress';
import OrderItems from '@/components/parts/OrderDetails/OrderItems';
import OrderPaymentSummary from '@/components/parts/OrderDetails/OrderPaymentSummary';
import Stepper from '@/components/parts/Stepper/Stepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDate } from '@/lib/formatDate';
import { useGetOrderDetails } from '@/query/order';

type OrderDetailsProps = {
  orderId: string;
};

const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const { data: orderDetailsResponse } = useGetOrderDetails(+orderId);

  const orderDetails = orderDetailsResponse?.data;

  const customerName = orderDetails?.attributes.firstName.concat(
    ' ',
    orderDetails?.attributes.lastName
  );

  const joinAddress = orderDetails?.attributes.address.concat(
    ' ',
    orderDetails?.attributes.city,
    ' ',
    orderDetails?.attributes.state,
    ' ',
    orderDetails?.attributes.zip
  );

  return (
    <section className="flex gap-5">
      <Card className="w-full">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <span>
              <ul className="flex flex-col md:flex-row items-center gap-2 md:gap-10">
                <li className="font-semibold text-sm md:text-xl">
                  Order Details
                </li>
                <span className="flex items-center gap-7">
                  <li className=" list-disc text-gray-500 text-[11px] md:text-sm">
                    {formatDate(orderDetails?.attributes.createdAt || '')}
                  </li>
                  <li className="list-disc text-gray-500 text-[11px] md:text-sm">
                    {orderDetails?.attributes.orderItemList.length} Products
                  </li>
                </span>
              </ul>
            </span>
            <Button variant="link">
              <Link
                href="/account/orders-history"
                className="text-primary text-sm md:text-sm"
              >
                Back to list
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
            <OrderAddress
              customerName={customerName || ''}
              customerEmail={orderDetails?.attributes.email || ''}
              customerPhone={orderDetails?.attributes.phone || ''}
              address={joinAddress || ''}
            />
            <OrderPaymentSummary
              orderId={orderDetails?.id || ''}
              paymentMethod={orderDetails?.attributes.paymentMethod || ''}
              subtotal={orderDetails?.attributes.totalOrderAmount || 0}
            />
          </div>

          <Stepper orderProgress={orderDetails?.attributes.orderStatus || ''} />

          <OrderItems products={orderDetails?.attributes.orderItemList || []} />
        </CardContent>
      </Card>
    </section>
  );
};

export default OrderDetails;
