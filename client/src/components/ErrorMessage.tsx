import React from 'react';

const ErrorMessage = ({ error }: any) => {
  console.error(error);
  return (
    <div>
      <h3 className="text-red-600">Something went wrong.</h3>
    </div>
  );
};

export default ErrorMessage;
