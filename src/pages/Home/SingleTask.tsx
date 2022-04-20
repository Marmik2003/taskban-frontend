import React from 'react'
import MembersList from '../../components/MembersList';
import PriorityText from '../../components/PriorityText';
import { Task } from '../../types/Board';

interface SingleTaskProps {
  task: Task;
}

const SingleTask = ({task}: SingleTaskProps) => {
  return (
    <div className="w-full overflow-x-auto bg-gray-200">
      <div className="flex items-center min-w-max overflow-auto md:space-x-12 space-x-20 p-2 rounded-lg">
        <h1 className="mx-3 w-full">{task?.title}</h1>

        <div className="flex min-w-fit">
          <MembersList memberIds={task?.assignees} />
        </div>

        <PriorityText priority={task?.priority || "N"} />

        <p className="flex mx-10 text-sm justify-center items-center">
          <i className="fad fa-calendar text-lg mr-1" /> {(new Date(task!.due_date)).toLocaleDateString()}
        </p>

        <div className="flex mx-10  min-w-fit">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 rounded-lg px-4 mx-2"
            type="button"
          >
            <i className="fad fa-pencil-alt mr-1" /> Edit
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 rounded-lg px-4 mx-2"
            type="button"
          >
            <i className="fad fa-check mr-1" /> Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTask