import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NoAuthOnlyRoute, PrivateRoute } from 'views/PrivateRoute';
import Dashboard from 'views/Dashboard/index';
import Login from 'views/Login';
import Signup from 'views/Signup';
import TeacherRegistrar from 'views/Registrar/TeacherView';
import StudentRegistrar from 'views/Registrar/StudentView';

import PageContentWrapper from 'components/PageContentWrapper';

import { useAuth } from 'features/auth/hooks';

function App() {
  const auth = useAuth();
  const { user } = auth;

  return (
    <Router>
      <PageContentWrapper>
        <Switch>
          <Route exact path="/">
            <h1>Welcome!</h1>
          </Route>

          <NoAuthOnlyRoute exact path="/login">
            <Login />
          </NoAuthOnlyRoute>

          <NoAuthOnlyRoute exact path="/signup">
            <Signup />
          </NoAuthOnlyRoute>

          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>

          <PrivateRoute
            exact
            path="/registrar"
            render={(props: any) => {
              return user?.userIsTeacher ? (
                <TeacherRegistrar {...props} />
              ) : (
                <StudentRegistrar {...props} />
              );
            }}
          />
          <Route path="*" component={() => <h1>Uh Oh! Page not found!!</h1>} />
        </Switch>
      </PageContentWrapper>
    </Router>
  );
}

export default App;
