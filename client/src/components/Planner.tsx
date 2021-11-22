import React from 'react';
import { useGetCardsFromLessonQuery } from 'services/cards';
import { LessonOverviewArgs } from 'models';
import Card from 'components/Card';

const Planner = ({ courseId, lessonId }: LessonOverviewArgs) => {
  const { data: cards = [] } = useGetCardsFromLessonQuery({ lessonId });

  return (
    <div>
      <section className="py-8">
        <h2 className="pb-10">Current Lesson Overview</h2>
        <ol>
          {cards?.map((card, key) => {
            return (
              <li>
                <span className="text-xl pb-4 inline-block">Card #{key}</span>
                <Card>{card.front}</Card>
              </li>
            );
          })}
        </ol>
      </section>

      <section>
        <h2 className="pb-10">Add Cards</h2>
        <ul>
          <li>create generic modal</li>
          <li>create generic form for inputting data</li>
        </ul>
      </section>
    </div>
  );
};

export default Planner;
