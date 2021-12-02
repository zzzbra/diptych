import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useLoginMutation } from '../services/auth';
import { setCredentials } from '../features/auth/auth.slice';

import Button from '../components/Button';
import { setToken } from '../features/auth/utils';
import Spinner from 'components/Spinner';
import ErrorMessage from 'components/ErrorMessage';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [login, { error, isError, isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = await login(formData).unwrap();
      dispatch(setCredentials(auth));
      setToken(auth.token);
      history.push('/dashboard');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  if (isLoading) return <Spinner />;

  if (isError) return <ErrorMessage {...{ error }} />;

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl mb-8">Login</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
            onChange={handleChange}
            type="text"
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
            onChange={handleChange}
            type="password"
            value={formData.password}
          />
          {/* <p className="text-red text-xs italic">Forgot your password?</p> */}
        </div>
        <div className="flex items-center justify-between">
          <Button
            className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Sign In
          </Button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            href="/signup"
          >
            Don't have an account? Sign up.
          </a>
        </div>
      </form>
    </>
  );
};

export default Login;
