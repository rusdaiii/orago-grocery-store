'use client';
import { Link } from '@/components/parts/Link';
import NavigationMobileMenu from '@/components/parts/Navbar/NavigationMobileMenu';
import { SheetClose } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetCategories } from '@/query/categories';

const NavigationSidebar = () => {
  const { data: categoryData } = useGetCategories();

  const categoryList = categoryData?.data;

  return (
    <Tabs defaultValue="menu" className="w-full">
      <TabsList className="w-full bg-background mb-5">
        <TabsTrigger value="menu" className="uppercase w-full md:text-base">
          menu
        </TabsTrigger>
        <TabsTrigger
          value="categories"
          className="uppercase w-full md:text-base"
        >
          categories
        </TabsTrigger>
      </TabsList>
      <TabsContent value="menu">
        <NavigationMobileMenu />
      </TabsContent>
      <TabsContent value="categories">
        <ul className="flex flex-col gap-3">
          {categoryList?.map((category, index) => (
            <li
              key={index}
              className="hover:text-primary transition-colors duration-200 ease-in-out"
            >
              <SheetClose asChild>
                <Link
                  className="text-sm"
                  href={`/shop/${category.attributes.slug}`}
                >
                  {category.attributes.name}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
};

export default NavigationSidebar;
