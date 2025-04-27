'use client';

import * as React from 'react';

import Image from 'next/image';

import { Link } from '@/components/parts/Link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useGetCategories } from '@/query/categories';

export function NavigationDesktopMenu({ className }: { className?: string }) {
  const { data: categoryData } = useGetCategories();

  const categoryList = categoryData?.data;

  return (
    <NavigationMenu className={cn(className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" className="header-nav">
            Home
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/shop" className="header-nav">
            Shop
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
              {categoryList?.map((category, index) => (
                <ListItem
                  key={index}
                  title={category.attributes.name}
                  href={`/shop/${category.attributes.slug}`}
                >
                  <Image
                    src={category.attributes.icon.data.attributes.url}
                    alt={category.attributes.name}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" className="header-nav">
            About Us
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact" className="header-nav">
            Contact
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type ListItemProps = {
  title: string;
  href: string;
  className?: string;
  children: React.ReactNode;
};

const ListItem = ({
  className,
  title,
  href,
  children,
  ...props
}: ListItemProps) => {
  return (
    <li>
      <Link href={href}>
        <NavigationMenuLink asChild>
          <div
            className={cn(
              `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none 
              transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent 
              focus:text-accent-foreground`,
              className
            )}
            {...props}
          >
            <div className="flex items-center gap-2">
              {children}
              <h1 className="text-sm font-medium leading-none">{title}</h1>
            </div>
          </div>
        </NavigationMenuLink>
      </Link>
    </li>
  );
};
ListItem.displayName = 'ListItem';
