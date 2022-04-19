import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import Tooltip from "../../components/Tooltip";
import { TaskType } from "./data";

interface TaskProps {
  task: TaskType
  provided: DraggableProvided
  isDragging: boolean
}

const Task = ({task, provided, isDragging}: TaskProps) => {
  return (
    <div
      className={"flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 hover:bg-opacity-100 no-scroll" + (isDragging ? " bg-indigo-100 transform rotate-12 transition duration-200" : "")}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <button className="absolute top-0 right-0 items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
        <ThreeDotsIcon />
      </button>
      {/* <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
        Design
      </span> */}
      <h4 className="mt-3 text-sm font-medium">
        {task.title}
      </h4>
      <div className="flex relative items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <CalendarIcon />
          <span className="ml-1 leading-none">{task.date}</span>
        </div>
        <div className="relative flex items-center ml-4">
          <CommentsIcon />
          <span className="ml-1 leading-none">{task.comments}</span>
        </div>
        <div 
          className="ml-auto flex mb-3"
        >
          {task.authors?.map((user, index) => (
              <Tooltip tooltipText={user.name} key={index} idx={index}>
                <img
                  src={
                    user.avatar ? user.avatar.photo : "/img/user.svg"
                  }
                  alt={user.name}
                  className="w-6 h-6 rounded-full border-2 border-blue-50 shadow"
                />
              </Tooltip>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Task;

// Icons
const ThreeDotsIcon = () => {
  return <svg
    className="w-4 h-4 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>;
}

const CalendarIcon = () => (<svg
  className="w-4 h-4 text-gray-300 fill-current"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path
    fillRule="evenodd"
    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
    clipRule="evenodd" />
</svg>);


const CommentsIcon = () =>  (<svg
    className="relative w-4 h-4 text-gray-300 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
      clipRule="evenodd" />
  </svg>);

