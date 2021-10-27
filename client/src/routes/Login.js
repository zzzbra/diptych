import React from 'react';

import PageContentWrapper from '../components/PageContentWrapper';

const Login = () => {
  return (
    <PageContentWrapper>
      <h1>Login</h1>
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="username"
          type="text"
          placeholder="Username"
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
          type="password"
          placeholder="******************"
        />
        <p class="text-red text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Sign In
        </button>
        {/* TODO: */}
        {/* <a
            class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            href="#"
          >
            Forgot Password?
          </a> */}
      </div>
    </PageContentWrapper>
  );
};

export default Login;
