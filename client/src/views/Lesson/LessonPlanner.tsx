import React, { useState } from 'react';
import { useParams } from 'react-router';

import Button from 'components/Button';
import { useGetLessonQuery } from 'services/lessons';
import {
  defaultNewCardArgs,
  useAddNewCardMutation,
  useDeleteCardMutation,
  useGetCardsFromLessonQuery,
  useUpdateCardMutation,
} from 'services/cards';

import { mapSort } from 'utils/linkedList';

import { Card as CardInterface, LessonOverviewArgs } from 'models';
import Card from 'components/Card';
import CardEditorModal from './CardEditorModal';

const LessonPlanner = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [cardToUpdate, setCardToUpdate] =
    useState<CardInterface>(defaultNewCardArgs);

  const { lessonId } = useParams<LessonOverviewArgs>();
  const {
    data: lesson,
    error,
    isError,
    isFetching,
  } = useGetLessonQuery({ lessonId });
  const {
    data: cards,
    error: cardsError,
    isError: isCardsError,
    isFetching: isCardsFetching,
  } = useGetCardsFromLessonQuery({ lessonId });
  const [updateCard] = useUpdateCardMutation();
  const [addCard] = useAddNewCardMutation();
  const [deleteCard] = useDeleteCardMutation();

  if (isCardsError) {
    return <div>{JSON.stringify(cardsError)}</div>;
  }

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const { title, description } = lesson || {};

  return isFetching || isCardsFetching ? (
    <div>Loading</div>
  ) : (
    <div>
      <h1>Lesson Topic: {title}</h1>
      <div className="mt-4">
        <div className="border-b-2 pb-8">
          <h2>Lesson Objectives</h2>
          <ol className="pl-8 list-decimal">
            <li>{description}</li>
          </ol>
        </div>

        <div className="mt-4 py-8">
          <h2>Lesson Script</h2>
          <ul>
            {mapSort(cards ?? [])?.map((card) => (
              <li key={card.cardId}>
                <Card>
                  <div className="pb-8 flex justify-between items-baseline">
                    <span>Card ID: {card.cardId}</span>
                    <span>
                      <Button
                        onClick={() => {
                          setIsUpdateModalOpen(true);
                          setCardToUpdate(card);
                        }}
                      >
                        Edit Card
                      </Button>
                      <Button
                        onClick={() => deleteCard({ cardId: card.cardId })}
                        color="red"
                        className="ml-2"
                      >
                        Delete Card
                      </Button>
                    </span>
                  </div>
                  <div className="pb-2">Front of card:</div>
                  <div className="p-4 rounded border-2">{card.front}</div>
                  {!!card.back && (
                    <div className="mt-8">
                      <div className="pb-2">Back of card:</div>
                      <div className=" p-4 rounded border-2">{card.back}</div>
                    </div>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <Button
            color="green"
            className="items-center inline-block"
            onClick={() => setIsAddModalOpen(true)}
          >
            <span className="inline-block">Create Card</span>
          </Button>
        </div>
      </div>
      {/* TODO: refactor into global state manager for Modals using Redux*/}
      {isUpdateModalOpen && (
        <CardEditorModal
          {...{
            cardProperties: cardToUpdate,
            onCardMutation: updateCard,
            modalProps: {
              title: 'Update Card',
              confirmButtonText: 'Confirm',
              dismissButtonText: 'Cancel',
              isOpen: isUpdateModalOpen,
              setIsOpen: setIsUpdateModalOpen,
            },
          }}
        />
      )}
      {isAddModalOpen && (
        <CardEditorModal
          {...{
            cardProperties: {
              ...defaultNewCardArgs,
              lessonId,
            },
            onCardMutation: addCard,
            modalProps: {
              title: 'Add New Card',
              confirmButtonText: 'Confirm',
              dismissButtonText: 'Cancel',
              isOpen: isAddModalOpen,
              setIsOpen: setIsAddModalOpen,
            },
          }}
        />
      )}
    </div>
  );
};

export default LessonPlanner;
