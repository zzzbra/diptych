import React, { useEffect, useState } from 'react';
import Modal from './Modal';

interface EditCourseArgs {
  previousDescription: string;
  updateCourse: (newCourse: string) => void;
}
const EditCourse = ({ previousDescription, updateCourse }: EditCourseArgs) => {
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
        open={isModalOpen}
        setOpen={setIsModalOpen}
        updatedDescription={updatedDescription}
        setUpdatedDescription={setUpdatedDescription}
        updateTodo={updateCourse}
      />
    </>
  );
};

export default EditCourse;
