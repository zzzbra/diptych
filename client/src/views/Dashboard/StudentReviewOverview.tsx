import React from 'react';

import Spinner from 'components/Spinner';
import Link from 'components/Link';

import { useGetReviewsQuery } from 'services/reviews';

const StudentReviewOverview = () => {
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useGetReviewsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{JSON.stringify(error, null, 2)}</h1>;
  }

  return (
    <div>
      {reviews.length > 0 ? (
        <>
          <h2>You have reviews ready.</h2>
          <Link to="study-session">Enter study session</Link>
        </>
      ) : (
        <>
          <h2>You have no reviews ready at this time.</h2>
        </>
      )}
    </div>
  );
};

export default StudentReviewOverview;
