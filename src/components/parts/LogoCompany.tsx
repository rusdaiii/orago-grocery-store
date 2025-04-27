import { FC } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

import { Link } from './Link';

type LogoCompanyProps = {
  background?: 'dark' | 'light';
  className?: string;
};

const LogoCompany: FC<LogoCompanyProps> = ({ background, className }) => {
  return (
    <Link href="/" className={cn(className)}>
      <span className="flex items-center gap-3">
        <Image src="/icons/logo.svg" alt="logo" width={35} height={35} />
        <h1
          className={`text-xl font-medium
          ${background === 'dark' ? 'text-white' : 'text-black'}
        `}
        >
          Orago
        </h1>
      </span>
    </Link>
  );
};

export default LogoCompany;
