import React, { useState } from 'react';
import Modal from './Modal';

const EditTodo = ({ previousDescription, updateTodo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        previousDescription={previousDescription}
        updateTodo={updateTodo}
      />
    </>
  );
};

export default EditTodo;
