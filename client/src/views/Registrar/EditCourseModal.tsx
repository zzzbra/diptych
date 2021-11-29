import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import Modal from 'components/Modal';
import Input from 'components/Input';
import { useUpdateCourseMutation, UpdateCourseArgs } from 'services/courses';

interface EditCourseModalProps extends UpdateCourseArgs {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const EditCourseModal = ({
  isOpen,
  setIsOpen,
  description,
  courseId,
}: EditCourseModalProps) => {
  const [updateCourse] = useUpdateCourseMutation();
  const [updatedDescription, setUpdatedDescription] = useState(description);

  useEffect(() => {
    if (isOpen) setUpdatedDescription(description);
  }, [description, isOpen]);

  return (
    <Modal
      confirmButtonText="Update"
      onConfirmation={() =>
        updateCourse({ courseId, description: updatedDescription })
      }
      dismissButtonText="Cancel"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
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
  );
};

export default EditCourseModal;
