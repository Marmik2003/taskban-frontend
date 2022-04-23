import React from "react";
import MembersList from "../../components/MembersList";
import PriorityText from "../../components/PriorityText";
import { Task } from "../../types/Board";

interface SingleTaskProps {
  task: Task;
  handleCompleteTask: (task: Task) => void;
}

const SingleTask = ({ task, handleCompleteTask }: SingleTaskProps) => {
  return (
    <div className="w-full overflow-x-auto bg-gray-200">
      <div className="flex items-center min-w-max overflow-auto md:space-x-12 space-x-20 p-2 rounded-lg">
        <h1 className="mx-3 lg:w-40 w-80">{task?.title}</h1>

        <div className="flex w-25 overflow-auto">
          <MembersList memberIds={task?.assignees} />
        </div>

        <div className="flex w-20">
          <PriorityText priority={task.priority!} />
        </div>

        <p className="flex mx-10 text-sm justify-center items-center">
          <i className="fad fa-calendar text-lg mr-1" />{" "}
          {new Date(task!.due_date).toLocaleDateString()}
        </p>

        <div className="flex mx-10  min-w-fit justify-end">
          {!task.finished && (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 rounded-lg px-4 mx-2"
              type="button"
              onClick={() => handleCompleteTask(task)}
            >
              <i className="fad fa-check mr-1" /> Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
