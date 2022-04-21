import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Task } from "../../types/Board";
import Column from "./Column";
import reorder, { reorderTaskmap } from "./reorder";

interface KanbanProps {
  initial?: {}
  setTaskDialog: React.Dispatch<React.SetStateAction<Task>>;
  setIsTaskDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Kanban = ({ initial = {}, setIsTaskDialogOpen, setTaskDialog }: KanbanProps) => {
  const [columns, setColumns] = React.useState<Record<string, Task[]>>(initial);
  const [ordered, setOrdered] = React.useState<string[]>(Object.keys(initial));
  
  const onDragEnd = (result: DropResult) => {

    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow)
        return;
      }

      const column = columns[result.source.droppableId];
      const withtaskRemoved = [...column];
      withtaskRemoved.splice(result.source.index, 1);
      const newColumns = {
        ...columns,
        [result.source.droppableId]: withtaskRemoved
      };
      setColumns(newColumns)
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const newOrdered = reorder(
        ordered,
        source.index,
        destination.index
      );

      setOrdered((newOrdered as string[]));

      return;
    }

    const data = reorderTaskmap({
      taskmap: columns,
      source,
      destination
    });

    setColumns((data.taskmap as Record<string, Task[]>));
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
                    key={key}
                    title={key}
                    tasks={(columns[key] as Task[])}
                    index={index}
                    setTaskDialog={setTaskDialog}
                    setIsTaskDialogOpen={setIsTaskDialogOpen}
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
