import type { ComponentProps } from 'react';

const Button = ({ children, ...otherProps }: ComponentProps<'button'>) => {
  return (
    <button
      {...otherProps}
      className='border-1 border-on-primary py-2 px-4 rounded-md bg-secondary cursor-pointer transition hover:bg-primary/50 active:bg-[#09b37c] disabled:opacity-70 disabled:pointer-events-none'
    >
      {children}
    </button>
  );
};

export default Button;
