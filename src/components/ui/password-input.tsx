import * as React from 'react';

import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi';

import { Input } from './input';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        suffix={
          showPassword ? (
            <PiEyeLight
              className="select-none w-5 h-5 text-gray-800"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <PiEyeSlashLight
              className="select-none w-5 h-5 text-gray-800"
              onClick={() => setShowPassword(true)}
            />
          )
        }
        className={className}
        {...props}
        ref={ref}
      />
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
