import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const from = "/dashboard";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    auth.signin(username, () => navigate(from, { replace: true }));
  }

  return (
    <div
      className="w-screen m-auto flex flex-col justify-center items-center mt-12 px-8"
    >
      <div className="w-full max-w-md">
        <img src='/img/logo-monochrome.svg' alt='Taskban Logo' className='w-full mb-6 px-28' />
      </div>
      <div className="w-full max-w-md mb-8 flex-col space-y-1 mt-8">
        <h1 className="text-3xl font-bold text-gray-600">Sign Up</h1>
        <p className="text-gray-400">
          Fill up the Form to create an account
        </p>
      </div>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 space-y-1 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-username"
            > 
              Username
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-username"
              type="text"
              placeholder="Username"
              name="username"
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              type="email"
              placeholder="Email"
              name="email"
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="********"
              name='password'
            />
          </div>
        </div>
        <div className="flex-col items-center justify-between space-y-2">
          <button
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type='button'
          >
            Sign Up
          </button>
          {/* sign in link */}
          <p className="inline-block font-thin align-baseline text-sm text-gray-500">
          Already have an account? <Link
            className='font-bold text-base text-blue-600 hover:text-blue-800 transition duration-300 ml-1'
            to="/login"
          >
            Sign In
          </Link>
          </p>
        </div>
      </form>

    </div>
  )
}

export default Register