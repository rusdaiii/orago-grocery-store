'use client';
import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { IoMdExit } from 'react-icons/io';
import { LuUser } from 'react-icons/lu';

import { Link } from '@/components/parts/Link';
import UserAvatar from '@/components/parts/UserAvatar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ACCESS_TOKEN_KEY } from '@/lib/constants/storageKey';
import { cn } from '@/lib/utils';

import AuthForm from './AuthForm';
import UserMenu from './UserMenu';

type UserMenuSideBarProps = {
  className?: string;
};

const UserSidebar = ({ className }: UserMenuSideBarProps) => {
  const { data } = useSession();

  const { user } = data || {};

  const router = useRouter();

  const queryClient = useQueryClient();

  const handleSignOut = useCallback(async () => {
    await signOut({
      redirect: false,
    });

    deleteCookie(ACCESS_TOKEN_KEY);

    router.refresh();

    queryClient.removeQueries({ queryKey: ['cart-items'] });
    queryClient.removeQueries({
      queryKey: ['saved-product'],
    });
  }, [router, queryClient]);

  return (
    <Sheet>
      <SheetTrigger asChild className={cn(className)}>
        <Button variant="ghost" className="hover:bg-transparent" size="icon">
          {user ? (
            <UserAvatar
              userName={user.name}
              image={user.picture}
              className="w-10 h-10"
            />
          ) : (
            <LuUser className="w-8 h-8" strokeWidth={1.3} />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          <SheetHeader className="flex justify-center items-center">
            <LuUser className="w-10 h-10" strokeWidth={1} />
            <SheetTitle className="uppercase font-normal text-hover cursor-pointer">
              <Link href="/account">My Account</Link>
            </SheetTitle>
          </SheetHeader>

          {!user && <AuthForm />}

          <UserMenu />
        </div>

        {user && (
          <div className="flex justify-center">
            <Button
              onClick={handleSignOut}
              className="w-full rounded-none"
              variant="destructive"
            >
              <IoMdExit className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default UserSidebar;
