import { Button } from '@/components/ui/button';
import {
  Dialog as DialogComponent,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

type ProductDialogProps = {
  buttonVariant?: 'default' | 'secondary' | 'ghost' | 'outline';
  dialogTriggerIcon: React.ReactNode;
  dialogContent: React.ReactNode;
};

const Dialog = ({
  dialogTriggerIcon,
  dialogContent,
  buttonVariant = 'default',
}: ProductDialogProps) => {
  return (
    <DialogComponent>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          size="icon"
          className="flex justify-center items-center rounded-full"
        >
          {dialogTriggerIcon}
        </Button>
      </DialogTrigger>
      <DialogContent>{dialogContent}</DialogContent>
    </DialogComponent>
  );
};

export default Dialog;
