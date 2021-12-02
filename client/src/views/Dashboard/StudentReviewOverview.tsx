import React from 'react';

import Spinner from 'components/Spinner';
import Link from 'components/Link';

import { useGetReviewsQuery } from 'services/reviews';
import { isPastDue } from 'utils/time';
import ErrorMessage from 'components/ErrorMessage';

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
    return <ErrorMessage {...{ error }} />;
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
