import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCategories } from '@/hooks/useCategories';

const DropdownCategory = () => {
  const [category, setCategory] = useState<string>('Select Category');

  const { categories } = useCategories();

  const router = useRouter();

  const handleCategory = (slug: string) => {
    const selectedCategory = categories.find((category) => {
      return category.attributes.slug === slug;
    });

    router.push(`/shop/${slug}`);

    setCategory(selectedCategory?.attributes.name || 'Select Category');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="rounded-sm">
        <Button variant="outline" className="flex items-center font-normal">
          <span className="capitalize">{category}</span>
          <FaChevronDown className="w-3 h-3 ml-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[170px] rounded-sm">
        {categories.map((category) => (
          <DropdownMenuItem key={category.id}>
            <button
              className="w-full flex justify-start font-normal"
              onClick={() => handleCategory(category.attributes.slug)}
            >
              {category.attributes.name}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownCategory;
