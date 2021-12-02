import React from 'react';

import { useGetReviewsQuery } from 'services/reviews';
import Spinner from 'components/Spinner';
import ErrorMessage from 'components/ErrorMessage';
import { isPastDue } from 'utils/time';
import { useGetSpecificCardsQuery } from 'services/cards';
import { Review } from 'models';

import CardPlayer from './Lesson/CardPlayer';
import Card from 'components/Card';

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

  if (isError || isCustomError) {
    return <ErrorMessage {...{ error: error || customError }} />;
  }

  return (
    <div>
      <h1>Review Time</h1>
      <h2>Your cards:</h2>
      <CardPlayer cards={cardsForReview} mode="review" />
    </div>
  );
};

export default StudySession;
