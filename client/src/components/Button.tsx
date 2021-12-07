import React from 'react';
import cn from 'classnames';

// import TailwindColors from 'tailwindcss/colors';

type ButtonTypes = 'button' | 'submit' | 'reset' | undefined;

interface ButtonProps {
  // TODO: figure this out
  // color?: typeof TailwindColors,
  color?: string;
  children: any;
  className?: string;
  onClick?: any; // Optional, as in case of form submit button
  type?: ButtonTypes;
}

const Button = ({
  children,
  className,
  onClick,
  color = 'blue',
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      {...{
        className: cn(
          `p-2 rounded-lg border text-white font-medium text-sm px-5 py-2.5 text-center`,
          className,
          {
            'bg-blue-700 hover:bg-blue-800': color === 'blue',
            'bg-red-700 hover:bg-rec-800': color === 'red',
            'bg-purple-700 hover:bg-purple-800': color === 'purple',
            'bg-green-700 hover:bg-green-800': color === 'green',
          },
        ),
        onClick,
        type,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
