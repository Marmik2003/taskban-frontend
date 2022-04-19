import React from "react";
import DialogBox from "../../components/DialogBox";
import { TaskType } from "./data";

interface TaskDialogProps {
  task: TaskType;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDialog = ({ task, isOpen, onClose }: TaskDialogProps) => {
  return (
    <DialogBox
      dialogTitle={task.id !== 0 ? "Edit Task" : "Add Task"}
      isOpen={isOpen}
      closeDialog={onClose}
    >
      <div className="grid grid-cols-3 md:grid-cols-1 space-y-2">
        <div className="col-span-2 md:col-span-1">
          <div className="my-2">
            <label className="block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={task.title}
              type="text"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Content
            </label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={task.content}
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Due Date
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={task.date}
              type="date"
            />
          </div>

          {task.id !== 0 && (
            <div className="mb-2">
              <input
                id="is_completed"
                type="checkbox"
                name="is_completed"
                className="w-[14px] h-[14px] my-2 mr-2 border-2 border-gray-200 rounded-lg"
              />
              <label htmlFor="is_completed">Is Completed?</label>
            </div>
          )}
          <div className="mb-3">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
              onClick={onClose}
            >
              <i className="far fa-save"></i> Save
            </button>
          </div>
        </div>
        {task.id !== 0 && (
          <div className="col-span-1">
            <h6 className="text-lg font-bold text-gray-600">Assignees</h6>
            <div className="flex flex-col">
              {task.authors.map((assignee, index) => (
                <div className="flex items-center" key={index}>
                  <img
                    src={
                      assignee.avatar ? assignee.avatar.photo : "/img/user.svg"
                    }
                    alt={assignee.name}
                    className="w-8 h-8 rounded-full border-2 border-blue-50 shadow"
                  />
                  <div className="ml-3">{assignee.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DialogBox>
  );
};

export default TaskDialog;
