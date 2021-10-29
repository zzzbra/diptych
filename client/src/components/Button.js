import React from 'react';
import cn from 'classnames';

import tailwindColorDict from 'tailwindcss/colors';

// colors
const colors = Object.keys(tailwindColorDict);

const Button = ({
  children,
  className,
  onClick,
  color = 'blue',
  type = 'button',
}) => {
  if (!colors.includes(color)) {
    throw Error(`Using unsupported Color for button: ${color}`);
  }

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
