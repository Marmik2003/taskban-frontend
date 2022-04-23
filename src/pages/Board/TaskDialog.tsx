import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { changeAssignees, createTask, getUser, getUserByUsername, updateTask } from "../../APIMethods";
import DialogBox from "../../components/DialogBox";
import { useAuth } from "../../context/AuthContext";
import { BoardMember, Task } from "../../types/Board";
import PriorityDropdown from "./PriorityDropdown";

interface TaskDialogProps {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  setColumns: React.Dispatch<React.SetStateAction<Record<string, Task[]>>>;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDialog = ({
  task,
  setTask,
  isOpen,
  onClose,
  setColumns,
}: TaskDialogProps) => {
  const [loading, setLoading] = React.useState(false);
  const [assignees, setAssignees] = React.useState<BoardMember[]>([]);
  const [username, setUsername] = React.useState("");
  const [userState, setUserState] = React.useState<BoardMember | undefined>();

  useEffect(() => {
    setAssignees([]);
    Promise.all(
      task.assignees!.map((id) => getUser(id).then((user) => user))
    ).then((users) => {
      setAssignees(users);
    });
  }, [task.assignees]);

  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskId = task.id;
    if (taskId === 0) {
      createTask(
        task.title,
        task.column,
        [],
        [user!.id],
        task.due_date,
        task.description
      )
        .then((res: Task) => {
          setColumns((columns) => ({
            ...columns,
            [task.column.toString()]: [...columns[task.column.toString()], res],
          }));
          setTask({
            ...task,
            id: 0,
            title: "",
            description: "",
            due_date: "",
          });
          onClose();
        })
        .catch((err) => {
          console.error(err);
          err = JSON.parse(err.message);
          toast.error(err[Object.keys(err)[0]]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      updateTask(
        taskId,
        task.title,
        task.column,
        [],
        undefined,
        task.due_date,
        task.description,
        task.finished,
        task.priority
      )
        .then((res: Task) => {
          setColumns((columns) => ({
            ...columns,
            [task.column.toString()]: [
              ...columns[task.column.toString()].filter((t) => t.id !== taskId),
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
        })
        .catch((err) => {
          console.error(err);
          err = JSON.parse(err.message);
          toast.error(err[Object.keys(err)[0]]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getUserByUsername(username)
        .then((user) => {
          setUserState(user);
        })
        .catch(() => {
          setUserState(undefined);
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [username]);

  return (
    <DialogBox
      dialogTitle={task.id !== 0 ? "Edit Task" : "Add Task"}
      isOpen={isOpen}
      closeDialog={onClose}
      maxDialogSize={task.id !== 0 ? "2xl" : "md"}
    >
      <div
        className={`grid md:grid-cols-1 space-y-2 space-x-6 md:space-x-0 ${
          task.id !== 0 && "grid-cols-3"
        }`}
      >
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
            <PriorityDropdown priority={task.priority!} setTask={setTask} />
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
          <div className={task.id !== 0 ? "mb-3" : "my-4"}>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin" />
              ) : (
                <i className="far fa-save"></i>
              )}{" "}
              Save
            </button>
          </div>
        </form>
        {task.id !== 0 && (
          <div className="col-span-1 px-6 border-l md:border-l-0 md:border-t md:px-0 md:py-3">
            <h6 className="text-lg font-bold text-gray-600 py-2">Assignees</h6>
            <div className="flex flex-col">
              {assignees.map((assignee, index) => (
                <div className="flex items-center" key={index}>
                  <img
                    src={
                      assignee.avatar ? assignee.avatar.photo : "/img/user.svg"
                    }
                    alt={assignee.name || assignee.username}
                    className="w-8 h-8 rounded-full border-2 border-blue-50 shadow"
                  />
                  <div className="ml-3">
                    {assignee.name || assignee.username}{" "}
                    <button
                      className="text-xs ml-1 text-red-500 hover:text-red-700"
                      onClick={() => {
                        changeAssignees(task.assignees!.filter(
                          (assigneeObj) => assigneeObj !== assignee.id
                        ), task.id).then(() => {
                          toast.success("Assignee removed");
                          setTask(task => ({
                            ...task,
                            assignees: task.assignees!.filter(
                              (assigneeObj) => assigneeObj !== assignee.id
                            )
                          }))
                          setColumns(columns => ({
                            ...columns,
                            [task.column.toString()]: [
                              ...columns[task.column.toString()].map(
                                (taskObj) => {
                                  if (taskObj.id === task.id) {
                                    return {
                                      ...taskObj,
                                      assignees: taskObj.assignees!.filter(
                                        (assigneeObj) => assigneeObj !== assignee.id
                                      )
                                    };
                                  }
                                  return taskObj;
                                }
                              )
                            ]
                          }));
                        });
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <img
                  src={
                    userState?.avatar
                      ? userState?.avatar.photo
                      : "/img/user.svg"
                  }
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-blue-50 shadow"
                />
                <div className="ml-3">
                  <input
                    type="text"
                    className={
                      "w-full px-3 py-1 border peer-focus-visible:ring-0 focus:ring-offset-0 rounded-md text-sm " +
                      (userState !== undefined
                        ? "border-sky-500 ring-sky-500"
                        : "border-red-400 ring-red-400")
                    }
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <button
                  className="text-sm bg-sky-500 text-white px-3 py-2 rounded-lg ml-3"
                  onClick={() => {
                    if (userState !== undefined) {
                      changeAssignees([...task.assignees, userState.id].filter((c, idx) => {
                        return [...task.assignees, userState.id].indexOf(c) === idx;
                      }), task.id)
                        .then(() => {
                          setAssignees([...assignees, userState]);
                          setUsername("");
                          setUserState(undefined);
                          setTask({ ...task, assignees: [...task.assignees, userState.id] });
                          setColumns(columns => ({
                            ...columns,
                            [task.column.toString()]: [
                              ...columns[task.column.toString()].map(
                                (taskObj) => {
                                  if (taskObj.id === task.id) {
                                    return {
                                      ...taskObj,
                                      assignees: [...taskObj.assignees, userState.id]
                                    };
                                  }
                                  return taskObj;
                                }
                              )
                            ]
                          }));
                        })
                        .catch((err) => {
                          setUsername("");
                          setUserState(undefined);
                          err = JSON.parse(err.message);
                          toast.error(Object.values(err)[0] as string);
                        });
                    }
                  }}
                >
                  <i className="fas fa-plus"></i> Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DialogBox>
  );
};

export default TaskDialog;
