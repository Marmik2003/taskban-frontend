import React, { useEffect } from "react";
import LoadingComponent from "../../components/LoadingComponent";
import { Task } from "../../types/Board";
import { DashboardType } from "../../types/Dashboard";
import SingleTask from "./SingleTask";

interface TasksProps {
  tasks: DashboardType;
  loading: boolean;
}

type taskTabType = {
  id: "incomplete_tasks" | "completed_tasks" | "overdue_tasks";
  title: string;
};

const taskTabs: taskTabType[] = [
  {
    id: "incomplete_tasks",
    title: "Incomplete",
  },
  {
    id: "completed_tasks",
    title: "Completed",
  },
  {
    id: "overdue_tasks",
    title: "Overdue",
  },
];

const Tasks = ({ tasks, loading }: TasksProps) => {
  const [currentTab, setCurrentTab] = React.useState<
    "incomplete_tasks" | "completed_tasks" | "overdue_tasks"
  >("incomplete_tasks");
  const [currentTasks, setCurrentTasks] = React.useState<Task[]>(
    tasks.incomplete_tasks
  );

  useEffect(() => {
    setCurrentTasks(tasks[currentTab]);
  }, [currentTab, tasks]);

  return (
    <div className="flex flex-col w-full">
      <h4 className="text-2xl font-bold text-left">My Tasks</h4>
      <div className="flex items-center space-x-4 whitespace-nowrap my-3 w-full border-b-2">
        {taskTabs.map((tab) => (
          <button
            key={tab.id}
            className={`text-gray-700 font-semibold py-2 px-4 hover:bg-slate-200 transition duration-300 ease-linear ${
              currentTab === tab.id
                ? "border-b-4 border-b-blue-600 rounded"
                : ""
            }`}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col space-y-2 w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <LoadingComponent />
          </div>
        ) : (
          currentTasks.length ? currentTasks.map((task, index) => (
            <SingleTask key={index} task={task} />
          )) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="text-xl font-bold text-center">No Tasks</h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Tasks;
