import React from 'react';
import { useDispatch } from 'react-redux';
import { AcademicCapIcon } from '@heroicons/react/outline';
import { Link, useHistory } from 'react-router-dom';

import Button from 'components/Button';
import { logOut } from 'features/auth/auth.slice';
import { clearToken } from 'features/auth/utils';
import { useAuth } from 'features/auth/hooks';

const Navigation = () => {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <nav className="py-5 border-b-2">
      <div className="container flex justify-between">
        <Link to="/dashboard" className="flex items-center">
          <AcademicCapIcon className="w-10" />
          <span className="ml-2">Diptych</span>
        </Link>
        {isAuthenticated ? (
          <span>
            <span className="pr-4">Hi, {user?.userName}</span>
            <Button
              onClick={() => {
                clearToken();
                dispatch(logOut());
              }}
            >
              Log Out
            </Button>
          </span>
        ) : (
          <Button onClick={() => history.push('/login')}>Log in</Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
