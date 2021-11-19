import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import { PrivateRoute } from 'views/PrivateRoute';
import Dashboard from 'views/Dashboard/index';
// import StudySession from 'views/StudySession';
import Login from 'views/Login';
import Signup from 'views/Signup';
import TeacherRegistrar from 'views/Registrar/TeacherView';
import StudentRegistrar from 'views/Registrar/StudentView';
// import Lesson from 'views/Lesson';
// import CourseOverview from 'views/CourseOverview';

import PageContentWrapper from 'components/PageContentWrapper';

import { useAuth } from 'features/auth/hooks';
// import { clearToken, getToken } from 'features/auth/utils';
// import { setCredentials } from 'features/auth/auth.slice';
// import { useIsAuthenticatedQuery } from 'services/auth';

function App() {
  const auth = useAuth();

  // const dispatch = useDispatch();
  // const shouldRefetch = !auth?.isAuthenticated && !!getToken();

  // const {
  //   data: authData,
  //   isError,
  //   error,
  // } = useIsAuthenticatedQuery(undefined, {
  //   skip: !shouldRefetch,
  // });

  // if (isError && error?.message === 'jwt expired') {
  //   clearToken();
  // }

  // if (shouldRefetch && authData) {
  //   // FIXME this causes error on redirect
  //   dispatch(setCredentials(authData));
  // }

  // const { isAuthenticated = false } = auth || authData || {};
  const { isAuthenticated = false, user } = auth;

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
            path="/signup"
            component={(props: any) =>
              !isAuthenticated ? (
                <Signup {...props} />
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
            path="/registrar"
            component={(props: any) => {
              if (!isAuthenticated) {
                return <Redirect to="/login" />;
              }

              return user?.userIsTeacher ? (
                <TeacherRegistrar {...props} />
              ) : (
                <StudentRegistrar {...props} />
              );
            }}
          />
        </Switch>
      </PageContentWrapper>
    </Router>
  );
}

export default App;
