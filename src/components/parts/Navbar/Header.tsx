import { getServerSession } from 'next-auth';
import { PiMapPinLight, PiPhoneCallLight } from 'react-icons/pi';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { Link } from '@/components/parts/Link';

import MainNavigation from './MainNavigation';
import { NavigationDesktopMenu } from './NavigationDesktopMenu';

const Header = async () => {
  const session = await getServerSession(options);

  const { user } = session || {};

  return (
    <header className="flex flex-col sticky top-0 z-50 lg:static">
      <div className="hidden lg:block border-b-[1px]">
        <div className="container flex justify-between items-center py-3">
          <div className="flex items-center gap-2 text-gray-500">
            <PiMapPinLight className="w-5 h-5" />

            <span className="text-sm">
              Kemang, Jakarta Selatan, Indonesia 16113
            </span>
          </div>

          {!user && (
            <div className="text-sm text-gray-500 divide-x-2">
              <Link href="/login" className="pr-2 hover:text-primary">
                Login
              </Link>

              <Link href="/register" className="pl-2 hover:text-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      <MainNavigation user={user} />

      <div className="hidden lg:block bg-gray-800">
        <div className="flex container justify-between items-center">
          <NavigationDesktopMenu className="py-3 text-gray-400" />

          <div className="flex items-center gap-2 text-white">
            <PiPhoneCallLight className="w-7 h-7" />
            <span>+1 (123) 456-7890</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
