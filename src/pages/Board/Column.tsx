import { Menu } from "@headlessui/react";
import React, { useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { deleteColumn, updateColumn } from "../../APIMethods";
import Editable from "../../components/Editable";
import { Task } from "../../types/Board";
import ColumnListDropdown from "./ColumnListDropdown";
import TaskList from "./TaskList";

interface ColumnProps {
  colId: number;
  title: string;
  tasks: Task[];
  index: number;
  setTaskDialog: React.Dispatch<React.SetStateAction<Task>>;
  setIsTaskDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setColumns: React.Dispatch<React.SetStateAction<Record<string, Task[]>>>;
  setColumnsPair: React.Dispatch<React.SetStateAction<{id: number, title: string}[]>>;
}

const Column = ({
  colId,
  title,
  tasks,
  index,
  setTaskDialog,
  setIsTaskDialogOpen,
  setColumns,
  setColumnsPair,
}: ColumnProps) => {
  const [colTitle, setColTitle] = React.useState(title);

  useEffect(() => {
    updateColumn(colId, colTitle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colTitle]);

  const colRef = React.useRef<HTMLInputElement>(null);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this column?");
    if (confirmDelete) {
      deleteColumn(id).then(() => {
        setColumnsPair(columnsPair => columnsPair.filter(({ id: columnId }) => columnId !== id));
        setColumns(columns => {
          const newColumns = { ...columns };
          delete newColumns[id];
          return newColumns;
        });
        toast.success("Column deleted successfully");
      }).catch(err => {
        console.error(err);
        err = JSON.parse(err.message);
        toast.error(err[Object.keys(err)[0]]);
      });
    }
  }

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
              <Editable
                className="block text-sm font-semibold"
                type="input"
                text={colTitle}
                childRef={colRef}
              >
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  ref={colRef}
                  value={colTitle}
                  onChange={(e) => {
                    setColTitle(e.target.value);
                    setColumnsPair(columnsPair => columnsPair.map(({ id, title }) => id === colId ? { id, title: e.target.value } : { id, title }));
                  }}
                />
              </Editable>

              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {tasks.length ?? 0}
              </span>
            </div>
            <div className="flex space-x-1">
              <button
                className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
                onClick={() => {
                  setTaskDialog({
                    id: 0,
                    title: "",
                    description: "",
                    due_date: "",
                    column: colId,
                    assignees: [],
                    
                  });
                  setIsTaskDialogOpen(true);
                }}
              >
                <PlusIcon />
              </button>
              <ColumnListDropdown>
                <Menu.Item>
                  <button
                    onClick={() => handleDelete(colId)}
                    className="group rounded-md flex space-x-2 items-center w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-600 hover:text-white"
                    title="Delete"
                  >
                    <i className="fas fa-trash-alt mr-2"></i> Delete
                  </button>
                </Menu.Item>
              </ColumnListDropdown>
            </div>
          </div>
          <Droppable
            droppableId={`column-${colId}`}
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
                <TaskList
                  tasks={tasks}
                  setTaskDialog={setTaskDialog}
                  setIsTaskDialogOpen={setIsTaskDialogOpen}
                />
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

export default Column;
