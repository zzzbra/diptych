import React from 'react';
import { useGetCardsQuery } from 'services/cards';
import { LessonOverviewArgs } from 'models';
import Card from 'components/Card';

const Planner = ({ courseId, lessonId }: LessonOverviewArgs) => {
  console.log(courseId, lessonId);
  const { data: cards = [] } = useGetCardsQuery({ lessonId });

  /**
   * cards belong to a lesson  some are presentational and others are question
   * cards; when a student is going through a lesson they are shown both;
   *
   * every card waits on their response before advancing to the next card
   *
   * when a student is done with a lesson, they click a CTA that takes them back
   * to their dashboard and adds all the question type cards to their 'deck'
   *
   * their deck is a join table between students and cards that additionally
   * tracks metrics around how well the students is learning the information in
   * the card
   *
   * each existing card should have an edit and delete button that only teachers
   * can see
   *
   * a teacher should be able to add a new card and specify the index (we'll do
   * this instead of having a propert linked list)
   * */

  // const cards = [
  //   {
  //     cardId: '1'
  //   }
  // ];

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
