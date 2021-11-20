import baseApi from './baseApi';
import { AuthResponse, LoginParameters, RegistrationParameters } from 'models';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<AuthResponse, RegistrationParameters>({
      query: (userRegistrationInfo) => ({
        url: 'v1/auth/register',
        method: 'post',
        data: userRegistrationInfo,
      }),
    }),
    getUser: build.query<AuthResponse, void>({
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

export const { useLoginMutation, useRegistrationMutation, useGetUserQuery } =
  authApi;
