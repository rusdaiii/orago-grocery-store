'use client';
import { useEffect, useState } from 'react';

export const useCountDown = (seconds: number, onEnd: () => void) => {
  let [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    function tick() {
      setRemaining(remaining - 1);
    }

    const countdown = setInterval(tick, 1000);

    if (remaining <= 0) {
      clearInterval(countdown);
      onEnd();
    }

    return () => clearInterval(countdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  return remaining;
};
