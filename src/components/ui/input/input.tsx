import { cn } from '@/utils/classname';
import type { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  className?: string;
  isError?: boolean;
}

const Input = ({ className, label, isError, ...otherProps }: InputProps) => {
  return (
    <div className='flex flex-col gap-1'>
      {label}
      <input
        {...otherProps}
        className={cn(
          'p-2 border-1 rounded-md outline-none disabled:opacity-70',
          isError ? 'border-red-500' : 'border-on-primary',
          className,
        )}
      ></input>
    </div>
  );
};

export default Input;
