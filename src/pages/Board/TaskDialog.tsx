import React from "react";
import { toast } from "react-toastify";
import { createTask, updateTask } from "../../APIMethods";
import DialogBox from "../../components/DialogBox";
import { useAuth } from "../../context/AuthContext";
import { Task } from "../../types/Board";
import PriorityDropdown from "./PriorityDropdown";

interface TaskDialogProps {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  setColumns: React.Dispatch<React.SetStateAction<Record<string, Task[]>>>;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDialog = ({ task, setTask, isOpen, onClose, setColumns,  }: TaskDialogProps) => {
  const [loading, setLoading] = React.useState(false);

  const { user } = useAuth();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskId = task.id;
    if (taskId === 0) {
      createTask(task.title, task.column, [], [user!.id], task.due_date, task.description).then((res: Task) => {
        setColumns(columns => ({
          ...columns,
          [task.column.toString()]: [
            ...columns[task.column.toString()],
            res,
          ],
        }));
        setTask({
          ...task,
          id: 0,
          title: "",
          description: "",
          due_date: "",
        });
        onClose();
      }).catch(err => {
        console.error(err);
        err = JSON.parse(err.message);
        toast.error(err[Object.keys(err)[0]]);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(true);
      updateTask(taskId, task.title, task.column, [], undefined, task.due_date, task.description, task.finished, task.priority).then((res: Task) => {
        setColumns(columns => ({
          ...columns,
          [task.column.toString()]: [
            ...columns[task.column.toString()].filter(t => t.id !== taskId),
            res,
          ],
        }));
        setTask({
          ...task,
          id: 0,
          title: "",
          description: "",
          due_date: "",
        });
        onClose();
      }).catch(err => {
        console.error(err);
        err = JSON.parse(err.message);
        toast.error(err[Object.keys(err)[0]]);
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  return (
    <DialogBox
      dialogTitle={task.id !== 0 ? "Edit Task" : "Add Task"}
      isOpen={isOpen}
      closeDialog={onClose}
      maxDialogSize={task.id !== 0 ? "2xl" : "md"}
    >
      <div className={`grid md:grid-cols-1 space-y-2 space-x-6 md:space-x-0 ${task.id !== 0 && "grid-cols-3"}`}>
        <form onSubmit={handleSubmit} className="col-span-2 md:col-span-1">
          <div className="my-2">
            <label className="block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={task.title}
              onChange={(e) => {
                setTask({ ...task, title: e.target.value });
              }}
              type="text"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={task.description}
              onChange={(e) => {
                setTask({ ...task, description: e.target.value });
              }}
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Due Date
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={task.due_date}
              onChange={(e) => {
                setTask({ ...task, due_date: e.target.value });
              }}
              type="date"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Priority 
            </label>
            <PriorityDropdown
              priority={task.priority!}
              setTask={setTask}
            />
          </div>

          {task.id !== 0 && (
            <div className="mb-2">
              <input
                id="is_completed"
                type="checkbox"
                name="is_completed"
                className="w-[14px] h-[14px] my-2 mr-2 border-2 border-gray-200 rounded-lg"
                checked={task.finished}
                onChange={(e) => {
                  setTask({ ...task, finished: e.target.checked });
                }}
              />
              <label htmlFor="is_completed">Is Completed?</label>
            </div>
          )}
          <div className="mb-3">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin" />
              ) : (
                <i className="far fa-save"></i>
              )} Save
            </button>
          </div>
        </form>
        {task.id !== 0 && (
          <div className="col-span-1 px-6 border-l md:border-l-0 md:border-t md:px-0 md:py-3">
            <h6 className="text-lg font-bold text-gray-600 py-2">Assignees</h6>
            <div className="flex flex-col">
              {/* {task.authors.map((assignee, index) => (
                <div className="flex items-center" key={index}>
                  <img
                    src={
                      assignee.avatar ? assignee.avatar.photo : "/img/user.svg"
                    }
                    alt={assignee.name}
                    className="w-8 h-8 rounded-full border-2 border-blue-50 shadow"
                  />
                  <div className="ml-3">
                    {assignee.name} <button
                      className="text-xs ml-1 text-red-500 hover:text-red-700"
                      onClick={() => {
                        task.authors.splice(index, 1);
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>

                  </div>
                </div>
              ))} */}
            </div>
          </div>
        )}
      </div>
    </DialogBox>
  );
};

export default TaskDialog;
