import React, { useEffect } from "react";
import Board from "../../types/Board";
import BoardCard from "./BoardCard";
import BoardDialog from "./BoardDialog";

const DialogState: Board = {
  id: 0,
  title: "",
  description: "",
};

const exampleBoards: Board[] = [
  {
    id: 1,
    title: "Board 1",
    description: "This is board 1",
    members: [
      {
        id: 1,
        name: "John Doe",
        email: "abc@xyz.com",
        avatar: {
          id: 1,
          name: "John Doe",
          photo:
            "https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg",
        },
      },
      {
        id: 2,
        name: "William Folks",
        email: "will.folks@taskban.co",
        avatar: {
          id: 2,
          name: "William Folks",
          photo:
            "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg",
        },
      },
      {
        id: 3,
        name: "Charles Kilber",
        email: "c.k@taskban.co",
        avatar: {
          id: 3,
          name: "Charles Kilber",
          photo:
            "https://demos.creative-tim.com/notus-js/assets/img/team-3-800x800.jpg",
        },
      },
      {
        id: 4,
        name: "Donna Hughes",
        email: "d.h@taskban.co",
      },
    ],
  },
  {
    id: 2,
    title: "Board 2",
    description: "This is board 2",
  },
  {
    id: 3,
    title: "Board 3",
    description: "This is board 3",
  },
];

const Boards = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [boards, setBoards] = React.useState<Board[]>([]);
  const [dialogState, setDialogState] = React.useState(DialogState);
  const [searchString, setSearchString] = React.useState("");

  useEffect(() => {
    setBoards(exampleBoards);
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
        {boards
          .filter(
            (board) =>
              board.title.toLowerCase().includes(searchString.toLowerCase()) ||
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
          ))}
      </div>
      <BoardDialog
        isOpen={isDialogOpen}
        closeDialog={handleDialogClose}
        dialogState={dialogState}
        setDialogState={setDialogState}
      />
    </>
  );
};

export default Boards;
