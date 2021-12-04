import { Card, Review } from 'models';

export type CardPlayerMode = 'LESSON' | 'REPLAY' | 'REVIEW';

export interface CardPlayerProps {
  cards: Array<Card>;
  mode: CardPlayerMode;
  reviews?: Array<Review>;
  lessonId?: string;
}

export type StudySessionStatus =
  | 'NOT_STARTED'
  | 'FINISHED'
  | 'PENDING_NEXT_CARD'
  | 'PENDING_BACK_REVEAL'
  | 'PENDING_RATING';

export type CardStateStatus =
  | 'INFO_CARD_HIDDEN' // button = "Begin"
  | 'INFO_CARD_COMPLETE' // button = "Next"
  | 'QUESTION_CARD_HIDDEN' // button = "Begin"
  | 'QUESTION_CARD_PENDING_BACK_REVEAL' // buton = 'Show'
  | 'QUESTION_CARD_PENDING_RATING' // buttons = 'yes', 'no'
  | 'QUESTION_CARD_COMPLETE'; // buton = 'Go Back'

export interface CardState {
  cardId: string;
  front: string;
  back?: string;
  status: CardStateStatus;
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
  status: StudySessionStatus;
}
