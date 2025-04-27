'use client';
import { useState } from 'react';

import { RiLoader5Fill } from 'react-icons/ri';

import RatingStats from '@/components/parts/RatingStats';
import UserAvatar from '@/components/parts/UserAvatar';
import { Button } from '@/components/ui/button';
import { useGetReview } from '@/query/review';

type CustomerFeedbackProps = {
  productId: number;
};

const CustomerFeedback = ({ productId }: CustomerFeedbackProps) => {
  const [limit, setLimit] = useState(4);

  const {
    data: reviewList,
    isPending: isLoadingReview,
    isFetching,
  } = useGetReview(productId, limit);

  const totalCount = reviewList?.meta.pagination.total;

  const handleLoadMore = () => {
    setLimit((prev) => prev + 4);
  };

  if (isLoadingReview) {
    return (
      <div className="flex justify-center">
        <RiLoader5Fill className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      {reviewList?.data.map((review) => (
        <div
          key={review.id}
          className="flex flex-col gap-2 border-b border-gray-100"
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <UserAvatar
                userName={
                  review.attributes.users_permissions_user.data.attributes
                    .fullName
                }
              />
              <span>
                <h1>
                  {
                    review.attributes.users_permissions_user.data.attributes
                      .fullName
                  }
                </h1>
                <RatingStats rating={review.attributes.value} />
              </span>
            </div>
            <span className="text-gray-400">
              {new Date(review.attributes.createdAt).toDateString()}
            </span>
          </div>
          <p className="pb-5 text-gray-400">
            {review.attributes.comment || 'User has not given any feedback'}
          </p>
        </div>
      ))}
      {isFetching ? (
        <div className="flex justify-center">
          <RiLoader5Fill className="animate-spin text-primary" />
        </div>
      ) : null}

      {reviewList?.data.length === totalCount ? null : (
        <Button
          onClick={handleLoadMore}
          disabled={limit === totalCount}
          variant="soft"
          className="w-full rounded-full"
        >
          {isFetching ? (
            <RiLoader5Fill className="animate-spin" />
          ) : (
            'Load More'
          )}
        </Button>
      )}
    </div>
  );
};

export default CustomerFeedback;
