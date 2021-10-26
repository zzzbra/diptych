import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Classroom from './routes/Classroom';
import Planner from './routes/Planner';
import StudySession from './routes/StudySession';

// TODO: flesh this out
const isTeacher = true;

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={isTeacher ? Planner : Classroom}
        />
        <Route exact path="/study-session" component={StudySession} />
      </Switch>
    </Router>
  );
}

export default App;
