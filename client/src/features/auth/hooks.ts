import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentUserAuth } from './auth.slice';

export const useAuth = () => {
  const auth = useSelector(selectCurrentUserAuth);

  return useMemo(() => auth, [auth]);
};
