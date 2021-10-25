import React, { useEffect, useState } from 'react';
import Modal from './Modal';

const EditTodo = ({ previousDescription, updateTodo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(
    previousDescription,
  );

  useEffect(() => {
    if (isModalOpen) setUpdatedDescription(previousDescription);
  }, [previousDescription, isModalOpen]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 hover:underline focus:underline"
      >
        Edit
      </button>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        updatedDescription={updatedDescription}
        setUpdatedDescription={setUpdatedDescription}
        updateTodo={updateTodo}
      />
    </>
  );
};

export default EditTodo;
