import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getSavedProducts, removeSavedProduct } from '@/repositories/save';

export const savedProductKey = () => ['saved-product'];

export const useGetSavedProduct = (userId: number | undefined) => {
  const result = useQuery({
    queryKey: savedProductKey(),
    queryFn: () => getSavedProducts(),
    enabled: !!userId,
  });

  return result;
};

export const useRemoveSavedProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | undefined) => removeSavedProduct(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: savedProductKey() });
    },
  });
};
