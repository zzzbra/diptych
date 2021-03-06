import axios, { AxiosError } from 'axios';
import get from 'lodash/get';
import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

import { AxiosArgs, MyAxiosResponse, MyAxiosErrorResponse } from 'models';
import tagTypes from '../tagTypes';
import { getToken } from '../features/auth/utils';

const domain =
  process.env.NODE_ENV === 'production'
    ? 'https://diptych.herokuapp.com'
    : 'http://localhost:5000';

export const baseUrl = `${domain}/api/`;

interface AxiosBaseQueryArgs {
  baseUrl: string;
}

const axiosBaseQuery =
  ({
    baseUrl = '',
  }: AxiosBaseQueryArgs): BaseQueryFn<
    AxiosArgs,
    MyAxiosResponse,
    MyAxiosErrorResponse
  > =>
  async ({ url, method, data, headers = {} }, { getState }) => {
    // Assuming auth is always required for now...
    // Figure out a better approach here later, mybe
    // using prepareHeaders
    const state = getState();
    const token = get(state, 'auth.token') || getToken();

    if (token) {
      headers.token = token;
    }

    try {
      const result = await axios({ url: baseUrl + url, method, data, headers });
      return { data: result.data };
    } catch (error) {
      // FIXME error doesn't appear to have these properties
      let err = error as AxiosError;
      return {
        error: {
          status: err.response?.status,
          message: err.response?.data,
        },
      };
    }
  };

const baseApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl }),
  tagTypes,
  endpoints: () => ({}),
});

export default baseApi;
