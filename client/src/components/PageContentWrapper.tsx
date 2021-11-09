import React from 'react';

import Navigation from './Navigation';

const PageContentWrapper = ({ children, ...props }: any) => {
  return (
    <>
      <Navigation {...props} />
      <main className="max-w-2xl mx-auto py-10">{children}</main>
    </>
  );
};

export default PageContentWrapper;
