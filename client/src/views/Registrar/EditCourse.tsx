import React, { useState } from 'react';
import EditCourseModal from './EditCourseModal';
import { UpdateCourseArgs } from 'services/courses';

const EditCourse = ({ description, courseId }: UpdateCourseArgs) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 hover:underline focus:underline"
      >
        Edit
      </button>
      <EditCourseModal
        {...{
          isOpen: isModalOpen,
          setIsOpen: setIsModalOpen,
          courseId,
          description,
        }}
      />
    </>
  );
};

export default EditCourse;
