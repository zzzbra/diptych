import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { DumbModalProps } from 'models';

type ModalStackState = {
  modals: Array<DumbModalProps>;
};

const modalSlice = createSlice({
  name: 'modalStack',
  initialState: {
    modals: [],
  } as ModalStackState,
  reducers: {
    pushModal: ({ modals }, { payload: { modalProps } }) => {
      modals.push(modalProps);
    },
    popModal: ({ modals }) => {
      modals.pop();
    },
    clearModals: ({ modals }) => {
      modals = [];
    },
  },
});

export const { popModal, pushModal, clearModals } = modalSlice.actions;

export const selectCurrentModal = (state: RootState) =>
  state.modalStack.modals[0];
export const useSelectCurrentModal = () => useSelector(selectCurrentModal);

export const useSelectAllModals = () =>
  useSelector((state: RootState) => state.modalStack.modals);

export default modalSlice.reducer;
