'use client';
import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import { Link } from '@/components/parts/Link';
import { SheetClose } from '@/components/ui/sheet';
import { navigationLink } from '@/lib/constants/navigationLink';
import { cn } from '@/lib/utils';

type NavigationLinkProps = {
  className?: string;
};

const NavigationMenuMobile = ({ className }: NavigationLinkProps) => {
  const path = usePathname();

  const navLinks = useMemo(() => {
    const links = navigationLink.map((item) => ({
      ...item,
      isActive: path === item.href,
    }));

    return links;
  }, [path]);

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {navLinks.map((item, index) => (
        <SheetClose key={index} asChild>
          <Link
            href={item.href}
            className={cn(
              'text-sm',
              item.isActive
                ? 'text-primary'
                : 'hover:text-primary transition-colors duration-200 ease-in-out'
            )}
          >
            {item.name}
          </Link>
        </SheetClose>
      ))}
    </div>
  );
};

export default NavigationMenuMobile;
