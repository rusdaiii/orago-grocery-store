'use client';
import { FC } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import { RiLoader5Fill } from 'react-icons/ri';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { savedProductKey } from '@/query/save';
import { removeSavedProduct } from '@/repositories/save';

type RemoveWishlistButtonProps = {
  className?: string;
  productId: number;
};

const RemoveWishlistButton: FC<RemoveWishlistButtonProps> = ({
  className,
  productId,
}) => {
  const queryClient = useQueryClient();

  const deleteSavedProductMutation = useMutation({
    mutationFn: removeSavedProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: savedProductKey(),
      });
    },
  });

  const { isPending: isDeletePending } = deleteSavedProductMutation;

  const handleDeleteSavedProduct = (id: number) => {
    deleteSavedProductMutation.mutate(id);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('text-red-500', className)}
      onClick={() => handleDeleteSavedProduct(productId)}
      disabled={isDeletePending}
    >
      {isDeletePending ? (
        <RiLoader5Fill className="w-4 h-4 animate-spin" />
      ) : (
        <FaTrashAlt className="w-4 h-4 text-red-500" />
      )}
    </Button>
  );
};

export default RemoveWishlistButton;
