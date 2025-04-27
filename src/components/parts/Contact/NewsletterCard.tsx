import { PiEnvelopeLight } from 'react-icons/pi';

import NewsletterForm from '@/components/parts/Form/NewsletterForm';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type NewsletterCardProps = {
  className?: string;
};
const NewsletterCard = ({ className }: NewsletterCardProps) => {
  return (
    <Card className={cn('border-primary/30', className)}>
      <CardContent className="py-5">
        <PiEnvelopeLight className="w-12 h-12 bg-primary/10 rounded-full p-3 text-primary" />

        <h1 className="uppercase text-base font-medium mt-5 mb-2">
          Subscrbe Newsletter
        </h1>
        <NewsletterForm />
      </CardContent>
    </Card>
  );
};

export default NewsletterCard;
