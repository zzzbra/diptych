import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface LinkProps {
  children: any;
  to: string;
}

const Link = ({ children, to, ...rest }: LinkProps) => {
  return (
    <ReactRouterLink
      className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 pr-2"
      to={to}
      {...rest}
    >
      {children}
    </ReactRouterLink>
  );
};

export default Link;
