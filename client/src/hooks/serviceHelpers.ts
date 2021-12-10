import { Card, Review, MyAxiosErrorResponse } from 'models';
import { useGetSpecificCardsQuery } from 'services/cards';
import { useGetReviewsQuery } from 'services/reviews';

interface GetSpecificReviewCardsQueryArgs {
  reviewsFilter?: (review: Review) => boolean;
}

type ReviewFields = {
  dueDate?: string;
  rating?: number;
};

type ReviewCard = Card & ReviewFields;

type UseGetSpecificReviewCardsQueryResponse = {
  data?: Array<ReviewCard>;
  error: MyAxiosErrorResponse | undefined;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
};

const useGetSpecificReviewCardsQuery = ({
  reviewsFilter,
}: GetSpecificReviewCardsQueryArgs): UseGetSpecificReviewCardsQueryResponse => {
  const {
    data: studentReviews = [],
    error,
    isError,
    isFetching,
    isLoading,
  } = useGetReviewsQuery();

  const reviews =
    reviewsFilter === undefined
      ? studentReviews
      : studentReviews.filter(reviewsFilter);
  const cardIds = reviews.map(({ cardId }) => cardId);

  const {
    data: cardsForReview = [],
    error: customError,
    isError: isCustomError,
    isFetching: isCustomFetching,
    isLoading: isCustomLoading,
  } = useGetSpecificCardsQuery({ cardIds }, { skip: isLoading });

  const data = cardsForReview.map((card) => {
    const review = studentReviews.find(({ cardId }) => cardId === card.cardId);

    return {
      ...card,
      dueDate: review?.dueDate,
      rating: review?.rating,
    };
  });

  return {
    data,
    error: error || customError,
    isError: isError || isCustomError,
    isFetching: isFetching || isCustomFetching,
    isLoading: isLoading || isCustomLoading,
  };
};

export { useGetSpecificReviewCardsQuery };
