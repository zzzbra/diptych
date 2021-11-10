import { useSelector } from 'react-redux';
import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../models';

type AuthState = {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: UserProfile; token: string }>,
    ) => {
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserAuth = (state: RootState) => state.auth;

export const useCheckIsAuthenticated = () =>
  useSelector((state: RootState) => state.auth.isAuthenticated);
