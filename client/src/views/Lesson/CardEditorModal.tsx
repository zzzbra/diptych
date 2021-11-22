import React, { useState } from 'react';

import Modal, { ModalProps } from 'components/Modal';
import Input from 'components/Input';
import { Card } from 'models';
import { CardMutationArgs } from 'services/cards';

interface LimitedModalProps {
  confirmButtonText: string;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

interface CardEditorProps {
  cardProperties: Card;
  onCardMutation: (cardProps: CardMutationArgs) => void;
  modalProps: LimitedModalProps;
}

const CardEditorModal = ({
  cardProperties,
  onCardMutation,
  modalProps,
}: CardEditorProps) => {
  const [formState, setFormState] = useState<CardMutationArgs>(cardProperties);
  console.log('rendering', { formState });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setFormState({
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  return (
    <Modal
      {...{
        onConfirmation: () => onCardMutation(formState),
        ...modalProps,
      }}
    >
      <div className="py-3">
        <Input
          label="Front"
          id="card-front-input"
          name="front"
          onChange={handleInputChange}
          value={formState.front}
        />
      </div>
      <div className="py-3">
        <Input
          label="Back"
          id="card-back-input"
          name="back"
          onChange={handleInputChange}
          value={formState.back}
        />
      </div>
      {/* TODO:
       * allow for card type to be changed
       * allow for card position to be updated */}
    </Modal>
  );
};

export default CardEditorModal;
