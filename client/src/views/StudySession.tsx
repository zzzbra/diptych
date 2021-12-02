import React from 'react';

import { useGetReviewsQuery } from 'services/reviews';
import Spinner from 'components/Spinner';
import { isPastDue } from 'utils/time';
import { useGetSpecificCardsQuery } from 'services/cards';
import { Review } from 'models';

const getDueCards = (reviews: Review[]) =>
  reviews.filter(({ dueDate }) => isPastDue(dueDate));

const StudySession = () => {
  const {
    data: studentReviews = [],
    error,
    isError,
    isLoading,
  } = useGetReviewsQuery();

  const dueReviews = getDueCards(studentReviews);

  const dueCardIds = dueReviews.map(({ cardId }) => cardId);

  const {
    data: cardsForReview = [],
    error: customError,
    isError: isCustomError,
    isLoading: isCustomLoading,
  } = useGetSpecificCardsQuery({ cardIds: dueCardIds }, { skip: isLoading });

  if (isLoading || isCustomLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{JSON.stringify(error, null, 2)}</h1>;
  }

  if (isCustomError) {
    return <h1>{JSON.stringify(customError, null, 2)}</h1>;
  }

  // console.log('cardsForReview: ', cardsForReview, { isLoading });

  return (
    <div>
      <h1>Review Time</h1>
      <h2>Your cards:</h2>
      {cardsForReview.map((card) => (
        <div key={card.cardId}>{JSON.stringify(card, null, 2)}</div>
      ))}
    </div>
  );
};

export default StudySession;
