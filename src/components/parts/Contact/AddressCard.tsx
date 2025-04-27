import { PiMapPinLight } from 'react-icons/pi';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type AddressCardProps = {
  className?: string;
};
const AddressCard = ({ className }: AddressCardProps) => {
  return (
    <Card className={cn('border-primary/30', className)}>
      <CardContent className="py-5">
        <PiMapPinLight className="w-12 h-12 bg-primary/10 rounded-full p-3 text-primary" />

        <h1 className="uppercase text-base font-medium mt-5 mb-2">
          Our Location
        </h1>
        <p className="text-gray-400">123 Main Street, City, Country</p>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
