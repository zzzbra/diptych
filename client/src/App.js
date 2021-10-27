import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Classroom from './routes/Classroom';
import Planner from './routes/Planner';
import StudySession from './routes/StudySession';
import Login from './routes/Login';
import Register from './routes/Register';

// TODO: flesh this out
const isTeacher = true;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={isTeacher ? Planner : Classroom} />
        <Route exact path="/study-session" component={StudySession} />
      </Switch>
    </Router>
  );
}

export default App;
