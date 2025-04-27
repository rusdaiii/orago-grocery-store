import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import formatCurrency from '@/lib/currencyFormat';

type OrderPaymentSummaryProps = {
  subtotal: number;
  paymentMethod: string;
  orderId: number | string;
};

const OrderPaymentSummary = ({
  subtotal,
  paymentMethod,
  orderId,
}: OrderPaymentSummaryProps) => {
  return (
    <Card>
      <CardHeader className="border-b border-border">
        <div className="flex h-12 gap-5">
          <span>
            <h1 className="text-gray-500 uppercase text-sm">Order ID:</h1>
            <span className="text-sm md:text-base">#{orderId || ''}</span>
          </span>

          <Separator orientation="vertical" />

          <span>
            <h1 className="text-gray-500 uppercase text-sm">Payment Method:</h1>
            <span className="text-sm md:text-base">
              {paymentMethod || null}
            </span>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5 pt-5">
          <span className="flex justify-between border-b border-border pb-3 text-sm md:text-base">
            <h1 className="text-gray-500">Subtotal:</h1>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </span>
          <span className="flex justify-between border-b border-border pb-3 text-sm md:text-base">
            <h1 className="text-gray-500">Shipping:</h1>
            <span className="font-medium">Free</span>
          </span>

          <span className="flex items-center justify-between">
            <h1 className="font-medium text-sm md:text-lg">Total</h1>
            <span className="text-primary font-semibold text-sm md:text-base">
              {formatCurrency(subtotal)}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderPaymentSummary;
