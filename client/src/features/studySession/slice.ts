import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
// import { AuthResponse, User } from 'models';
import { StudySessionState } from './interface';

const emptyState = {
  cards: [],
  currentCardIndex: -1,
  reviews: [],
};

const studySessionSlice = createSlice({
  name: 'studySession',
  initialState: emptyState as StudySessionState,
  reducers: {
    start: (state, { payload: { unsortedCards, mode, reviews } }) => {},
    showAnswer: (state) => {},
    showNextCard: (state) => {
      // check if a new review was just created
    },
    setRating: (
      state,
      { payload: { recalled = true } }: PayloadAction<{ recalled: boolean }>,
    ) => {
      // use currentCardIndex to update the current cards rating
    },
    finish: (state) => {
      // check if a new review should be created
      state = emptyState;
    },
  },
});

export const { start, finish } = studySessionSlice.actions;

export const selectCards = (state: RootState) => state.studySession.cards;
// export const selectCurrentUserAuth = (state: RootState) => state.auth;
// export const useCheckIsAuthenticated = () =>
//   useSelector((state: RootState) => state.auth.isAuthenticated);

export default studySessionSlice.reducer;
