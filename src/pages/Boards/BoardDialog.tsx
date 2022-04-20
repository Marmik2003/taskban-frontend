import React from "react";
import { toast } from "react-toastify";
import { createBoard, updateBoard } from "../../APIMethods";
import DialogBox from "../../components/DialogBox";
import Board from "../../types/Board";

interface BoardDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  dialogState: Board;
  setDialogState: React.Dispatch<React.SetStateAction<Board>>;
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

const BoardDialog = ({
  isOpen,
  closeDialog,
  dialogState,
  setDialogState,
  setBoards,
}: BoardDialogProps) => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const name = dialogState.name;
    const description = dialogState.description;
    if (name.length === 0) {
      toast.warning("Board name cannot be empty");
      return;
    }
    if (dialogState.id === 0) {
      await createBoard(name, description)
      .then((res) => setBoards((prevBoards) => [...prevBoards, res]))
      .catch((err) => {
        console.log(err);
        toast.error("Error creating board");
      })
      .finally(() => {
        setLoading(false);
        closeDialog();
      });
    } else {
      await updateBoard(dialogState.id, name, description)
      .then((res) => {
        setBoards((prevBoards) => {
          const index = prevBoards.findIndex((board) => board.id === res.id);
          const newBoards = [...prevBoards];
          newBoards[index] = res;
          return newBoards;
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating board");
      })
      .finally(() => {
        setLoading(false);
        closeDialog();
      });
    }
  };

  return (
    <DialogBox
      dialogTitle={dialogState.id === 0 ? "New Board" : "Edit Board"}
      isOpen={isOpen}
      closeDialog={closeDialog}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mt-2">
              Board Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter board name"
              value={dialogState.name}
              onChange={(e) =>
                setDialogState({ ...dialogState, name: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mt-2">
              Board Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter board description"
              value={dialogState.description}
              onChange={(e) =>
                setDialogState({ ...dialogState, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end my-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : "Create"}
          </button>
        </div>
      </form>
    </DialogBox>
  );
};

export default BoardDialog;
