import baseApi from './baseApi';
import { CARD_TAG_TYPE, LESSON_TAG_TYPE } from 'tagTypes';
import { Card } from 'models';

interface GetCardsArgs {
  lessonId: string;
}

interface GetCardArgs {
  cardId: string;
  // lessonId: string;
}

export interface CardMutationArgs {
  cardId: string;
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
  // lessonId: string;
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
    getCard: build.query<Card, GetCardArgs>({
      query: ({ cardId }) => {
        return {
          url: `v1/cards/${cardId}`,
          method: 'get',
        };
      },
      providesTags: [CARD_TAG_TYPE],
    }),
    addNewCard: build.mutation<Card, CardMutationArgs>({
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
  useGetCardQuery,
  useAddNewCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = cardsApi;
