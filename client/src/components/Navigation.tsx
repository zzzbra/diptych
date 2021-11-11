import React from 'react';
import { useDispatch } from 'react-redux';
import { AcademicCapIcon } from '@heroicons/react/outline';
import { Link, useHistory } from 'react-router-dom';

import Button from './Button';
import { useCheckIsAuthenticated } from '../features/auth/auth.slice';
import { logOut } from '../features/auth/auth.slice';
import { clearToken, getToken } from '../features/auth/utils';

const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useCheckIsAuthenticated() || !!getToken();

  return (
    <nav className="py-5 border-b-2">
      <div className="max-w-2xl mx-auto flex justify-between">
        <Link to="/dashboard" className="flex items-center">
          <AcademicCapIcon className="w-10" />
          <span className="ml-2">MOOC-SRS</span>
        </Link>
        {isAuthenticated ? (
          <Button
            onClick={() => {
              clearToken();
              dispatch(logOut());
            }}
          >
            Log Out
          </Button>
        ) : (
          <Button onClick={() => history.push('/login')}>Log in</Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
