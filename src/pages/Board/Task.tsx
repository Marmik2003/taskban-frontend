import { Menu } from "@headlessui/react";
import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import MembersList from "../../components/MembersList";
import PriorityText from "../../components/PriorityText";
import { Task as TaskType } from "../../types/Board";
import ColumnListDropdown from "./ColumnListDropdown";

interface TaskProps {
  task: TaskType;
  provided: DraggableProvided;
  handleArchive: (task: TaskType) => void;
  isDragging: boolean;
  onClick: () => void;
}

const Task = ({ task, provided, handleArchive, isDragging, onClick }: TaskProps) => {
  return (
    <div
      className={
        "relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 hover:bg-opacity-100 no-scroll" +
        (isDragging
          ? " bg-indigo-100 transform rotate-12 transition duration-200"
          : "")
      }
      ref={provided.innerRef}
      onClick={onClick}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="absolute top-0 right-0 items-center flex justify-center w-5 h-5 mt-3 mr-2">
        <ColumnListDropdown defaultStyle="text-gray-500 hover:bg-gray-200 rounded hover:text-gray-700">
          <Menu.Item>
            <button
              onClick={(e) => {
                handleArchive(task);
                e.stopPropagation();
              }}
              className="group rounded-md flex space-x-2 items-center w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-600 hover:text-white"
              title="Archive Task"
            >
              <i className="far fa-archive mr-2"></i> Archive
            </button>
          </Menu.Item>
        </ColumnListDropdown>
      </div>
      {/* <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
        Design
      </span> */}
      <h4 className="mt-3 text-sm font-medium">{task.title}</h4>
      <div className="flex relative items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <CalendarIcon />
          <span className="ml-1 leading-none">{task.due_date}</span>
        </div>
        <div className="relative flex items-center text-xs ml-4">
          <PriorityText priority={task.priority!} />
        </div>
        <div className="ml-auto flex mb-3">
          <MembersList memberIds={task.assignees} />
        </div>
      </div>
    </div>
  );
};

export default Task;

// Icons
const CalendarIcon = () => (
  <svg
    className="w-4 h-4 text-gray-300 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CommentsIcon = () => (
  <svg
    className="relative w-4 h-4 text-gray-300 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
      clipRule="evenodd"
    />
  </svg>
);
