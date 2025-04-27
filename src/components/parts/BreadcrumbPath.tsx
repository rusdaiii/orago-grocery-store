'use client';
import React from 'react';

import { usePathname } from 'next/navigation';
import { GoHome } from 'react-icons/go';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const BreadcrumbPath = () => {
  const path = usePathname();

  if (path === '/') {
    return null;
  }

  const breadcrumbItems = path
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => {
      const isLast = index === array.length - 1;
      const href = '/' + array.slice(0, index + 1).join('/');

      const regex = /and|\-/g;

      const currentSegment = segment.replace(regex, (match) =>
        match === 'and' ? '&' : ' '
      );

      return (
        <React.Fragment key={index}>
          <BreadcrumbItem>
            <BreadcrumbLink
              className={`capitalize ${isLast ? 'text-primary' : ''}`}
              href={isLast ? undefined : href}
            >
              {currentSegment}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {!isLast && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });

  return (
    <div className="container py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <GoHome className="w-5 h-5" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {breadcrumbItems}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbPath;
