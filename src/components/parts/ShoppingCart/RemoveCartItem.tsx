'use client';

import { FC } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MdClear } from 'react-icons/md';
import { RiLoader5Fill } from 'react-icons/ri';

import { Button } from '@/components/ui/button';
import { removeCartItem } from '@/repositories/cart';

type RemoveCartItemProps = {
  productId: number;
};

const RemoveCartItem: FC<RemoveCartItemProps> = ({ productId }) => {
  const queryClient = useQueryClient();

  const deleteCartItemMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
    },
  });

  const { isPending: isDeletePending } = deleteCartItemMutation;

  const handleDeleteCartItem = (id: number) => {
    deleteCartItemMutation.mutate(id);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => handleDeleteCartItem(productId)}
      disabled={isDeletePending}
    >
      {isDeletePending ? (
        <RiLoader5Fill className="w-4 h-4 animate-spin" />
      ) : (
        <MdClear className="w-4 h-4" />
      )}
    </Button>
  );
};

export default RemoveCartItem;
