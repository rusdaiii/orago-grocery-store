import { FiMenu } from 'react-icons/fi';

import LogoCompany from '@/components/parts/LogoCompany';
import SocialMediaGroup from '@/components/parts/SocialMediaGroup';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import NavigationSidebar from './NavigationSidebar';

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" className="hover:bg-transparent" size="icon">
          <FiMenu className="w-8 h-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-2/3 flex flex-col justify-between">
        <div>
          <SheetHeader className="mb-5">
            <SheetTitle className="w-full flex justify-center mb-3">
              <LogoCompany />
            </SheetTitle>
          </SheetHeader>

          <NavigationSidebar />
        </div>

        <div className="flex flex-col items-center gap-10">
          <SocialMediaGroup />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
