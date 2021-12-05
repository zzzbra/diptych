import axios, { AxiosRequestConfig } from 'axios';
import get from 'lodash/get';

import baseApi from './baseApi';
import { CARD_TAG_TYPE, LESSON_TAG_TYPE } from 'tagTypes';
import { Card } from 'models';
import { getToken } from 'features/auth/utils';
import { baseUrl } from 'services/baseApi';

interface GetCardsArgs {
  lessonId: string;
}

interface GetCardArgs {
  cardId: string;
}

interface GetSpecificCardArgs {
  cardIds: string[];
}

export interface CardMutationArgs {
  cardId: string;
  lessonId: string;
  front: string;
  back?: string;
  isCardReviewable?: boolean;
  prevCardId?: string;
}
export interface AddCardMutationArgs {
  lessonId: string;
  front: string;
  back?: string;
  isCardReviewable?: boolean;
  prevCardId?: string;
}

export const defaultNewCardArgs = {
  cardId: '',
  lessonId: '',
  front: '',
  back: undefined,
  isQuestionCard: false,
  prevCardId: undefined,
};

export interface DeleteCardArgs {
  cardId: string;
}

const cardsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCards: build.query<Card[], void>({
      query: () => {
        return {
          url: 'v1/cards',
          method: 'get',
        };
      },
      providesTags: [CARD_TAG_TYPE, LESSON_TAG_TYPE],
    }),
    getCardsFromLesson: build.query<Card[], GetCardsArgs>({
      query: (data) => {
        return {
          url: `v1/cards?lessonId=${data.lessonId}`,
          method: 'get',
        };
      },
      providesTags: [CARD_TAG_TYPE, LESSON_TAG_TYPE],
    }),
    getSpecificCards: build.query<Card[], GetSpecificCardArgs>({
      async queryFn(args, { getState }, _extraOptions) {
        const { cardIds } = args;

        let headers: AxiosRequestConfig['headers'] = {};
        const state = getState();
        const token = get(state, 'auth.token') || getToken();

        if (token) {
          headers.token = token;
        }

        try {
          const allResults = await Promise.all(
            cardIds.map(async (cardId) => {
              const path = `v1/cards/${cardId}`;
              const url = baseUrl + path;
              const result = await axios({
                url,
                method: 'get',
                headers,
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
      providesTags: [CARD_TAG_TYPE, LESSON_TAG_TYPE],
    }),
    getCard: build.query<Card, GetCardArgs>({
      query: ({ cardId }) => {
        return {
          url: `v1/cards/${cardId}`,
          method: 'get',
        };
      },
      providesTags: [CARD_TAG_TYPE],
    }),
    addNewCard: build.mutation<Card, AddCardMutationArgs>({
      query: (data) => ({
        url: 'v1/cards',
        method: 'post',
        data,
      }),
      invalidatesTags: [CARD_TAG_TYPE, LESSON_TAG_TYPE],
    }),
    updateCard: build.mutation<Card, CardMutationArgs>({
      query: ({
        cardId,
        lessonId,
        front,
        back,
        isCardReviewable,
      }: CardMutationArgs = defaultNewCardArgs) => ({
        url: `v1/cards/${cardId}`,
        method: 'put',
        data: { front, lessonId, back, isCardReviewable },
      }),
      invalidatesTags: [CARD_TAG_TYPE],
    }),
    deleteCard: build.mutation<Card[], DeleteCardArgs>({
      query: ({ cardId }) => ({
        url: `v1/cards/${cardId}`,
        method: 'delete',
      }),
      invalidatesTags: [CARD_TAG_TYPE],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetCardsFromLessonQuery,
  useGetSpecificCardsQuery,
  useGetCardQuery,
  useAddNewCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = cardsApi;
