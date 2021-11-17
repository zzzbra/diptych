import React from 'react';
import { useParams } from 'react-router';

import { useGetLessonQuery } from 'services/lessons';
import Planner from 'components/Planner';
import { useAuth } from 'features/auth/hooks';
import { LessonOverviewArgs } from 'models';

const Lesson = () => {
  const { user } = useAuth();
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
      {user?.userIsTeacher ? (
        <Planner {...{ courseId, lessonId }} />
      ) : (
        <>TODO</>
      )}
    </div>
  );
};

export default Lesson;
