import React from "react";
import { toast } from "react-toastify";
import { addColumn } from "../../APIMethods";
import DialogBox from "../../components/DialogBox";
import { BoardColumn, Task } from "../../types/Board";

interface ColumnDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  dialogState: {
    id: number;
    title: string;
    board: number;
  };
  setDialogState: React.Dispatch<
    React.SetStateAction<{
      id: number;
      title: string;
      board: number;
    }>
  >;
  initialBoard: Record<string, Task[]>;
  setInitialBoard: React.Dispatch<React.SetStateAction<Record<string, Task[]>>>;
  setColumns: React.Dispatch<React.SetStateAction<{id: number, title: string}[]>>;
}

const AddColumnDialog = ({
  isOpen,
  closeDialog,
  dialogState,
  setDialogState,
  initialBoard,
  setInitialBoard,
  setColumns,
}: ColumnDialogProps) => {
  const [loading, setLoading] = React.useState(false); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    addColumn(dialogState.board, dialogState.title).then((res: BoardColumn) => {
      setInitialBoard(initialBoard => ({
        ...initialBoard,
        [res.id.toString()]: [],
      }))
      setColumns(columns => ([
        ...columns,
        {
          id: res.id,
          title: res.title,
        }
      ]))
      console.log(initialBoard, "initialBoard");
      closeDialog();
    }).catch(err => {
      console.error(err);
      err = JSON.parse(err.message);
      toast.error(err[Object.keys(err)[0]]);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <DialogBox
      dialogTitle={dialogState.id === 0 ? "Add Column" : "Edit Column"}
      isOpen={isOpen}
      closeDialog={closeDialog}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mt-2">
              Column Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter Column name"
              value={dialogState.title}
              onChange={(e) =>
                setDialogState({ ...dialogState, title: e.target.value })
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
            {loading && (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            )} Add Column
          </button>
        </div>
      </form>
    </DialogBox>
  );
};

export default AddColumnDialog;
