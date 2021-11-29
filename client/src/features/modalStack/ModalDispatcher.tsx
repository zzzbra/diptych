import React from 'react';
import { useSelectAllModals } from './modalStack.slice';
import { useDispatch } from 'react-redux';
import GenericModal from './components/GenericModal';
import CardEditorModal from 'views/Lesson/CardEditorModal';

const ModalDispatcher = () => {
  const [currentModal] = useSelectAllModals();
  const { modalType = '', ...currentModalProps } = currentModal;
  // const dispatch = useDispatch();

  const dispatchTable = {
    cardEditor: CardEditorModal,
    default: GenericModal,
  };

  const Component = dispatchTable.default;
  // const Component = dispatchTable.hasOwnProperty(modalType)
  //   ? dispatchTable[modalType]
  //   : dispatchTable.default;

  return (
    <Component
      {...currentModalProps}
      {...{ isOpen: !!currentModal, setIsOpen: () => {} }}
    />
  );
};

export default ModalDispatcher;
