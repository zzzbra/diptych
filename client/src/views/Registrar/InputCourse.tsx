import React, { useState } from 'react';

import Input from 'components/Input';
import Button from 'components/Button';
import { useAddNewCourseMutation } from 'services/courses';

const InputCourse = () => {
  const [description, setDescription] = useState('');
  const [addNewCourse, { isLoading }] = useAddNewCourseMutation();

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setDescription(e.currentTarget.value);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addNewCourse({ description });
      setDescription('');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-6">
        <Input
          id="course-input"
          label="Enter the Title of a new course you are offering"
          onChange={handleInputChange}
          value={description}
        />
      </div>
      <Button type="submit">Add</Button>
    </form>
  );
};

export default InputCourse;
