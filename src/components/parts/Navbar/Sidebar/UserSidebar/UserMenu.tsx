import { useSession } from 'next-auth/react';

import { Link } from '@/components/parts/Link';
import { navigationAccountLink } from '@/components/parts/Navbar/AccountSidebar/AccountSidebar';
import UserAvatar from '@/components/parts/UserAvatar';
import { SheetClose } from '@/components/ui/sheet';

const UserMenu = () => {
  const { data } = useSession();

  const { user } = data || {};

  if (!user) return null;

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex flex-col gap-5 justify-center items-center">
        <UserAvatar
          userName={user.name}
          image={user.picture}
          className="w-24 h-24"
        />

        <h2 className="text-xl">{user?.name}</h2>
      </div>
      <div className="flex flex-col justify-center gap-5 pt-5">
        {navigationAccountLink
          .map((link) => (
            <SheetClose key={link.name} asChild>
              <Link
                href={link.href}
                className="px-3 py-2 hover:text-primary  
                transition-colors ease-in-out duration-300"
              >
                <nav className="flex items-center gap-3">
                  {link.icon}
                  {link.name}
                </nav>
              </Link>
            </SheetClose>
          ))
          .slice(0, 5)}
      </div>
    </div>
  );
};

export default UserMenu;
