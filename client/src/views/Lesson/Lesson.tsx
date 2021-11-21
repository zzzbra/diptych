import React from 'react';
import { useParams } from 'react-router';

import { useGetLessonQuery } from 'services/lessons';
import { LessonOverviewArgs } from 'models';

const Lesson = () => {
  const { courseId, lessonId } = useParams<LessonOverviewArgs>();
  const {
    data: lesson,
    isError,
    isLoading,
    isFetching,
    error,
  } = useGetLessonQuery({ courseId, lessonId });

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const { title, description } = lesson || {};

  return isFetching || isLoading ? (
    <div>Loading</div>
  ) : (
    <div>
      <h1>Course: {title}</h1>
      <div className="mt-4">
        <h4>Course Description</h4>
        <p className="border mt-2 p-6 rounded">{description}</p>
      </div>
      <div>show students progress through lessons in course here</div>
    </div>
  );
};

export default Lesson;
