import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';

const GoogleAuthButton = () => {
  return (
    <a href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/connect/google`}>
      <Button
        type="button"
        variant="outline"
        className="w-full text-gray-600 flex items-center"
      >
        <FcGoogle className="w-5 h-5" />
        <span className="ml-2">Continue with Google</span>
      </Button>
    </a>
  );
};

export default GoogleAuthButton;
