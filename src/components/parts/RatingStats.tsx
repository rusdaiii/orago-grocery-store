'use client';

import { Rating } from 'react-simple-star-rating';

type RatingStatsProps = {
  rating: number;
  isReadOnly?: boolean;
  isHalfStar?: boolean;
};

const RatingStats = ({
  rating,
  isReadOnly = true,
  isHalfStar,
}: RatingStatsProps) => {
  return (
    <div>
      <Rating
        className="flex"
        iconsCount={5}
        size={18}
        initialValue={rating}
        SVGclassName={`inline-block`}
        readonly={isReadOnly}
        allowFraction={isHalfStar}
      />
    </div>
  );
};

export default RatingStats;
