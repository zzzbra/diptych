import baseApi from './baseApi';
import { REVIEW_TAG_TYPE } from 'tagTypes';
import { Review } from 'models';

interface GetReviewArgs {
  reviewId: string;
}

export interface UpdateReviewArgs {
  reviewId: string;
  rating: number;
  dueDate: string;
}

export interface AddReviewArgs {
  cardId: string;
  lessonId: string;
}

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
    // addNewReviews: build.mutation<Review, AddReviewArgs>({
    //   query: (data) => ({
    //     url: 'v1/reviews',
    //     method: 'post',
    //     data,
    //   }),
    // }),
    updateReview: build.mutation<Review, UpdateReviewArgs>({
      query: ({ reviewId, rating, dueDate }: UpdateReviewArgs) => ({
        url: `v1/review/${reviewId}`,
        method: 'put',
        data: { rating, dueDate },
      }),
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
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
