import { useEffect, useState } from 'react';

import { getCategories } from '@/repositories/categories';
import { Categories } from '@/repositories/categories/types';

export const useCategories = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);

      try {
        const response = await getCategories();

        setCategories(response.data);
      } catch (error) {
        setError(error as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};
