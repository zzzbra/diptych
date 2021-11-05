import { ApiErrorResponse } from './../../models/index';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utils/auth';
import get from 'lodash/get';

// TODO: set up FE env variables
const protocol = 'http';
const host = 'localhost';
const port = '5000';
const baseUrl = `${protocol}://${host}:${port}/api/`;

// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries
const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown, // "Result"
    ApiErrorResponse // "Error" - prev type 'unknown'
  > =>
  async ({ url, method, data, headers = {} }, { getState }) => {
    // Assuming auth is always required for now...
    // Figure out a better approach here later.
    const state = getState();
    console.log('state: ', state);
    const token = get(state, 'auth.token') || getToken();

    if (token) {
      headers.token = token;
    }

    try {
      const result = await axios({ url: baseUrl + url, method, data, headers });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
        },
      };
    }
  };

const baseApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl }),
  endpoints: () => ({}),
});

export default baseApi;
