import React from "react";
import Kanban from "./Kanban";
import { authorQuoteMap, TaskType } from "./data";
import { BoardMember } from "../../types/Board";
import AddColumnDialog from "./AddColumnDialog";
import Editable from "../../components/Editable";
import TaskDialog from "./TaskDialog";

const AddColumnDialogState = {
  id: 0,
  title: "",
};

const TaskDialogState: TaskType = {
  id: 0,
  title: "",
  content: "",
  authors: [] as BoardMember[],
  date: "",
  comments: 4,
};

const BoardPersons: BoardMember[] = [
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
];

const IndividualBoard = () => {
  const [boardName, setBoardName] = React.useState("");
  const [boardMembers /*, setBoardMembers*/] =
    React.useState<BoardMember[]>(BoardPersons);
  const [addColumnDialog, setAddColumnDialog] =
    React.useState<typeof AddColumnDialogState>(AddColumnDialogState);
  const [taskDialog, setTaskDialog] =
    React.useState<typeof TaskDialogState>(TaskDialogState);
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] =
    React.useState<boolean>(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] =
    React.useState<boolean>(false);

  const boardRef = React.useRef<HTMLInputElement>(null);
  

  return (
    <>
      <div className="flex flex-col w-full overflow-auto">
        <div className="flex justify-between w-full items-center">
          <div className="flex w-full">
            {/* <h4 className="text-xl font-bold">Board</h4> */}
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
              >
                <i className="far fa-user-plus"></i> Invite
              </button>
              {boardMembers.map((user, index) => (
                <img
                  src={user.avatar ? user.avatar.photo : "/img/user.svg"}
                  alt={user.name}
                  className={
                    "w-8 h-8 rounded-full border-2 border-blue-50 shadow" +
                    (index > 0 ? " -ml-3" : "")
                  }
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full items-center my-4">
          <div className="flex w-full">
            {/* filter button */}
            <button
              className="text-gray-700 hover:text-white hover:bg-gray-700 border border-gray-700 rounded px-3 py-1 text-sm focus:outline-none focus:shadow-outline"
              id="filter-button"
            >
              <i className="far fa-filter"></i> Filter
            </button>
          </div>
          <div className="flex w-full place-content-end">
            <div className="flex">
              <button
                className="text-gray-700 hover:text-white hover:bg-gray-700 border border-gray-700 rounded px-3 py-1 text-sm mr-2 focus:outline-none focus:shadow-outline"
                onClick={() => {
                  setAddColumnDialog(AddColumnDialogState);
                  setIsAddColumnDialogOpen(true);
                }}
              >
                <i className="far fa-plus"></i> Add Column
              </button>
            </div>
          </div>
        </div>
        <Kanban 
          initial={authorQuoteMap} 
          setIsTaskDialogOpen={setIsTaskDialogOpen}
          setTaskDialog={setTaskDialog}
        />
      </div>
      <AddColumnDialog
        dialogState={addColumnDialog}
        setDialogState={setAddColumnDialog}
        isOpen={isAddColumnDialogOpen}
        closeDialog={() => setIsAddColumnDialogOpen(false)}
      />
      <TaskDialog
        task={(taskDialog as TaskType)}
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
