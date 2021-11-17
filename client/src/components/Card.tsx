import React from 'react';

// two types of cards: Teacher & Student views
// will a single card be responsible for handling the review logic? or should
// a separate card handle the answer -- currently storing idea of a "card" in
// the DB -- this should maybe be a higher level abstraction, e.g. Facts & Questions

interface CardProps {
  children: any;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="rounded drop-shadow-md border border-purple-200 p-10 mb-8">
      {children}
    </div>
  );
};

export default Card;
