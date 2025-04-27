'use client';
import { FC, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { RiLoader5Fill } from 'react-icons/ri';

import { Link } from '@/components/parts/Link';
import Pagination from '@/components/parts/Pagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSnapPay } from '@/hooks/useSnapPay';
import { clientKey, snapUrl } from '@/lib/constants/midtrans';
import { ORDER_STATUS } from '@/lib/constants/orders';
import formatCurrency from '@/lib/currencyFormat';
import { formatDate } from '@/lib/formatDate';
import { useGetOrders } from '@/query/order';
import { updateOrder } from '@/repositories/order';
import { SuccessPaymentResponse } from '@/types/midtrans';

type OrderHistoryTableProps = {
  currentPage?: number;
  // eslint-disable-next-line no-unused-vars
  handleChangePage?: (page: number) => void;
  pageSize?: number;
  pagination?: boolean;
};

const OrderHistoryTable: FC<OrderHistoryTableProps> = ({
  currentPage = 1,
  handleChangePage,
  pageSize,
  pagination = true,
}) => {
  const { data: session } = useSession();

  const { snapPay } = useSnapPay();

  const router = useRouter();

  const { data: ordersResponse, isPending: isloadingOrders } = useGetOrders(
    session?.user?.id,
    currentPage,
    pageSize
  );

  const { page, pageCount } = ordersResponse?.meta.pagination || {
    page: 1,
    pageCount: 1,
  };

  const orders = ordersResponse?.data;

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

  const handleSnapPay = async (paymentToken: string, orderId: number) => {
    snapPay(paymentToken, {
      onSuccess: async (result: SuccessPaymentResponse) => {
        const payload = {
          orderId: +result.order_id,
          status: ORDER_STATUS.PAID,
          paymentMethod: result.payment_type,
        };

        await updateOrder(payload);

        router.replace(result.finish_redirect_url);
      },
      onError: async (error) => {
        if (error.status_code === 407) {
          const payload = {
            orderId,
            status: ORDER_STATUS.EXPIRED,
          };

          await updateOrder(payload);
        }
      },
    });
  };

  const statusVariant = (status: string) => {
    switch (status) {
      case ORDER_STATUS.PAID:
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-destructive/10 text-destructive';
    }
  };

  return (
    <div>
      {isloadingOrders && (
        <div className="flex items-center justify-center h-[300px]">
          <RiLoader5Fill className="animate-spin h-16 w-16 text-primary" />
        </div>
      )}
      {!isloadingOrders && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Order ID</TableHead>
              <TableHead className="hidden md:flex justify-start items-center">
                Date
              </TableHead>
              <TableHead className="">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-end">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  You have no orders yet
                </TableCell>
              </TableRow>
            )}
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell className="font-medium hidden md:block">
                  {formatDate(order.attributes.createdAt)}
                </TableCell>
                <TableCell className="w-fit">
                  <div className="flex gap-1">
                    <span className="font-medium">
                      {formatCurrency(order.attributes.totalOrderAmount || 0)}
                    </span>
                    <span className="hidden md:block text-gray-500">
                      ({order.attributes.orderItemList.length} Products)
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span>
                    {order.attributes.paymentStatus === 'UNPAID' ? (
                      <Button
                        onClick={() =>
                          handleSnapPay(
                            order.attributes.payment.data.attributes.token,
                            order.id
                          )
                        }
                        className="rounded-full text-[12px]"
                        size="sm"
                      >
                        Waiting for Payment
                      </Button>
                    ) : (
                      <div>
                        {order.attributes.paymentStatus ? (
                          <span
                            className={`px-5 py-1 font-medium rounded-full text-[12px] ${statusVariant(
                              order.attributes.paymentStatus
                            )}`}
                          >
                            {order.attributes.paymentStatus}
                          </span>
                        ) : null}
                      </div>
                    )}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/account/orders-history/${order.id}`}
                    className="text-primary"
                  >
                    Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {pageCount > 1 && pagination && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <Pagination
                    page={page}
                    pageCount={pageCount}
                    changePage={handleChangePage!}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      )}
    </div>
  );
};

export default OrderHistoryTable;
