import baseApi from './baseApi';
import {
  AuthResponse,
  LoginParameters,
  RegistrationParameters,
  User,
} from 'models';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<AuthResponse, RegistrationParameters>({
      query: (userRegistrationInfo) => ({
        url: 'v1/auth/register',
        method: 'post',
        data: userRegistrationInfo,
      }),
    }),
    login: build.mutation<AuthResponse, LoginParameters>({
      query: (userCredentials) => {
        console.log(userCredentials);
        return {
          url: 'v1/auth/login',
          method: 'post',
          data: userCredentials,
        };
      },
    }),
    getUser: build.query<AuthResponse, void>({
      query: () => ({
        url: 'v1/auth/is-authenticated',
        method: 'get',
      }),
    }),
    getStudents: build.query<User[], void>({
      query: () => ({
        url: 'v1/auth/get-students',
        method: 'get',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetUserQuery,
  useGetStudentsQuery,
} = authApi;
