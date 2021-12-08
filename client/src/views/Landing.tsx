import React from 'react';
import Link from 'components/Link';

const Landing = () => {
  return (
    <div>
      <h2>Welcome!</h2>
      <h1>This is Diptych.</h1>
      <h2>Get ready to learn better than ever.</h2>
      <section className="pt-8">
        <h3>What is a diptych?</h3>
        <p>
          In ancient Rome, students would use a tablet made of wood and covered
          with a layer of wax, often linked loosely to a cover tablet, as a
          "double-leaved" diptych. Wax allowed them to take down notes as
          needed, and to practice texts for memorization.
        </p>

        <p>
          In the same way those wax tablets captured lecture notes and helped
          students study, Diptych intends to serve as a platform for teachers to
          design course and lecture materials and for students to practice
          independent self-study of that material.
        </p>
      </section>
      Click <Link to="/signup">here</Link> to get started.
    </div>
  );
};

export default Landing;
