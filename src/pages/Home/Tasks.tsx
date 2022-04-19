import React from "react";

const SingleTask = () => {
  return (
    <div className="flex items-center bg-gray-200 md:space-x-12 space-x-20 p-2 rounded-lg">
      <h1 className="ml-3 w-1/2">Someone</h1>

      <div className="flex">
        <img
          src="https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg"
          alt="..."
          className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
        />
        <img
          src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
          alt="..."
          className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
        />
        <img
          src="https://demos.creative-tim.com/notus-js/assets/img/team-3-800x800.jpg"
          alt="..."
          className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
        />
        <img
          src="https://demos.creative-tim.com/notus-js/assets/img/team-4-470x470.png"
          alt="..."
          className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
        />
      </div>
      <p className="ml-6 w-1/3 text-center flex text-sm items-center">
        <i className="fad fa-comment text-lg mr-1" /> 4 Comments
      </p>

      <p className="ml-6 flex text-sm justify-center items-center">
        <i className="fad fa-calendar text-lg mr-1" /> 18/04/2022
      </p>

      <div
        className="w-full mb-4 text-sm text-slate-400"
        style={{
          height: "6px",
        }}
      >
        Progress: (40%)
        <div className="w-full mb-4 bg-gray-300" style={{ height: "3px" }}>
          <div className="bg-red-500 w-2/6 h-full rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

const Tasks = () => {
  return (
    <div className="flex flex-col w-full">
      <h4 className="text-2xl font-bold text-left">My Tasks</h4>
      <div className="flex items-center space-x-4 whitespace-nowrap my-3 w-full border-b-2">
        <button className="text-gray-800 font-semibold py-2 px-4 border-b-4 hover:bg-slate-200 rounded-md border-b-blue-600">
          To Do
        </button>
        <button className="text-gray-800 font-semibold py-2 px-4">
          On Progress
        </button>
        <button className="text-gray-800 font-semibold py-2 px-4">Done</button>
      </div>

      <div className="flex flex-col space-y-2 md:w-screen w-full">
          <SingleTask />
          <SingleTask />
          <SingleTask />
      </div>
    </div>
  );
};

export default Tasks;
