import React, { useState } from 'react';

import authAPI from '../apis/auth';
import Button from '../components/Button';

const Register = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    // passwordConfirmation: '',
    isTeacher: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit clicked. ', formData);
    console.log(authAPI);

    try {
      const response = await authAPI.post(
        '/register',
        { ...formData },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      // get token & redirect on success
      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl mb-3">Register</h1>
        <p>Sign up for a new account.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="my-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="name"
          >
            Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            // placeholder="Name"
            value={formData.name}
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
            // placeholder="Email"
            value={formData.email}
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            // placeholder="******************"
            value={formData.password}
          />
          {/* <p class="text-red text-xs italic">Please choose a password.</p> */}
        </div>
        {/* TODO: revisit this with other form validation work: */}
        {/* <div class="mb-6">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="passwordConfirmation"
          >
            Confirm Password
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            onChange={handleChange}
            placeholder="******************"
            value={formData.passwordConfirmation}
          />
        </div> */}
        <div class="mb-12">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="isTeacher"
          >
            <input
              className="mr-2"
              id="isTeacherInput"
              name="isTeacher"
              type="checkbox"
              checked={formData.isTeacher}
              onChange={handleChange}
            />
            I am a course instructor
          </label>
        </div>
        <div class="flex items-center justify-between">
          <Button type="submit">Sign Up</Button>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            href="/login"
          >
            Already have an account?
          </a>
        </div>
      </form>
    </>
  );
};

export default Register;
