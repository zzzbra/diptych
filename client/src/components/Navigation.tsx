import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/outline';
import { useHistory } from 'react-router';

import Button from './Button';
import { useCheckIsAuthenticated } from '../features/auth/auth.slice';

const Navigation = () => {
  const history = useHistory();
  const isAuthenticated = useCheckIsAuthenticated();

  return (
    <nav className="py-5 border-b-2">
      <div className="max-w-2xl mx-auto flex justify-between">
        <span className="flex items-center">
          <AcademicCapIcon className="w-10" />
          <span className="ml-2">MOOC-SRS</span>
        </span>
        {isAuthenticated ? (
          <Button
            onClick={() => {
              console.log('TODO');
              // clearToken();
              // TODO: include update ot global state with clearToken action
              // setIsAuthenticated(false);
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
