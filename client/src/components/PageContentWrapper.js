import React from 'react';

import Navigation from './Navigation';

const PageContentWrapper = ({ children, ...props }) => {
  return (
    <>
      <Navigation {...props} />
      <main className="max-w-xl mx-auto py-10">{children}</main>;
    </>
  );
};

export default PageContentWrapper;
