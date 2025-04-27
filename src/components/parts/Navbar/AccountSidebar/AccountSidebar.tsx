import { GrPowerCycle } from 'react-icons/gr';
import { IoMdExit, IoMdHeartEmpty } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { PiGearSix, PiHandbag } from 'react-icons/pi';

import { Link } from '@/components/parts/Link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const navigationAccountLink = [
  {
    name: 'Dasboard',
    href: '/account/dashboard',
    icon: <MdDashboard className="w-4 md:w-6 h-4 md:h-6" />,
  },
  {
    name: 'Order History',
    href: '/account/orders-history',
    icon: <GrPowerCycle className="w-4 md:w-6 h-4 md:h-6" />,
  },
  {
    name: 'Wishlist',
    href: '/wishlist',
    icon: <IoMdHeartEmpty className="w-4 md:w-6 h-4 md:h-6" />,
  },
  {
    name: 'Shopping Cart',
    href: '/shopping-cart',
    icon: <PiHandbag className="w-4 md:w-6 h-4 md:h-6" />,
  },
  {
    name: 'Settings',
    href: '/account/settings',
    icon: <PiGearSix className="w-4 md:w-6 h-4 md:h-6" />,
  },
  {
    name: 'Logout',
    href: '/logout',
    icon: <IoMdExit className="w-4 md:w-6 h-4 md:h-6" />,
  },
];

const AccountSidebar = () => {
  return (
    <aside className="w-full lg:w-[350px]">
      <Card className="w-full rounded-md">
        <CardHeader className="hidden lg:block">
          <h1 className="font-semibold text-xl text-center lg:text-left">
            Navigation
          </h1>
        </CardHeader>
        <CardContent className="flex flex-wrap lg:flex-col justify-center p-2 lg:p-0 gap-2 lg:gap-5">
          {navigationAccountLink.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3 lg:px-5 py-2 text-gray-500 hover:text-gray-950 hover:bg-green-gray-100 
              transition-colors ease-in-out duration-300"
            >
              <nav className="flex items-center gap-3 text-sm md:text-base">
                {link.icon}
                {link.name}
              </nav>
            </Link>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
};

export default AccountSidebar;
