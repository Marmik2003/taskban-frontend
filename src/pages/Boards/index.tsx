import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { getBoards } from "../../APIMethods";
import LoadingComponent from "../../components/LoadingComponent";
import Board from "../../types/Board";
import BoardCard from "./BoardCard";
import BoardDialog from "./BoardDialog";

const DialogState: Board = {
  id: 0,
  name: "",
  description: "",
};

const Boards = () => {
  const [loading, setLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [boards, setBoards] = React.useState<Board[]>([]);
  const [dialogState, setDialogState] = React.useState(DialogState);
  const [searchString, setSearchString] = React.useState("");

  useEffect(() => {
    setLoading(true);
    getBoards()
      .then((res) => {
        setBoards(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching boards");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDialogClose = () => setIsDialogOpen(false);

  return (
    <>
      <h4 className="text-xl font-light text-left">My Boards</h4>

      <div className="flex flex-wrap justify-between my-4 space-y-2">
        <div className="flex">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="inline-search"
            type="text"
            placeholder="Search boards"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
        <div className="flex">
          <button
            className="text-gray-600 border border-gray-600 px-2 py-1 text-xs rounded-md"
            onClick={() => {
              setIsDialogOpen(true);
              setDialogState(DialogState);
            }}
          >
            <i className="far fa-plus text-xs rounded-md border border-gray-600 px-1 mx-2 my-1"></i>
            New Board
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 lg:grid-cols-1 my-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <LoadingComponent />
          </div>
        ) : (
          boards
            .filter(
              (board) =>
                board.name.toLowerCase().includes(searchString.toLowerCase()) ||
                board.description
                  .toLowerCase()
                  .includes(searchString.toLowerCase())
            )
            .map((board, index) => (
              <BoardCard
                board={board}
                key={index}
                onClick={() => {
                  setDialogState(board);
                  setIsDialogOpen(true);
                }}
              />
            ))
        )}
      </div>
      <BoardDialog
        isOpen={isDialogOpen}
        closeDialog={handleDialogClose}
        dialogState={dialogState}
        setDialogState={setDialogState}
        setBoards={setBoards}
      />
    </>
  );
};

export default Boards;
