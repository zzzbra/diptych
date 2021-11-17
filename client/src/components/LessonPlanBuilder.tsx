import React from 'react';
import { LessonOverviewArgs } from 'models';

const LessonPlanBuilder = ({ courseId, lessonId }: LessonOverviewArgs) => {
  console.log(courseId, lessonId);
  return (
    <div>
      <ul>
        <li>view existing cards</li>
        <li>add new cards </li>
        <li>rearrange order of cards</li>
      </ul>
    </div>
  );
};

export default LessonPlanBuilder;
