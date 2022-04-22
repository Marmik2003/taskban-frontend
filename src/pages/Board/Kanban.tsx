import React, { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { sortColumn, sortTasks } from "../../APIMethods";
import { Task } from "../../types/Board";
import Column from "./Column";
import reorder, { reorderTaskmap } from "./reorder";

interface KanbanProps {
  boardId: number;
  initial: {};
  columnsPair: { id: number; title: string }[];
  setTaskDialog: React.Dispatch<React.SetStateAction<Task>>;
  setIsTaskDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Kanban = ({
  boardId,
  initial,
  columnsPair,
  setIsTaskDialogOpen,
  setTaskDialog,
}: KanbanProps) => {
  const [columns, setColumns] = React.useState<Record<string, Task[]>>(initial);
  const [ordered, setOrdered] =
    React.useState<{ id: number; title: string }[]>(columnsPair);

  const columnRender = React.useRef(true);
  const taskRender = React.useRef(true);

  useEffect(() => {
    setColumns(initial);
  }, [initial]);

  useEffect(() => {
    setOrdered(columnsPair);
  }, [columnsPair]);

  useEffect(() => {
    if (columnRender.current) {
      columnRender.current = false;
    } else {
      const columnOrderedIds = ordered.map(({ id }) => id);
      sortColumn(columnOrderedIds);
    };
  }, [ordered]);

  useEffect(() => {
    if (taskRender.current) {
      taskRender.current = false;
    } else {
      const taskOrderedIds = Object.values(columns)
        .flat()
        .map(({ id }) => id);
      const columnToTaskIds = Object.entries(columns).reduce(
        (acc, [columnId, tasks]) => {
          acc[columnId] = tasks.map(({ id }) => id);
          return acc;
        },
        {} as Record<string, number[]>
      );
      sortTasks(boardId, taskOrderedIds, columnToTaskIds);
    };
  }, [boardId, columns]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === "COLUMN") {
      const newOrdered = reorder(ordered, source.index, destination.index);
      setOrdered(newOrdered);
      return;
    }

    const data = reorderTaskmap({
      taskmap: columns,
      source,
      destination,
    });
    setColumns(data.taskmap as Record<string, Task[]>);
  };

  return (
    <div className="flex w-full max-h-screen text-gray-700">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          ignoreContainerClipping={false}
          isCombineEnabled={false}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full overflow-x-scroll flex flex-grow mt-4 space-x-3"
            >
              {ordered.map((key, index) => (
                <Column
                  key={key.id}
                  colId={key.id}
                  title={key.title}
                  tasks={columns[key.id] as Task[]}
                  index={index}
                  setTaskDialog={setTaskDialog}
                  setIsTaskDialogOpen={setIsTaskDialogOpen}
                  setColumns={setColumns}
                  setColumnsPair={setOrdered}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Kanban;
