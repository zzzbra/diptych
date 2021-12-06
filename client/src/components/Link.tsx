import classNames from 'classnames';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface LinkProps {
  children: any;
  to: string;
  className?: string;
}

const Link = ({ children, to, className, ...rest }: LinkProps) => {
  return (
    <ReactRouterLink
      className={classNames(
        'underline text-blue-600 hover:text-blue-800 visited:text-purple-600 pr-2',
        {
          [className ?? '']: !!className,
        },
      )}
      to={to}
      {...rest}
    >
      {children}
    </ReactRouterLink>
  );
};

export default Link;
