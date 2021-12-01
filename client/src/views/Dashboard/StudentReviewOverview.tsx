import React from 'react';

import Spinner from 'components/Spinner';
import Link from 'components/Link';

import { useGetReviewsQuery } from 'services/reviews';

const isPastDue = (dueDate: string) => {
  const dueDateTime = new Date(dueDate);
  const now = new Date();
  return dueDateTime <= now;
};

const StudentReviewOverview = () => {
  const {
    data: reviews = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetReviewsQuery();

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{JSON.stringify(error, null, 2)}</h1>;
  }

  return reviews.filter(({ dueDate }) => isPastDue(dueDate)).length > 0 ? (
    <div className="pb-8">
      <h2>You have reviews ready.</h2>
      <Link to="study-session">Enter study session</Link>
    </div>
  ) : (
    <div>
      <h2>You have no reviews ready at this time.</h2>
    </div>
  );
};

export default StudentReviewOverview;
