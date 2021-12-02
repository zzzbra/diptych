import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import shuffle from 'lodash/shuffle';

import { LessonOverviewArgs, Card as CardInterface } from 'models';
import { mapSort, deepClone } from 'utils/linkedList';
import Card from 'components/Card';
import Button from 'components/Button';
import { useAddNewReviewsMutation, AddReviewsArgs } from 'services/reviews';

type CardPlayerMode = 'lesson' | 'replay' | 'review';
interface CardPlayerProps {
  cards: Array<CardInterface>;
  mode: CardPlayerMode;
}

interface CardState {
  cardId: string;
  front: string;
  back: string;
  isCardShowing: boolean;
  isPendingAnswerReveal: boolean;
}

interface LessonState {
  cardsInState: Array<CardState>;
  currentCardIndex: number;
}

const getInitialCardsState = (
  cards: Array<CardInterface>,
  mode: CardPlayerMode,
) => {
  const orderedCards = mode === 'review' ? shuffle(cards) : mapSort(cards);
  const cardsInState = orderedCards.map(
    ({ isQuestionCard, ...cardFields }) => ({
      isCardShowing: false,
      isPendingAnswerReveal: !!isQuestionCard,
      ...cardFields,
    }),
  );

  return {
    cardsInState,
    currentCardIndex: -1,
  };
};

const CardPlayer = ({
  cards: unsortedCards,
  mode = 'lesson',
}: CardPlayerProps) => {
  const { push } = useHistory();

  // extract to new hook
  const { lessonId } = useParams<LessonOverviewArgs>();
  const [addNewReviews] = useAddNewReviewsMutation();

  const [cards, setCards] = useState<LessonState>(() =>
    getInitialCardsState(unsortedCards, mode),
  );
  const [reviews, setReviews] = useState<AddReviewsArgs>([]);

  const lessonLength = unsortedCards.length;
  const { currentCardIndex, cardsInState } = cards;

  const handleClick = () => {
    let cardsUpdated = deepClone(cardsInState);
    // Order matters here - convert to state machine
    if (cardsInState[currentCardIndex]?.isPendingAnswerReveal) {
      cardsUpdated[currentCardIndex].isPendingAnswerReveal = false;
      setCards({
        cardsInState: cardsUpdated,
        currentCardIndex,
      });
      setReviews([
        ...reviews,
        {
          cardId: cardsInState[currentCardIndex].cardId,
          lessonId,
        },
      ]);
    } else if (currentCardIndex < lessonLength - 1) {
      cardsUpdated[currentCardIndex + 1].isCardShowing = true;
      setCards({
        cardsInState: cardsUpdated,
        currentCardIndex: currentCardIndex + 1,
      });
    } else {
      addNewReviews(reviews);
      push('/dashboard');
    }
  };

  // Order matters here
  const getButtonText = () => {
    if (cardsInState[currentCardIndex]?.isPendingAnswerReveal) {
      return 'Show Answer';
    } else if (currentCardIndex >= lessonLength - 1) {
      return 'Return to course overview';
    } else if (currentCardIndex < 0) {
      return 'Begin';
    } else {
      return 'Next';
    }
  };

  return (
    <div>
      {cardsInState.map((card) => {
        const { cardId, front, back, isCardShowing, isPendingAnswerReveal } =
          card;

        return isCardShowing ? (
          <Card key={cardId}>
            <div>{front}</div>
            {!!back && !isPendingAnswerReveal && (
              <div className="mt-2 pt-2 border-t-2">{back}</div>
            )}
          </Card>
        ) : null;
      })}
      {currentCardIndex >= lessonLength && mode === 'lesson' ? (
        <div>Congratulations, you've finished this lesson!</div>
      ) : null}
      <Button color="purple" onClick={handleClick}>
        {getButtonText()}
      </Button>
    </div>
  );
};

export default CardPlayer;
