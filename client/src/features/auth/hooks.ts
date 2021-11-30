import { useEffect } from 'react';
import { useGetUserQuery } from 'services/auth';
import { useSelector, useDispatch } from 'react-redux';

import { getToken, clearToken } from './utils';
import { setCredentials, selectCurrentUserAuth } from './auth.slice';

export const useAuth = () => {
  const authState = useSelector(selectCurrentUserAuth);
  const shouldRefetch = !authState?.isAuthenticated && !!getToken();

  const {
    data: authData,
    isError,
    error,
    isLoading,
  } = useGetUserQuery(undefined, {
    skip: !shouldRefetch,
  });

  if (isError && error?.message === 'jwt expired') {
    clearToken();
  }

  const dispatch = useDispatch();
  useEffect(() => {
    if (shouldRefetch && authData) {
      dispatch(setCredentials(authData));
    }
  }, [dispatch, shouldRefetch, authData]);

  return {
    isLoading: shouldRefetch || isLoading,
    ...authState,
  };
};
