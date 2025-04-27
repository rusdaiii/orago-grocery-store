'use client';

import Searchbar from '@/components/parts/LiveSearch/Searchbar';
import LogoCompany from '@/components/parts/LogoCompany';
import ShoppingCartSidebar from '@/components/parts/ShoppingCart/ShoppingCartSidebar';
import WishlistSidebar from '@/components/parts/Wishlist/WishlistSidebar';

import MobileSidebar from './Sidebar/MobileSidebar/MobileSidebar';
import UserSidebar from './Sidebar/UserSidebar/UserSidebar';

export type UserAccountProps = {
  id: number;
  name: string;
  email: string;
  jwt: string;
};

const MainNavigation = ({ user }: { user: UserAccountProps | undefined }) => {
  return (
    <div className="flex justify-between items-center container py-4 bg-background">
      <MobileSidebar />

      <LogoCompany className="hidden lg:block" />

      <div className="w-full lg:w-1/2 px-3">
        <Searchbar className="" />
      </div>

      <div className="flex items-center">
        <div className="flex gap-2 items-center lg:divide-x-2">
          <WishlistSidebar userId={user?.id} />

          <div className="flex pl-2 gap-3">
            <ShoppingCartSidebar userId={user?.id} />

            <UserSidebar className="hidden lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
