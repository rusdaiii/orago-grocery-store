import { PiPhoneCallLight } from 'react-icons/pi';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type PhoneCardProps = {
  className?: string;
};
const PhoneCard = ({ className }: PhoneCardProps) => {
  return (
    <Card className={cn('border-primary/30', className)}>
      <CardContent className="py-5">
        <PiPhoneCallLight className="w-12 h-12 bg-primary/10 rounded-full p-3 text-primary" />

        <h1 className="uppercase text-base font-medium mt-5 mb-2">
          Call Us 24/7
        </h1>
        <p className="text-primary text-xl">123-456-7890</p>
      </CardContent>
    </Card>
  );
};

export default PhoneCard;
