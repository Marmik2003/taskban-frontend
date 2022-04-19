import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskType } from "./data";
import TaskList from "./TaskList";

interface ColumnProps {
  title: string;
  tasks: TaskType[];
  index: number;
}

const Column = ({ title, tasks, index }: ColumnProps) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided) => (
        <div
          className="flex flex-col flex-shrink-0 w-80 bg-slate-200 rounded-lg px-3 py-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex items-center flex-shrink-0 justify-between h-10 px-2">
            <div className="flex">
              <span className="block text-sm font-semibold">{title}</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {tasks.length}
              </span>
            </div>
            <div className="flex space-x-1">
              <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
                <PlusIcon />
              </button>
              <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
                <ThreeDotsIcon />
              </button>
            </div>
          </div>
          <Droppable
            droppableId={title}
            type="TASK"
            ignoreContainerClipping={false}
            isDropDisabled={false}
            isCombineEnabled={false}
          >
            {(provided) => (
              <div
                className="flex flex-col pb-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <TaskList tasks={tasks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

const PlusIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    ></path>
  </svg>
);

const ThreeDotsIcon = () => (
  <svg
    className="w-4 h-4 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

export default Column;
