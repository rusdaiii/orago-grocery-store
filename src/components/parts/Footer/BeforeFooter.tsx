'use client';
import { usePathname } from 'next/navigation';

import Contact from '@/components/parts/Contact/Contact';
import NewsletterForm from '@/components/parts/Form/NewsletterForm';
import SocialMediaGroup from '@/components/parts/SocialMediaGroup';

const BeforeFooter = () => {
  const path = usePathname();

  if (path === '/') {
    return <Contact />;
  }

  return (
    <section className="w-full bg-gray-50 py-12 mt-12 ">
      <div className="flex flex-col gap-5 lg:flex-row lg:gap-32 container">
        <div className="text-center lg:text-start">
          <h1 className="font-bold text-2xl">Subcribe our Newsletter</h1>
          <p className="text-gray-500 text-sm">
            Subscribe to our newsletter and get our latest news and updates
            directly in your inbox.
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center lg:flex-row lg:gap-16 lg:w-full">
          <NewsletterForm />

          <SocialMediaGroup />
        </div>
      </div>
    </section>
  );
};

export default BeforeFooter;
