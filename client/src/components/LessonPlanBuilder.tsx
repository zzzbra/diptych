import React from 'react';
import { LessonOverviewArgs } from 'models';

const LessonPlanBuilder = ({ courseId, lessonId }: LessonOverviewArgs) => {
  console.log(courseId, lessonId);

  // const cards = [
  //   {
  //     cardId: '1'
  //   }
  // ];

  return (
    <div>
      <ol>
        <li>view existing cards</li>
        <li>add new cards </li>
        <li>rearrange order of cards</li>
      </ol>
    </div>
  );
};

export default LessonPlanBuilder;
