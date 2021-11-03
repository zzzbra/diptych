import React from 'react';
import cn from 'classnames';

// import TailwindColors from 'tailwindcss/colors';

type ButtonTypes = "button" | "submit" | "reset" | undefined;

interface ButtonProps {
  // TODO: figure this out
  // color?: typeof TailwindColors,
  color?: string,
  children: any,
  className?: string,
  onClick?: any, // Optional, as in case of form submit button
  type?: ButtonTypes,
}

const Button = ({
  children,
  className,
  onClick,
  color = "blue",
  type = "button",
}: ButtonProps ) => {
  return (
    <button
      {...{
        className: cn(
          `p-2 bg-${color}-700 rounded-lg border text-white hover:bg-${color}-800 font-medium text-sm px-5 py-2.5 text-center`,
          className,
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
