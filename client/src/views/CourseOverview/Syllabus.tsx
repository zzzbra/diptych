import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router';

import { useGetLessonsInCourseQuery } from 'services/lessons';
import Link from 'components/Link';

interface CourseOverviewProps {
  courseId: string;
}

const CourseOverview = (props: any) => {
  const { courseId } = useParams<CourseOverviewProps>();
  const {
    data: lessons = [],
    error,
    isError,
    isFetching,
    isLoading,
  } = useGetLessonsInCourseQuery({ courseId });

  if (isError) {
    console.log({ error });
  }
  return isLoading || isFetching ? (
    <div>Loading</div>
  ) : (
    <div>
      <h1 className="pb-4">Course Title</h1>
      <h2 className="pb-4">Lessons</h2>
      <ul>
        {lessons.map((lesson, key) => (
          <li
            className={classNames('rounded p-6 border-2', { 'mt-2': !!key })}
            key={lesson.lessonId}
          >
            <span className="flex justify-between align-baseline">
              <span>
                <Link to={`/lessons/${lesson.lessonId}`}>{lesson.title}</Link>
                <p className="mt-4 pr-4">{lesson.description}</p>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseOverview;
