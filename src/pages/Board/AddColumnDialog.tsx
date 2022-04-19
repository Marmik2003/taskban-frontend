import React from "react";
import DialogBox from "../../components/DialogBox";

interface ColumnDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  dialogState: {
    id: number;
    title: string;
  }
  setDialogState: React.Dispatch<React.SetStateAction<{
    id: number;
    title: string;
  }>>;
}

const AddColumnDialog = ({isOpen, closeDialog, dialogState, setDialogState}: ColumnDialogProps) => {
  return (
    <DialogBox
      dialogTitle={dialogState.id === 0 ? "Add Column" : "Edit Column"}
      isOpen={isOpen}
      closeDialog={closeDialog}
    >
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
          onClick={closeDialog}
        >
          Add Column
        </button>
      </div>
    </DialogBox>
  );
};

export default AddColumnDialog;
