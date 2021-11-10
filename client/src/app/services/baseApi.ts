import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import get from 'lodash/get';
import {
  createApi,
  BaseQueryFn,
  // fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import tagTypes from '../tagTypes';
import { getToken } from '../../features/auth/utils';

// TODO: set up FE env variables
const protocol = 'http';
const host = 'localhost';
const port = '5000';
const baseUrl = `${protocol}://${host}:${port}/api/`;

// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries
type AxiosArgs = {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  headers?: AxiosRequestConfig['headers'];
};

type MyAxiosResponse = {
  data: any;
};

export interface MyAxiosErrorResponse {
  code?: string;
  message?: string;
}

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<AxiosArgs, MyAxiosResponse, MyAxiosErrorResponse> =>
  async ({ url, method, data, headers = {} }, { getState }) => {
    // Assuming auth is always required for now...
    // Figure out a better approach here later, maybe
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
      let err = error as AxiosError;
      // needs to return Serialized error?
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
