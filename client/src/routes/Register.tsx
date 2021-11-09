import React, { useState } from 'react';

// import authAPI from '../features/auth/auth.slice';
import { useRegistrationMutation } from '../app/services/auth';
import Button from '../components/Button';
// import { useCheckIsAuthenticated } from '../features/auth/auth.slice';

const Register = () => {
  const [register, { isLoading, error }] = useRegistrationMutation();
  console.log({ isLoading }, 'error: ', error);
  // const isAuthenticated = useCheckIsAuthenticated();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isTeacher: false,
  });

  // TODO: create regular input
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  // TODO: create Checkbox Input
  const handleCheckboxChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const authResponse = await register(formData);
      console.log('set this to global state: ', { authResponse });

      // const response = await authAPI.post(
      //   '/register',
      //   { ...formData },
      //   {
      //     headers: { 'Content-Type': 'application/json' },
      //   },
      // );
      // const data = await register(formData).unwrap();

      // get token & redirect on success
      // const token = data.token;
      // localStorage.setItem('token', token);
      // setIsAuthenticated(true);
    } catch (error: any) {
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
        <div className="my-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-12">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="isTeacher"
          >
            <input
              className="mr-2"
              id="isTeacherInput"
              name="isTeacher"
              type="checkbox"
              checked={formData.isTeacher}
              onChange={handleCheckboxChange}
            />
            I am a course instructor
          </label>
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit">Sign Up</Button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
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
