import Image from 'next/image';
import Link from 'next/link';

import notFoundIllustration from '@/assets/illustrations/page_not_found.svg?url';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-dvh">
      <Image
        src={notFoundIllustration}
        width={800}
        height={800}
        quality={100}
        alt="Not Found"
        className="w-[450px] h-[450px] mx-auto"
      />
      <h2 className="font-semibold text-4xl">Oops! page not found</h2>
      <p className="mt-5">Could not find requested resource</p>

      <Link href="/">
        <Button className="mt-5 rounded-full">Go back to home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
