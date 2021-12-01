import React from 'react';

import { useGetReviewsQuery } from 'services/reviews';
import Spinner from 'components/Spinner';

const StudySession = () => {
  const {
    data: studentReviews = [],
    error,
    isError,
    isLoading,
  } = useGetReviewsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{JSON.stringify(error, null, 2)}</h1>;
  }

  return (
    <div>
      <h1>Review Time</h1>
      <h2>Your cards:</h2>
      {studentReviews.map((r) => (
        <div>{JSON.stringify(r, null, 2)}</div>
      ))}
    </div>
  );
};

export default StudySession;
