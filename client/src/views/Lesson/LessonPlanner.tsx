import React from 'react';
import { useParams } from 'react-router';

import { useGetLessonsInCourseQuery } from 'services/lessons';
import Planner from 'components/Planner';
import { useAuth } from 'features/auth/hooks';
import { LessonOverviewArgs } from 'models';
import { useGetCourseQuery } from 'services/courses';
import Card from 'components/Card';

const Lesson = () => {
  const { user } = useAuth();
  const { courseId } = useParams<LessonOverviewArgs>();
  const { data: course } = useGetCourseQuery({ courseId });
  const {
    data: lessons = [],
    isError,
    isLoading,
    isFetching,
    error,
  } = useGetLessonsInCourseQuery({ courseId });

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const { description } = course || {};

  return isFetching || isLoading ? (
    <div>Loading</div>
  ) : (
    <div>
      <h1>Course: {description}</h1>
      <div className="mt-4">
        <h4>Course Description</h4>
        <p>TODO: Provide Course description.</p>

        <div className="py-8">
          <h2>Curriculum</h2>
          <ul>
            {lessons?.map((lesson) => (
              <li>
                <Card>
                  <div>{lesson.title}</div>
                  <div>{lesson.description}</div>
                  <p>
                    TODO: reuse controls for courses here to edit and update
                    lessons
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        <p>TODO: Add controls for CRUD courses</p>
      </div>
    </div>
  );
};

export default Lesson;
