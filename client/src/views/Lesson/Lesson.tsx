import React from 'react';
import { useParams } from 'react-router';

import { useGetLessonQuery } from 'services/lessons';
import { LessonOverviewArgs } from 'models';
import { useGetCardsFromLessonQuery } from 'services/cards';
import CardPlayer from './CardPlayer';

const Lesson = () => {
  const { lessonId } = useParams<LessonOverviewArgs>();
  const {
    data: lesson,
    isError,
    isLoading,
    isFetching,
    error,
  } = useGetLessonQuery({ lessonId });
  const { data: cards = [] } = useGetCardsFromLessonQuery({ lessonId });

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
        <h4 className="pb-2">Lesson Overview</h4>
        <p>{description}</p>
      </div>
      <CardPlayer {...{ cards }} />
    </div>
  );
};

export default Lesson;
