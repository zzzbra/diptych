import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

// Might handle these in dashboard view
// import Classroom from './routes/Classroom';
import Planner from './routes/Planner';
import StudySession from './routes/StudySession';
import Login from './routes/Login';
import Register from './routes/Register';
import PageContentWrapper from './components/PageContentWrapper';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <PageContentWrapper {...{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            component={(props) =>
              !isAuthenticated ? (
                <Login {...props} {...{ setIsAuthenticated }} />
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
                <Register {...props} {...{ setIsAuthenticated }} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            component={(props) =>
              // TODO
              // isTeacher ? (
              //   <Planner {...{ props }} />
              // ) : (
              //   <Classroom {...{ props }} />
              // )
              isAuthenticated ? (
                <Planner {...props} {...{ setIsAuthenticated }} />
              ) : (
                <Redirect to="/login" />
              )
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
    </PageContentWrapper>
  );
}

export default App;
