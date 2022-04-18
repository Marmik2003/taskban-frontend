import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import { TaskType } from "./data";
import reorder, { reorderQuoteMap } from "./reorder";

interface KanbanProps {
  initial?: {}
}

const Kanban = ({ initial = {} }: KanbanProps) => {
  const [columns, setColumns] = React.useState<Record<string, TaskType[]>>(initial);
  const [ordered, setOrdered] = React.useState<string[]>(Object.keys(initial));
  
  const onDragEnd = (result: DropResult) => {

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

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination
    });

    setColumns((data.quoteMap as Record<string, TaskType[]>));
  };

  return (
    <div className="flex flex-col max-w-screen max-h-screen text-gray-700">
      <div className="">
        {/* {Object.keys(columns).map((key) => (
          <Column
            key={key}
            title={key}
            tasks={(columns[key] as TaskType[])}

          />
        ))} */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={true}
            isCombineEnabled={true}
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
                    tasks={(columns[key] as TaskType[])}
                    index={index}
                  />
                ))} 
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="flex-shrink-0 w-6"></div>
      </div>
    </div>
  );
};

export default Kanban;
