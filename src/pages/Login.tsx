import React from 'react'

const Login = () => {
  return (
    <div
      className="w-screen m-auto flex flex-col justify-center items-center mt-12 px-8"
    >
      <div className="w-full max-w-md">
        <img src='/img/logo-monochrome.svg' alt='Taskban Logo' className='w-full mb-6 px-28' />
      </div>
      <div className="w-full max-w-md mb-8 flex-col space-y-1 mt-8">
        <h1 className="text-3xl font-bold text-gray-600">Log in</h1>
        <p className="text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>
      <form className="w-full max-w-md">
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
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
        </div>
      </form>

    </div>
  )
}

export default Login