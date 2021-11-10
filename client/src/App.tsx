import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
// import { useDispatch } from 'react-redux';

import Dashboard from './routes/Dashboard';
import StudySession from './routes/StudySession';
import Login from './routes/Login';
import Register from './routes/Register';

import PageContentWrapper from './components/PageContentWrapper';
import { useAuth } from './features/auth/hooks';
// import { getToken } from './features/auth/utils';
// import { setCredentials } from './features/auth/auth.slice';
// import { useIsAuthenticatedQuery } from './app/services/auth';

function App() {
  const auth = useAuth();
  const { isAuthenticated } = auth;
  // const dispatch = useDispatch();
  // const shouldRefetch = !auth?.isAuthenticated && !!getToken();

  // const { data: authData } = useIsAuthenticatedQuery(undefined, {
  //   skip: shouldRefetch,
  // });

  // if (shouldRefetch && authData) {
  //   dispatch(setCredentials(authData));
  // }

  // const { isAuthenticated } = auth || authData || {};

  return (
    <Router>
      <PageContentWrapper>
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
      </PageContentWrapper>
    </Router>
  );
}

export default App;
