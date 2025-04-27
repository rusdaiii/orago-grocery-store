import { Card, CardContent, CardHeader } from '@/components/ui/card';

type OrderAddressProps = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
};

const OrderAddress = ({
  customerName,
  customerEmail,
  customerPhone,
  address,
}: OrderAddressProps) => {
  return (
    <Card>
      <CardHeader className="border-b border-border">
        <h1 className="uppercase text-gray-500">Shipping address</h1>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5 pt-5">
          <span>
            <h1>{customerName}</h1>
            <span className="text-gray-500 text-sm md:text-base">
              {address}
            </span>
          </span>
          <span>
            <h1 className="uppercase text-gray-500">Email</h1>
            <span className="text-sm">{customerEmail}</span>
          </span>
          <span>
            <h1 className="uppercase text-gray-500">Phone</h1>
            <span className="text-sm">{customerPhone}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderAddress;
