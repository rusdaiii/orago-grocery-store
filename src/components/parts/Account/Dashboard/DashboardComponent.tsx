import OrderHistoryTable from '@/components/parts/Account/OrderHistory/OrderHistoryTable';
import ShippingAddress from '@/components/parts/Account/ShippingAddress/ShippingAddress';
import UserProfile from '@/components/parts/Account/UserProfile/UserProfile';
import { Link } from '@/components/parts/Link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const DashboardComponent = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <UserProfile />
      <ShippingAddress />
      <div className="col-span-1 md:col-span-2">
        <Card>
          <CardHeader>
            <span className="flex justify-between items-center">
              <h1 className="font-medium text-sm md:text-lg">
                Recent Orders History
              </h1>
              <Link
                href="/account/orders-history"
                className="text-primary text-sm"
              >
                View All
              </Link>
            </span>
          </CardHeader>
          <CardContent>
            <OrderHistoryTable pageSize={6} pagination={false} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DashboardComponent;
