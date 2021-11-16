import React from 'react';

interface CardProps {
  children: any;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="rounded drop-shadow-md border border-purple-200">
      {children}
    </div>
  );
};

export default Card;
