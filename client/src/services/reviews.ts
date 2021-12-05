import axios, { AxiosRequestConfig } from 'axios';
import get from 'lodash/get';

import baseApi from './baseApi';
import { baseUrl } from 'services/baseApi';
import { getToken } from 'features/auth/utils';
import { REVIEW_TAG_TYPE } from 'tagTypes';
import { Review } from 'models';

interface GetReviewArgs {
  reviewId: string;
}

export interface AddReviewArgs {
  cardId: string;
  lessonId: string;
}

// https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects
export interface AddReviewsArgs extends Array<AddReviewArgs> {}

export interface UpdateReviewArgs {
  reviewId: string;
  rating: number;
}

export interface UpdateReviewsArgs extends Array<UpdateReviewArgs> {}

export interface DeleteReviewArgs {
  reviewId: string;
}

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query<Review[], void>({
      query: () => {
        return {
          url: 'v1/reviews',
          method: 'get',
        };
      },
      providesTags: [REVIEW_TAG_TYPE],
    }),
    getReview: build.query<Review, GetReviewArgs>({
      query: ({ reviewId }) => {
        return {
          url: `v1/reviews/${reviewId}`,
          method: 'get',
        };
      },
      providesTags: [REVIEW_TAG_TYPE],
    }),
    addNewReview: build.mutation<Review, AddReviewArgs>({
      query: (data) => ({
        url: 'v1/reviews',
        method: 'post',
        data,
      }),
      invalidatesTags: [REVIEW_TAG_TYPE],
    }),
    addNewReviews: build.mutation<Review, AddReviewsArgs>({
      query: (data) => ({
        url: 'v1/reviews',
        method: 'post',
        data,
      }),
    }),
    updateReview: build.mutation<Review, UpdateReviewArgs>({
      query: ({ reviewId, rating }: UpdateReviewArgs) => ({
        url: `v1/review/${reviewId}`,
        method: 'put',
        data: { rating },
      }),
      invalidatesTags: [REVIEW_TAG_TYPE],
    }),
    // not RESTful :/
    updateReviews: build.mutation<Review[], UpdateReviewsArgs>({
      async queryFn(updatedReviews, { getState }, _extraOptions) {
        let headers: AxiosRequestConfig['headers'] = {};
        const state = getState();
        const token = get(state, 'auth.token') || getToken();

        if (token) {
          headers.token = token;
        }

        try {
          const allResults = await Promise.all(
            updatedReviews.map(async ({ reviewId, rating }) => {
              const path = `v1/reviews/${reviewId}`;
              const url = baseUrl + path;
              const result = await axios({
                url,
                method: 'put',
                headers,
                data: { rating },
              });

              return result.data;
            }),
          );

          return { data: allResults };
        } catch (error) {
          let err = error as any;
          return {
            error: {
              status: err.status,
              message: err.data,
            },
          };
        }
      },
      invalidatesTags: [REVIEW_TAG_TYPE],
    }),
    deleteReview: build.mutation<Review[], DeleteReviewArgs>({
      query: ({ reviewId }) => ({
        url: `v1/reviews/${reviewId}`,
        method: 'delete',
      }),
      invalidatesTags: [REVIEW_TAG_TYPE],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewQuery,
  useAddNewReviewMutation,
  useAddNewReviewsMutation,
  useUpdateReviewMutation,
  useUpdateReviewsMutation,
  useDeleteReviewMutation,
} = reviewsApi;
