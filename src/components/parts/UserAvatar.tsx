import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type UserAvatarProps = {
  userName: string;
  image?: string;
  className?: string;
};

const UserAvatar = ({ userName, image, className }: UserAvatarProps) => {
  const avatarFallback = userName.charAt(0).toUpperCase();

  return (
    <Avatar className={cn('w-14 h-14', className)}>
      <AvatarImage src={image || ''} className="object-cover" />
      <AvatarFallback className="bg-gray-100/50">
        {avatarFallback}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
