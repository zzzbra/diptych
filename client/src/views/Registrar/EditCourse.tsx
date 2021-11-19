import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import Input from 'components/Input';

interface EditCourseArgs {
  previousDescription: string;
  updateCourse: (newCourse: string) => void;
}

const EditCourse = ({ previousDescription, updateCourse }: EditCourseArgs) => {
  // TODO: move these out into a global state handler
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updatedDescription, setUpdatedDescription] =
    useState(previousDescription);

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
        confirmButtonText="Update"
        onConfirmation={() => updateCourse(updatedDescription)}
        dismissButtonText="Cancel"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="Edit Course"
      >
        <Input
          className="w-full"
          id="edit-todo-input"
          label="Make your changes below:"
          onChange={(e) => setUpdatedDescription(e.currentTarget.value)}
          value={updatedDescription}
        />
      </Modal>
    </>
  );
};

export default EditCourse;
