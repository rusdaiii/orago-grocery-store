'use client';
import { useSession } from 'next-auth/react';

import { Link } from '@/components/parts/Link';
import UserAvatar from '@/components/parts/UserAvatar';
import { Card, CardContent } from '@/components/ui/card';

const UserProfile = () => {
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center py-5">
          <UserAvatar
            userName={user?.name || ''}
            image={user?.picture}
            className="w-28 h-28"
          />
          <span className="flex flex-col items-center gap-2 mt-4">
            <h1 className="font-medium">{user?.name}</h1>
            <span className="text-gray-500 text-sm ">Customer</span>
            <Link href="/account/settings" className="text-primary font-medium">
              Edit Profile
            </Link>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
