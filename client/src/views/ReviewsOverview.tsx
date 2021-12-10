import React from 'react';

import Spinner from 'components/Spinner';
import ErrorMessage from 'components/ErrorMessage';
import Table, { RowState } from 'components/Table';

import { useGetSpecificReviewCardsQuery } from 'hooks/serviceHelpers';

const ReviewsOverview = () => {
  const {
    data: reviewCards = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetSpecificReviewCardsQuery({}); // figure out why necessary

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMessage {...{ error }} />;
  }

  // Remove once generic are ste up in Table
  const data = reviewCards as Array<RowState>;
  return (
    <div>
      <h1>My Brain</h1>
      <p>Here's a list of everything that you are learning on Diptych.</p>
      <Table
        data={data}
        thead={{
          cardId: 'Card ID',
          lessonId: 'Lesson ID',
          front: 'Front',
          back: 'Back',
          rating: 'Rating',
          dueDate: 'Due Date',
        }}
        structure={[
          ({ cardId }: { cardId: string }) => cardId,
          ({ lessonId }: { lessonId: string }) => lessonId,
          ({ front }: { front: string }) => front,
          ({ back }: { back: string }) => back,
          ({ rating }: { rating: number }) => rating,
          ({
            dueDate,
            isThead = false,
          }: {
            dueDate: string;
            isThead: boolean;
          }) =>
            isThead ? dueDate : new Date(dueDate).toLocaleDateString('en-US'),
        ]}
      />
    </div>
  );
};

export default ReviewsOverview;
