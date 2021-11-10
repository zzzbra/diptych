// import React, { useEffect, useState } from 'react';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Dashboard from './routes/Dashboard';
import StudySession from './routes/StudySession';
import Login from './routes/Login';
import Register from './routes/Register';
import PageContentWrapper from './components/PageContentWrapper';

import { useAuth } from './features/auth/hooks';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <PageContentWrapper>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={(props: any) =>
              !isAuthenticated ? (
                <Login {...props} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/login"
            component={(props: any) =>
              !isAuthenticated ? (
                <Login {...props} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/register"
            component={(props: any) =>
              !isAuthenticated ? (
                <Register {...props} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            component={(props: any) =>
              isAuthenticated ? (
                <Dashboard {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/study-session"
            component={(props: any) =>
              isAuthenticated ? (
                <StudySession {...props} />
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
