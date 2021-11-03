import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from './store';

const GlobalProviders = ({ children }) => {
  return <ReduxProvider {...{ store }}>{children}</ReduxProvider>;
};

export default GlobalProviders;
