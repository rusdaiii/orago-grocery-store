'use client';
import { Link } from '@/components/parts/Link';
import { Card, CardContent } from '@/components/ui/card';
import { useGetUserInformation } from '@/query/user';

const ShippingAddress = () => {
  const { data: user } = useGetUserInformation();

  const address = user?.address;

  const addressData = address?.address.concat(
    ' ',
    address?.city,
    ' ',
    address?.state,
    ' ',
    address?.zip
  );

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-5 py-5">
          <h1 className="text-gray-500 uppercase font-medium">
            Shipping Address
          </h1>
          {address ? (
            <>
              <span className="text-sm text-gray-600 max-w-sm">
                {addressData}
              </span>
              <span className="font-medium">{address?.email}</span>
              <span className="font-medium">
                {address?.phone ? address.phone : 'No phone number'}
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-600">No address added</span>
          )}
          <Link
            href="/account/settings#address"
            className="text-primary font-medium"
          >
            Edit Address
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingAddress;
