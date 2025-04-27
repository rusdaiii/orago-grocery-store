import { FC } from 'react';

import { Link } from '@/components/parts/Link';
import { Button } from '@/components/ui/button';
import { useCountDown } from '@/hooks/useCountDown';

type CountDownViewProps = {
  message: string;
  onEnd: () => void;
};

const CountDownView: FC<CountDownViewProps> = ({ message, onEnd }) => {
  const remain = useCountDown(5, onEnd);

  return (
    <div className="flex flex-col gap-5 text-center">
      <div>
        <span>{message}</span>
        <p>Redirecting in {remain} seconds...</p>
      </div>

      <Link href="/">
        <Button className="rounded-full">Go back to home</Button>
      </Link>
    </div>
  );
};

export default CountDownView;
