'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const NewsletterForm = () => {
  const { toast } = useToast();

  const handleSubcribe = () => {
    toast({
      title: 'Success',
      description: 'Subscribed Successfully',
    });
  };

  return (
    <div className="flex w-full relative items-center space-x-2">
      <Input
        placeholder="Your Email Address"
        className="rounded-full py-6 px-5 bg-white"
      />
      <Button
        onClick={handleSubcribe}
        className="absolute right-0 rounded-full py-6 px-10"
        type="submit"
      >
        Subcribe
      </Button>
    </div>
  );
};

export default NewsletterForm;
