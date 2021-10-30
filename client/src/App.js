import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Classroom from './routes/Classroom';
import Planner from './routes/Planner';
import StudySession from './routes/StudySession';
import Login from './routes/Login';
import Register from './routes/Register';

// TODO: flesh this out
const isTeacher = true;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/login"
          component={(props) =>
            !isAuthenticated ? (
              <Login {...{ props }} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/register"
          component={(props) =>
            !isAuthenticated ? (
              <Register {...{ props }} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/dashboard"
          component={
            (props) =>
              !isAuthenticated ? (
                <Login {...{ props }} />
              ) : (
                <Redirect to="/dashboard" />
              )
            // TODO
            // isTeacher ? (
            //   <Planner {...{ props }} />
            // ) : (
            //   <Classroom {...{ props }} />
            // )
          }
        />
        <Route
          exact
          path="/study-session"
          component={(props) =>
            isAuthenticated ? (
              <StudySession {...{ props }} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
