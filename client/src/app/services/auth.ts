import {
  AuthResponse,
  IsAuthenticatedResponse,
  LoginParameters,
  RegistrationParameters,
} from '../../models';
import baseApi from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<AuthResponse, RegistrationParameters>({
      query: (userRegistrationInfo) => ({
        url: 'v1/auth/register',
        method: 'post',
        data: userRegistrationInfo,
      }),
    }),
    isAuthenticated: build.query<IsAuthenticatedResponse, void>({
      query: () => ({
        url: 'v1/auth/is-authenticated',
        method: 'get',
      }),
    }),
    login: build.mutation<AuthResponse, LoginParameters>({
      query: (userCredentials) => ({
        url: 'v1/auth/login',
        method: 'post',
        data: userCredentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useIsAuthenticatedQuery,
} = authApi;
