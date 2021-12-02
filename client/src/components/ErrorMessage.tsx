import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

const ErrorMessage = ({ error }: any) => {
  console.error(error);
  return (
    <div className="border-2 border-red-600 p-4 flex flex-row items-middle">
      <ExclamationCircleIcon className="text-red-600 w-6 mr-2" />
      <h3 className="text-red-600 pb-0 inline">Something went wrong.</h3>
    </div>
  );
};

export default ErrorMessage;
