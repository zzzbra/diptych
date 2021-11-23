import React, { useState } from 'react';
import { Card as CardInterface } from 'models';
import Card from 'components/Card';
import { mapSort } from 'utils/linkedList';
import Button from 'components/Button';

interface CardPlayerProps {
  cards: Array<CardInterface>;
}

const CardPlayer = ({ cards: unsortedCards }: CardPlayerProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  const cards = mapSort(unsortedCards);

  return (
    <div>
      {cards.map((card, key) => {
        return key <= currentCardIndex ? (
          <Card>
            <span>{card.front}</span>
          </Card>
        ) : null;
      })}
      <Button
        color="purple"
        onClick={() => setCurrentCardIndex(currentCardIndex + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default CardPlayer;
