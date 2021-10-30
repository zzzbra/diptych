import React, { useState } from 'react';

import authAPI from '../apis/auth';

import Button from '../components/Button';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit clicked. ', formData);

    try {
      const response = await authAPI.post(
        '/login',
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
        <h1 className="text-4xl mb-8">Login</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            for="email"
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
            for="password"
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
          <p className="text-red text-xs italic">Please choose a password.</p>
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
            href="/register"
          >
            Don't have an account? Sign up.
          </a>
        </div>
      </form>
    </>
  );
};

export default Login;
