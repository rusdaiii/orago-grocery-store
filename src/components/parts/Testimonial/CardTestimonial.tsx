import { RiDoubleQuotesR } from 'react-icons/ri';

import RatingStats from '@/components/parts/RatingStats';
import UserAvatar from '@/components/parts/UserAvatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

type CardTestimonialProps = {
  user: string;
  role: string;
  testimonial: string;
  rating: number;
};

const CardTestimonial = ({
  user,
  testimonial,
  rating,
  role,
}: CardTestimonialProps) => {
  return (
    <Card className="w-[450px]">
      <CardContent className="flex flex-col gap-5 py-5 max-h-[300px]">
        <div className="flex flex-col gap-3">
          <RiDoubleQuotesR className="h-10 w-10 text-primary/30" />
          <p className="line-clamp-4">{testimonial}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserAvatar userName={user} />
          <span>
            <h2 className="text-base font-medium">{user}</h2>
            <h3 className="text-sm text-gray-500 capitalize">{role}</h3>
          </span>
        </div>
        <div className="flex gap-1">
          <RatingStats rating={rating} isHalfStar={true} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardTestimonial;
