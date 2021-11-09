import { useSelector } from 'react-redux';
import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../models';

// note: already have UserProfile type
// interface User {
//   userName: string;
//   userEmail: string;
// }

type AuthState = {
  user: UserProfile | null;
  token: string | null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: UserProfile; token: string }>,
    ) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const useCheckIsAuthenticated = () =>
  useSelector((state: RootState) => !!state.auth.token);

//--------------------------------------------------
// import axios from 'axios';
// import { getToken } from './utils';

// // TODO: set up FE env variables
// // const protocol = process.env.SERVER_PROTOCOL || 'http';
// // const host = process.env.SERVER_HOST || 'localhost';
// // const port = process.env.SERVER_PORT || '5000';
// const protocol = 'http';
// const host = 'localhost';
// const port = '5000';

// const authAPI = axios.create({
//   baseURL: `${protocol}://${host}:${port}/api/v1/auth`,
// });

// export const isAuthorized = async () => {
//   try {
//     const { data } = await authAPI.get('/is-authenticated', {
//       headers: {
//         token: getToken(),
//       },
//     });

//     return data;
//   } catch (error: any) {
//     console.error('GET is-authenticated:', error);
//   }
// };

// export default authAPI;
// -------------------------------------------------------------------------
