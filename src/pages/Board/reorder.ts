import { DraggableLocation } from "react-beautiful-dnd";
import { Task } from "../../types/Board";

const reorder = (list: string[] | Task[], startIndex: number, endIndex: number) => {
  const result = Array.from<string | Task>(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;

export const reorderTaskmap = ({ taskmap, source, destination }: {taskmap: Record<string, Task[]>, source: DraggableLocation, destination: DraggableLocation}) => {
  const current = [...taskmap[source.droppableId]];
  const next = [...taskmap[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...taskmap,
      [source.droppableId]: reordered
    };
    return {
      taskmap: result
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = {
    ...taskmap,
    [source.droppableId]: current,
    [destination.droppableId]: next
  };

  return {
    taskmap: result
  };
};