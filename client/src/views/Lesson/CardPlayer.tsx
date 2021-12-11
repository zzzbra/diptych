import React, { useState } from 'react';
import { useHistory } from 'react-router';
import shuffle from 'lodash/shuffle';

import { mapSort, deepClone } from 'utils/linkedList';
import Card from 'components/Card';
import Button from 'components/Button';
import {
  useAddNewReviewsMutation,
  useUpdateReviewsMutation,
} from 'services/reviews';
import { Card as CardType } from 'models';
import {
  CardState,
  CardPlayerProps,
  StudySessionState,
} from 'features/studySession/interface';

const getInitialStudySessionState = ({
  cards = [],
  mode = 'LESSON',
  reviews = [],
}: CardPlayerProps): StudySessionState => {
  const orderedCards = mode === 'REVIEW' ? shuffle(cards) : mapSort(cards);
  const cardsInitialState = orderedCards.map(
    (
      { isQuestionCard, ...cardFields }: CardType,
      index: number,
      allCards,
    ): CardState => {
      return {
        ...cardFields,
        isHidden: true,
        isPendingBackReveal: isQuestionCard,
        isPendingRating: mode === 'REVIEW',
        isLastCard: index === allCards.length - 1,
      };
    },
  );

  return {
    cards: cardsInitialState,
    currentCardIndex: 0,
    reviews,
  };
};

