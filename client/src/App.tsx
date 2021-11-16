import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Dashboard from './routes/Dashboard';
import StudySession from './routes/StudySession';
import Login from './routes/Login';
import Register from './routes/Register';
import Lesson from './routes/Lesson';

import PageContentWrapper from './components/PageContentWrapper';
import { useAuth } from './features/auth/hooks';
import { clearToken, getToken } from './features/auth/utils';
import { setCredentials } from './features/auth/auth.slice';
import { useIsAuthenticatedQuery } from './app/services/auth';
import CourseOverview from './routes/CourseOverview';

function App() {
  const auth = useAuth();

  const dispatch = useDispatch();
  const shouldRefetch = !auth?.isAuthenticated && !!getToken();

  const {
    data: authData,
    isError,
    error,
  } = useIsAuthenticatedQuery(undefined, {
    skip: !shouldRefetch,
  });

  if (isError && error?.message === 'jwt expired') {
    clearToken();
  }

  if (shouldRefetch && authData) {
    // FIXME this causes error on redirect
    dispatch(setCredentials(authData));
  }

  const { isAuthenticated = false } = auth || authData || {};

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
            component={(props: any) => {
              return isAuthenticated ? (
                <Dashboard {...props} />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route
            exact
            path="/courses/:courseId" // TODO: add redirect for null params to this view
            component={(props: any) => {
              return isAuthenticated ? (
                <CourseOverview {...props} />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route
            exact
            path="/courses/:courseId/lessons/:lessonId" // TODO: add redirect for null params to this view
            component={(props: any) => {
              return isAuthenticated ? (
                <Lesson {...props} />
              ) : (
                <Redirect to="/login" />
              );
            }}
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
