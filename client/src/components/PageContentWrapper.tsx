import React from 'react';

import Navigation from './Navigation';

const PageContentWrapper = ({ children, ...props }: any) => {
  return (
    <>
      <Navigation {...props} />
      <main className="container py-10">{children}</main>
    </>
  );
};

export default PageContentWrapper;
