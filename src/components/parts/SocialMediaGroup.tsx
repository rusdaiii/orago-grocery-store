import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

const SocialMediaGroup = () => {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-gray-600 hover:bg-primary 
        hover:text-white transition-colors ease-in-out duration-300"
      >
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="w-4 h-4" />
        </a>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-gray-600 hover:bg-primary 
        hover:text-white transition-colors ease-in-out duration-300"
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="w-4 h-4" />
        </a>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-gray-600 hover:bg-primary 
        hover:text-white transition-colors ease-in-out duration-300"
      >
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="w-4 h-4" />
        </a>
      </Button>
    </div>
  );
};

export default SocialMediaGroup;
