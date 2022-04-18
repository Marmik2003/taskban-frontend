import { DraggableLocation } from "react-beautiful-dnd";
import { TaskType } from "./data";

const reorder = (list: string[] | TaskType[], startIndex: number, endIndex: number) => {
  const result = Array.from<string | TaskType>(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;

export const reorderQuoteMap = ({ quoteMap, source, destination }: {quoteMap: Record<string, TaskType[]>, source: DraggableLocation, destination: DraggableLocation}) => {
  const current = [...quoteMap[source.droppableId]];
  const next = [...quoteMap[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...quoteMap,
      [source.droppableId]: reordered
    };
    return {
      quoteMap: result
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = {
    ...quoteMap,
    [source.droppableId]: current,
    [destination.droppableId]: next
  };

  return {
    quoteMap: result
  };
};