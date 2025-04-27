import { BsTruck } from 'react-icons/bs';
import { GoHome } from 'react-icons/go';
import { IoMdHeartEmpty } from 'react-icons/io';
import { PiHandbag } from 'react-icons/pi';

import { Link } from '@/components/parts/Link';
import { bottombarLink } from '@/lib/constants/navigationLink';

import UserSidebar from './Sidebar/UserSidebar/UserSidebar';

const Bottombar = async () => {
  return (
    <section
      className="z-50 flex justify-between items-center w-full sticky bottom-0 bg-white 
      px-5 py-4 lg:hidden"
    >
      {bottombarLink.map((link, index) => {
        let icon;

        switch (link.name) {
          case 'Home':
            icon = <GoHome className="w-8 h-8" />;
            break;
          case 'Shop':
            icon = <PiHandbag className="w-8 h-8" />;
            break;
          case 'Wishlist':
            icon = <IoMdHeartEmpty className="w-8 h-8" />;
            break;
          case 'Orders':
            icon = <BsTruck className="w-8 h-8" />;
            break;
          default:
            break;
        }

        if (link.name === 'Account') {
          return (
            <span
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <UserSidebar />
              <span className="text-xs">Account</span>
            </span>
          );
        } else {
          return (
            <Link
              key={index}
              href={link.href}
              className="flex flex-col items-center justify-center gap-1"
            >
              {icon}
              <span className="text-xs">{link.name}</span>
            </Link>
          );
        }
      })}
    </section>
  );
};

export default Bottombar;
