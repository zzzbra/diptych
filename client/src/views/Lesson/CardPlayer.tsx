import React, { useState } from 'react';
import { Card as CardInterface } from 'models';
import Card from 'components/Card';
import { mapSort, deepClone } from 'utils/linkedList';
import Button from 'components/Button';
import { useHistory } from 'react-router';

interface CardPlayerProps {
  cards: Array<CardInterface>;
}

interface CardState {
  isCardShowing: boolean;
  isPendingAnswerReveal: boolean;
}

interface LessonState {
  [cardId: string]: CardState;
}

const getInitialCardsState = (cards: Array<CardInterface>) => {
  return cards.reduce(
    (cards, card) => ({
      ...cards,
      [card.cardId]: {
        isCardShowing: false,
        isPendingAnswerReveal: !!card.isQuestionCard,
        isCurrentCard: false,
      },
    }),
    {},
  );
};

/**
 * state will be a hashmap, with each card ID the key and the properties stored
 * equal to each value of stateu
 */

const CardPlayer = ({ cards: unsortedCards }: CardPlayerProps) => {
  const { push } = useHistory();
  const cards = mapSort(unsortedCards);
  const lessonLength = cards.length;

  const [cardsState, setCardsState] = useState<LessonState>(
    getInitialCardsState(cards),
  );

  const { currentCardIndex, cards: cardsInState } = cardsState;

  const handleClick = () => {
    if (cardsInState[currentCardIndex].isPendingAnswerReveal) {
      window.alert('show answer, and make currentCard isPendingRevew as false');
    } else if (currentCardIndex < lessonLength) {
      let cardsUpdated = deepClone(cardsInState);

      setCardsState({
        cards: cardsUpdated,
        currentCardIndex: currentCardIndex + 1,
      });
    } else {
      push('/dashboard');
    }
  };

  return (
    <div>
      {cards.map((card, key) => {
        return key <= currentCardIndex ? (
          <Card>
            <div>{card.front}</div>
            {card.back && (
              <>
                <div className="mt-2 pt-2 border-t-2">{card.back}</div>
              </>
            )}
          </Card>
        ) : null;
      })}
      {currentCardIndex >= lessonLength ? (
        <div>Congratulations, you've finished this lesson!</div>
      ) : null}
      <Button color="purple" onClick={handleClick}>
        Next
      </Button>
    </div>
  );
};

export default CardPlayer;
