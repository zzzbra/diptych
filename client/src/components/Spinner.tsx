import classNames from 'classnames';
import React from 'react';

interface SpinnerProps {
  isInline?: boolean;
  isFullPage?: boolean;
}

const Spinner = ({ isInline = false, isFullPage = false }: SpinnerProps) => {
  return (
    <div
      className={classNames({
        'h-full flex justify-center items-center': isFullPage,
        'w-full text-center': !isFullPage,
      })}
    >
      <div
        className={classNames(
          'inline-block loader ease-linear rounded-full border-gray-200 border-top-co',
          {
            'h-8 w-8 m-4 border-2 border-t-2 ': isInline,
            'h-16 w-16 m-8 border-4 border-t-4': !isInline && !isFullPage,
            'h-32 w-32 m-16 border-8 border-t-8': isFullPage,
          },
        )}
      ></div>
    </div>
  );
};

export default Spinner;
