import Image from 'next/image';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import formatCurrency from '@/lib/currencyFormat';

type OrderProducts = {
  id?: number;
  productName: string;
  price: number;
  quantity: number;
  image: string;
};

type OrderItemsProps = {
  products: OrderProducts[];
};

const OrderItems = ({ products }: OrderItemsProps) => {
  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase">Product</TableHead>
            <TableHead className="uppercase">Price</TableHead>
            <TableHead className="uppercase text-center">Quantity</TableHead>
            <TableHead className="uppercase">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    src={product.image}
                    alt={product.productName}
                    width={50}
                    height={50}
                    className="hidden md:block"
                  />
                  <span>{product.productName}</span>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell className="text-center">x{product.quantity}</TableCell>
              <TableCell className="font-medium">
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default OrderItems;
