import React, { useEffect } from "react";
import Kanban from "./Kanban";
import Board, { Task } from "../../types/Board";
import AddColumnDialog from "./AddColumnDialog";
import Editable from "../../components/Editable";
import TaskDialog from "./TaskDialog";
import { useParams } from "react-router-dom";
import { getBoard } from "../../APIMethods";
import ScreenLoading from "../../components/ScreenLoading";
import MembersList from "../../components/MembersList";
import NotImplementedComponent from "../../components/NotImplementedComponent";

const AddColumnDialogState = {
  id: 0,
  title: "",
  board: 0
};

const TaskDialogState: Task = {
  id: 0,
  title: "",
  description: "",
  assignees: [] as number[],
  due_date: "",
  column: 0,
};

const IndividualBoard = () => {
  const [loading, setLoading] = React.useState(true);
  const [boardName, setBoardName] = React.useState("");
  const [boardMembers, setBoardMembers] =
    React.useState<number[]>([]);
  const [initialBoard, setInitialBoard] = React.useState<Record<string, Task[]>>({});
  const [addColumnDialog, setAddColumnDialog] =
    React.useState<typeof AddColumnDialogState>(AddColumnDialogState);
  const [taskDialog, setTaskDialog] =
    React.useState<typeof TaskDialogState>(TaskDialogState);
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] =
    React.useState<boolean>(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] =
    React.useState<boolean>(false);

  const boardRef = React.useRef<HTMLInputElement>(null);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getBoard(Number(id)).then((board: Board) => {
      setBoardName(board.name);
      setBoardMembers(board.members as number[]);
      setAddColumnDialog({
        ...AddColumnDialogState,
        board: board.id,
      });
      setInitialBoard(board.columns!.reduce(
        (acc, column) => ({
          ...acc,
          [column.id.toString()]: column.tasks,
        }), {} as Record<string, Task[]>
      ))
      setLoading(false);
    });
  }, [id]);

  return (
    <>
      {loading && (
        <ScreenLoading />
      )}
      <div className="flex flex-col w-full overflow-auto">
        <div className="flex justify-between w-full items-center">
          <div className="flex w-full">
            <Editable
              className="text-xl font-bold"
              placeholder="Board"
              type="input"
              text={boardName}
              childRef={boardRef}
            >
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Board"
                onChange={(e) => setBoardName(e.target.value)}
                value={boardName}
                ref={boardRef}
              />
            </Editable>
          </div>
          <div className="flex w-full place-content-end">
            <div className="flex items-center">
              <button
                className="text-gray-700 hover:text-white hover:bg-gray-700 border border-gray-700 rounded px-3 py-1 text-sm mx-2 focus:outline-none focus:shadow-outline"
                id="invite-button"
                onClick={NotImplementedComponent}
              >
                <i className="far fa-user-plus"></i> Invite
              </button>
              <MembersList memberIds={boardMembers} />
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full items-center my-4">
          <div className="flex w-full">
            {/* filter button */}
            <button
              className="text-gray-700 hover:text-white hover:bg-gray-700 border border-gray-700 rounded px-3 py-1 text-sm focus:outline-none focus:shadow-outline"
              id="filter-button"
              onClick={NotImplementedComponent}
            >
              <i className="far fa-filter"></i> Filter
            </button>
          </div>
          <div className="flex w-full place-content-end">
            <div className="flex">
              <button
                className="text-gray-700 hover:text-white hover:bg-gray-700 border border-gray-700 rounded px-3 py-1 text-sm mr-2 focus:outline-none focus:shadow-outline"
                onClick={() => {
                  setAddColumnDialog(current => ({ ...AddColumnDialogState, board: current.board }));
                  setIsAddColumnDialogOpen(true);
                }}
              >
                <i className="far fa-plus"></i> Add Column
              </button>
            </div>
          </div>
        </div>
        <Kanban 
          initial={initialBoard} 
          setIsTaskDialogOpen={setIsTaskDialogOpen}
          setTaskDialog={setTaskDialog}
        />
      </div>
      <AddColumnDialog
        dialogState={addColumnDialog}
        setDialogState={setAddColumnDialog}
        isOpen={isAddColumnDialogOpen}
        closeDialog={() => setIsAddColumnDialogOpen(false)}
        setInitialBoard={setInitialBoard}
      />
      <TaskDialog
        task={(taskDialog)}
        isOpen={isTaskDialogOpen}
        onClose={() => {
          setTaskDialog(TaskDialogState);
          setIsTaskDialogOpen(false);
        }}
      />
    </>
  );
};

export default IndividualBoard;
