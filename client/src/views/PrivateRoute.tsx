import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks';

export function PrivateRoute({ children, ...rest }: RouteProps) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export function UnauthOnlyRoute({ children, ...rest }: RouteProps) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/dashboard',
            }}
          />
        )
      }
    />
  );
}
