// import React, { useEffect, useState } from 'react';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Might handle these in dashboard view
import Dashboard from './routes/Dashboard';
import StudySession from './routes/StudySession';
import Login from './routes/Login';
import Register from './routes/Register';
import PageContentWrapper from './components/PageContentWrapper';

import { useIsAuthenticatedQuery } from './app/services/auth';

import {
  incrementCounter,
  decrementCounter,
} from './features/counter/counter.slice';
import Button from './components/Button';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { count } = useSelector((state: any) => state.counter);
  console.log(count);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkAuthorization = async () => {
  //     const authStatus = await isAuthorized();
  //     setIsAuthenticated(authStatus);
  //   };

  //   checkAuthorization();
  // }, []);

  // FIXME!
  const { data: isAuthenticated } = useIsAuthenticatedQuery();

  return (
    <PageContentWrapper>
      Counter: {count}
      <Button onClick={() => dispatch(incrementCounter())}>+</Button>
      <Button onClick={() => dispatch(decrementCounter())}>-</Button>
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
