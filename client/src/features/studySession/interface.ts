import { Card, Review } from 'models';

export type CardPlayerMode = 'LESSON' | 'REPLAY' | 'REVIEW';

export interface CardPlayerProps {
  cards: Array<Card>;
  mode: CardPlayerMode;
  reviews?: Array<Review>;
  lessonId?: string;
}

export interface CardState {
  cardId: string;
  front: string;
  back?: string;
  isHidden: boolean;
  isPendingBackReveal: boolean;
  isPendingRating: boolean;
  isLastCard: boolean;
}

export interface ReviewState {
  reviewId?: string; // no review Id for new reviews
  cardId: string;
  // lessonId needed for adding reviews so that we can easily reference a lesson that
  // should be retaken
  lessonId: string;
  rating: number;
}

export interface StudySessionState {
  currentCardIndex: number;
  cards: Array<CardState>;
  reviews: Array<ReviewState>;
}
