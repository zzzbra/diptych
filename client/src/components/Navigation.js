import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/outline';

import Button from './Button';

const Navigation = ({ isAuthenticated, setIsAuthenticated, userName }) => {
  console.log({ isAuthenticated });
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
              // TODO: create portable logout method from this
              localStorage.removeItem('token');
              setIsAuthenticated(!isAuthenticated);
            }}
          >
            Log Out
          </Button>
        ) : (
          <Button onClick={() => (window.location = '/login')}>Log in</Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
