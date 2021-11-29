import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { AuthResponse, User } from 'models';

type AuthState = {
  user: User | null;
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
      { payload: { user, token } }: PayloadAction<AuthResponse>,
    ) => {
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUserAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