const CardPlayer = ({
  cards: unsortedCards,
  mode = 'LESSON',
  reviews: reviewsFromApi = [],
  lessonId = '',
}: CardPlayerProps) => {
  const { push } = useHistory();

  // extract to new hook
  const [addNewReviews] = useAddNewReviewsMutation();
  const [updateReviews] = useUpdateReviewsMutation();

  // replace with selector
  const [studySession, setStudySession] = useState<StudySessionState>(() =>
    getInitialStudySessionState({
      cards: unsortedCards,
      mode,
      reviews: reviewsFromApi,
    }),
  );

  const { currentCardIndex = 0, cards = [], reviews } = studySession;
  const lessonLength = cards.length;

  const handleClick = ({ recalled = false }) => {
    const cardsUpdated = deepClone(cards);
    const reviewsUpdated = deepClone(reviews);
    const {
      cardId,
      isLastCard,
      isPendingBackReveal,
      isPendingRating,
      isHidden,
    } = cardsUpdated[currentCardIndex] || {};

    if (
      !isHidden &&
      !isPendingRating &&
      !isPendingBackReveal &&
      isLastCard &&
      mode === 'REVIEW'
    ) {
      // window.alert('TODO: update the DB with new review ratings');
      updateReviews(
        reviews.map(({ reviewId, rating }) => ({
          rating,
          reviewId: reviewId ?? '',
        })),
      );
      push('/dashboard');
    } else if (
      !isHidden &&
      !isPendingRating &&
      !isPendingBackReveal &&
      isLastCard &&
      mode !== 'REVIEW'
    ) {
      addNewReviews(reviews);
      push('/dashboard');
    } else if (cards.length === 0) {
      push('/dashboard');
    } else if (isHidden) {
      // NOT_STARTED
      cardsUpdated[currentCardIndex].isHidden = false;
      setStudySession({
        ...studySession,
        cards: cardsUpdated,
      });
    } else if (isPendingBackReveal && !isPendingRating) {
      // Lesson mode question card back reveal - add review here
      cardsUpdated[currentCardIndex].isPendingBackReveal = false;
      setStudySession({
        ...studySession,
        cards: cardsUpdated,
        reviews: [...reviews, { lessonId, cardId, rating: 0 }],
      });
    } else if (!isHidden && isPendingBackReveal && isPendingRating) {
      // Review mode question card back reveal - add revew in rating step
      cardsUpdated[currentCardIndex].isPendingBackReveal = false;
      setStudySession({
        ...studySession,
        cards: cardsUpdated,
      });
    } else if (
      !isHidden &&
      !isPendingBackReveal &&
      isPendingRating &&
      !isLastCard
    ) {
      cardsUpdated[currentCardIndex].isPendingRating = false;
      cardsUpdated[currentCardIndex + 1].isHidden = false;
      const currentReviewIndex = reviewsUpdated.findIndex(
        ({ cardId: reviewCardId }) => reviewCardId === cardId,
      );
      const { rating = 0 } = reviewsUpdated[currentReviewIndex];

      if (rating > 0 && !recalled) {
        reviewsUpdated[currentReviewIndex].rating--;
      } else if (rating < 5 && recalled) {
        reviewsUpdated[currentReviewIndex].rating++;
      }

      setStudySession({
        ...studySession,
        cards: cardsUpdated,
        currentCardIndex: currentCardIndex + 1,
        reviews: reviewsUpdated,
      });
    } else if (
      !isHidden &&
      !isPendingBackReveal &&
      isPendingRating &&
      isLastCard
    ) {
      cardsUpdated[currentCardIndex].isPendingRating = false;
      const currentReviewIndex = reviewsUpdated.findIndex(
        ({ cardId: reviewCardId }) => reviewCardId === cardId,
      );
      const { rating = 0 } = reviewsUpdated[currentReviewIndex];

      if (rating > 0 && !recalled) {
        reviewsUpdated[currentReviewIndex].rating--;
      } else if (rating < 5 && recalled) {
        reviewsUpdated[currentReviewIndex].rating++;
      }

      setStudySession({
        ...studySession,
        cards: cardsUpdated,
        reviews: reviewsUpdated,
      });
    } else if (
      !isLastCard &&
      !isPendingBackReveal &&
      !isPendingRating &&
      !isHidden
    ) {
      cardsUpdated[currentCardIndex + 1].isHidden = false;
      setStudySession({
        ...studySession,
        cards: cardsUpdated,
        currentCardIndex: currentCardIndex + 1,
      });
    }
  };

  // Order matters here
  const renderControls = () => {
    const { isPendingBackReveal, isPendingRating, isHidden, isLastCard } =
      cards[currentCardIndex] || {};
    if (isPendingRating && !isPendingBackReveal) {
      return (
        <div>
          <Button color="red" onClick={() => handleClick({ recalled: false })}>
            Forgot
          </Button>
          <Button
            color="green"
            className="ml-2"
            onClick={() => handleClick({ recalled: true })}
          >
            Remembered
          </Button>
        </div>
      );
    } else if (!isHidden && isPendingBackReveal) {
      return (
        <Button color="purple" onClick={handleClick}>
          Show Answer
        </Button>
      );
    } else if ((!isHidden && isLastCard) || cards.length === 0) {
      return (
        <Button color="purple" onClick={handleClick}>
          Return to course overview
        </Button>
      );
    } else if (isHidden) {
      return (
        <Button color="purple" onClick={handleClick}>
          Begin
        </Button>
      );
    } else {
      return (
        <Button color="purple" onClick={handleClick}>
          Next
        </Button>
      );
    }
  };

  return (
    <div>
      {mode === 'REVIEW' && (
        <div className="pb-8">
          <p>Get ready to test your memory!</p>
          <p>
            We will review some information that you've seen in past lessons.
            You'll be given a prompt which should help you recall a specific
            fact. When you have recalled that fact, or you think you have, or
            else are sure you will not be able to remember what the actual
            answer is, then you can click to reveal the answer. Then, rate your
            recall based on what the actual answer is, versus what you guessed
            before it was shown.
          </p>
          <p>
            Remember to give it your best effort, and don't click the 'Show
            Answer' button too hastily!
          </p>
        </div>
      )}
      {cards.map((card) => {
        const { cardId, front, back, isHidden, isPendingBackReveal } = card;

        return !isHidden ? (
          <Card key={cardId}>
            <div>{front}</div>
            {!!back && !isPendingBackReveal && (
              <div className="mt-2 pt-2 border-t-2">{back}</div>
            )}
          </Card>
        ) : null;
      })}
      {currentCardIndex >= lessonLength && mode === 'LESSON' ? (
        <div className="pb-8">
          Congratulations, you've finished this lesson!
        </div>
      ) : null}
      {renderControls()}
    </div>
  );
};

export default CardPlayer;
