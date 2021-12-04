import React, { useState } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useHistory, useParams } from 'react-router';
import shuffle from 'lodash/shuffle';

import { LessonOverviewArgs } from 'models';
import { mapSort, deepClone } from 'utils/linkedList';
import Card from 'components/Card';
import Button from 'components/Button';
import {
  useAddNewReviewsMutation,
  useUpdateReviewMutation,
  AddReviewsArgs,
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
  console.log('reviews', reviews);
  const orderedCards = mode === 'REVIEW' ? shuffle(cards) : mapSort(cards);
  const cardsInitialState = orderedCards.map(
    ({ isQuestionCard, ...cardFields }: CardType): CardState => ({
      status: !!isQuestionCard ? 'QUESTION_CARD_HIDDEN' : 'INFO_CARD_HIDDEN',
      ...cardFields,
    }),
  );

  return {
    status: cards.length > 0 ? 'NOT_STARTED' : 'FINISHED',
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
  console.log('mode:', mode);
  const { push } = useHistory();

  // extract to new hook
  const [addNewReviews] = useAddNewReviewsMutation();
  // const [updateReviews] = useUpdateReviewsMutation();

  // replace with selector
  const [studySession, setStudySession] = useState<StudySessionState>(() =>
    getInitialStudySessionState({
      cards: unsortedCards,
      mode,
      reviews: reviewsFromApi,
    }),
  );

  const { currentCardIndex, cards = [], reviews, status } = studySession;
  const lessonLength = cards.length;

  const handleClick = ({ recalled = false }) => {
    const cardsUpdated = deepClone(cards);
    const currentCard = cardsUpdated[currentCardIndex];
    const isLastCard = currentCardIndex === lessonLength;

    if (status === 'FINISHED') {
      if (mode === 'REVIEW') {
        window.alert('TODO: update the DB with new review ratings');
        // updateReviews(reviews);
      } else {
        console.log('new reviews: ', reviews);
        addNewReviews(reviews);
      }
      push('/dashboard');
    // action that reveals card -- only happens now at start
    } else if (status === 'NOT_STARTED') {
      if (currentCard.status === 'INFO_CARD_HIDDEN') {
        cardsUpdated[currentCardIndex].status = 'INFO_CARD_COMPLETE';
      } else if (currentCard.status === 'QUESTION_CARD_HIDDEN') {
        cardsUpdated[currentCardIndex].status = 'QUESTION_CARD_PENDING_BACK_REVEAL';
      }

      setStudySession({
        ...studySession,
        cards: cardsUpdated,
        currentCardIndex: currentCardIndex + 1,
      });
      // action that reveals card - also only happens at start
    } else if (currentCard?.status === 'INFO_CARD_COMPLETE') {
      // cardsUpdated[currentCardIndex].status = 'INFO_CARD_COMPLETE';

      // const nextCardIndex = currentCardIndex + 1;
      // // brittle - might be cleaner with doubly linked list
      // cardsUpdated[nextCardIndex].status =
      //   cardsUpdated[nextCardIndex].status === 'INFO_CARD_HIDDEN'
      //   ? 'INFO_CARD_COMPLETE' : 'QUESTION_CARD_PENDING_BACK_REVEAL';

      // setStudySession({
      //   ...studySession,
      //   cards: cardsUpdated,
      //   currentCardIndex: nextCardIndex,
      // });
      // action that reveals card - also only happens at start
    } else if (currentCard?.status === 'QUESTION_CARD_HIDDEN') {
      cardsUpdated[currentCardIndex].status = 'QUESTION_CARD_PENDING_BACK_REVEAL';
      setStudySession({
        ...studySession,
        cards: cardsUpdated,
      });
    } else if (currentCard?.status === 'QUESTION_CARD_PENDING_BACK_REVEAL') {
      cardsUpdated[currentCardIndex].status =
        mode === 'REVIEW'
          ? 'QUESTION_CARD_PENDING_RATING'
          : 'QUESTION_CARD_COMPLETE';
      setStudySession({
        ...studySession,
        cards: cardsUpdated,
        // reviews:
        //   mode === 'LESSON'
        //     ? [...reviews, { lessonId, cardId: currentCard?.cardId, rating: 0 }]
        //     : reviews,
      });

    } else if (currentCard?.status === 'QUESTION_CARD_PENDING_RATING') {
      // shouldn't be doing this here?
      if (currentCardIndex + 1 < lessonLength) {
        const nextCard = cardsUpdated[currentCardIndex + 1];
        nextCard.status = nextCard.;
      }
      setStudySession({
        ...studySession,
        cards: cardsUpdated,
        currentCardIndex: currentCardIndex + 1,
        reviews: reviews.map((review) => {
          if (review.cardId === cards[currentCardIndex]?.cardId) {
            if (recalled && review.rating < 5) {
              return {
                ...review,
                rating: review.rating + 1,
              };
            }
            if (!recalled && review.rating < 0) {
              return {
                ...review,
                rating: review.rating - 1,
              };
            }
          }

          return review;
        }),
      });

      // just show the next card
    } else if (currentCard?.status === ) {
      if (currentCardIndex + 1 < lessonLength) {
        cardsUpdated[currentCardIndex + 1].isCardShowing = true;
      }
      setStudySession({
        ...studySession,
        cards: cardsUpdated,
        currentCardIndex: currentCardIndex + 1,
      });
      // EXIT STUDY SESSION
    } else {
    }
    // TODO: UPDATE_RATING
  };

  // Order matters here
  const renderControls = () => {
    if (cards[currentCardIndex]?.nextAction === 'SET_RATING') {
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
    } else if (cards[currentCardIndex]?.nextAction === 'SHOW_ANSWER') {
      return (
        <Button color="purple" onClick={handleClick}>
          Show Answer
        </Button>
      );
    } else if (currentCardIndex >= lessonLength - 1) {
      return (
        <Button color="purple" onClick={handleClick}>
          Return to course overview
        </Button>
      );
    } else if (currentCardIndex < 0) {
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
      {cards.map((card) => {
        const { cardId, front, back, isCardShowing, nextAction } = card;

        return isCardShowing ? (
          <Card key={cardId}>
            <div>{front}</div>
            {!!back && !(nextAction === 'SHOW_ANSWER') && (
              <div className="mt-2 pt-2 border-t-2">{back}</div>
            )}
          </Card>
        ) : null;
      })}
      {currentCardIndex >= lessonLength && mode === 'LESSON' ? (
        <div>Congratulations, you've finished this lesson!</div>
      ) : null}
      {renderControls()}
    </div>
  );
};

export default CardPlayer;
