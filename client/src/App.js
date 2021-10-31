import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

// Might handle these in dashboard view
import Dashboard from './routes/Dashboard';
import StudySession from './routes/StudySession';
import Login from './routes/Login';
import Register from './routes/Register';
import PageContentWrapper from './components/PageContentWrapper';

import { isAuthorized } from './apis/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      const authStatus = await isAuthorized();
      setIsAuthenticated(authStatus);
    };

    checkAuthorization();
  }, []);

  return (
    <PageContentWrapper {...{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
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
              isAuthenticated ? (
                <Dashboard {...props} {...{ setIsAuthenticated }} />
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
