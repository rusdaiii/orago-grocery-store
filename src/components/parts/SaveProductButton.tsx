/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useCallback, useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useGetSavedProduct, useRemoveSavedProduct } from '@/query/save';
import { Product } from '@/repositories/products/types';
import { saveProduct } from '@/repositories/save';

type SaveProductButtonProps = {
  product: Product;
  variant?: 'outline' | 'default' | 'soft';
};

const SaveProductButton = ({ product, variant }: SaveProductButtonProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const { data: session } = useSession();

  const { user } = session || {};

  const { toast } = useToast();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: savedProduct } = useGetSavedProduct(user?.id);

  const savedProductRecord = savedProduct?.saves.find(
    (item) => item.product.id === product.id
  );

  useEffect(() => {
    setIsSaved(!!savedProductRecord);
  }, [savedProductRecord]);

  const { mutate: removeSavedProduct } = useRemoveSavedProduct();

  const saveProductMutation = useMutation({
    mutationFn: saveProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['saved-product'],
      });
    },
  });

  const { isPending: isSaving } = saveProductMutation;

  const onSubmit = useCallback(() => {
    if (!user) {
      return toast({
        title: 'Please sign in to save products',
        variant: 'destructive',
        action: (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              router.push('/login');
            }}
            className="text-foreground"
          >
            Sign in
          </Button>
        ),
      });
    }

    if (isSaved) {
      setIsSaved(false);

      removeSavedProduct(savedProductRecord?.id);
    } else {
      setIsSaved(true);

      saveProductMutation.mutate({
        userId: user?.id,
        productId: product.id,
      });
    }
  }, [saveProductMutation, user?.id, product.id]);

  return (
    <Button
      className="p-2 rounded-full"
      size="icon"
      variant={variant}
      onClick={onSubmit}
      disabled={isSaving}
    >
      {isSaved ? (
        <IoMdHeart
          className={`w-6 h-6 text-red-500 ${isSaving ? 'animate-pulse' : ''}`}
        />
      ) : (
        <IoMdHeartEmpty className="w-6 h-6" />
      )}
    </Button>
  );
};

export default SaveProductButton;
