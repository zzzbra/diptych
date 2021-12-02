import axios, { AxiosError } from 'axios';
import get from 'lodash/get';
import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

import { AxiosArgs, MyAxiosResponse, MyAxiosErrorResponse } from 'models';
import tagTypes from '../tagTypes';
import { getToken } from '../features/auth/utils';

export const baseUrl = `http://localhost:5000/api/`;

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
    console.log('in axiosBaseQuery fetching', url);
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
