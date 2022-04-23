import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { getUser, getUserByUsername, inviteUser, removeUser } from "../../APIMethods";
import DialogBox from "../../components/DialogBox";
import { useAuth } from "../../context/AuthContext";
import { BoardMember } from "../../types/Board";

interface InviteDialogProps {
  memberIds: number[];
  setMemberIds: React.Dispatch<React.SetStateAction<number[]>>;
  boardId: number;
  isOpen: boolean;
  onClose: () => void;
}

const InviteDialog = ({
  memberIds,
  setMemberIds,
  boardId,
  isOpen,
  onClose,
}: InviteDialogProps) => {
  const [members, setMembers] = React.useState<BoardMember[]>([]);
  const [username, setUsername] = React.useState("");
  const [userState, setUserState] = React.useState<BoardMember | undefined>();

  useEffect(() => {
    const timer = setTimeout(() => {
      getUserByUsername(username)
        .then((user) => {
          setUserState(user);
        })
        .catch(() => {
          setUserState(undefined);
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [username]);

  useEffect(() => {
    setMembers([]);
    Promise.all(memberIds.map((id) => getUser(id).then((user) => user))).then(
      (users) => {
        setMembers(users);
      }
    );
  }, [memberIds]);

  const { user } = useAuth();

  return (
    <DialogBox
      dialogTitle="Board Members"
      isOpen={isOpen}
      closeDialog={onClose}
      maxDialogSize="md"
    >
      <div className={`grid grid-cols-1 space-y-2 space-x-6 md:space-x-0`}>
        <div className="flex flex-col py-6 my-3 border-t">
          {members.map((member, index) => (
            <div className="flex items-center" key={index}>
              <img
                src={member.avatar ? member.avatar.photo : "/img/user.svg"}
                alt={member.name || member.username}
                className="w-8 h-8 rounded-full border-2 border-blue-50 shadow"
              />
              <div className="ml-3">
                {member.name || member.username}{" "}
                {member.id === user!.id ? (
                  "(You)"
                ) : (
                  <button
                    className="text-xs ml-1 text-red-500 hover:text-red-700"
                    onClick={() => {
                      removeUser(member.username!, boardId).then(() => {
                        setMemberIds((prev) => prev.filter((id) => id !== member.id));
                        toast.success("User removed from board");
                      });
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col py-6 my-3">
          <div className="flex items-center">
            <img
              src={userState?.avatar ? userState?.avatar.photo : "/img/user.svg"}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-blue-50 shadow"
            />
            <div className="ml-3">
              <input
                type="text"
                className={
                  "w-full px-3 py-1 border peer-focus-visible:ring-0 focus:ring-offset-0 rounded-md text-sm " +
                  (userState !== undefined
                    ? "border-sky-500 ring-sky-500"
                    : "border-red-400 ring-red-400")
                }
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <button
              className="text-sm bg-sky-500 text-white px-3 py-2 rounded-lg ml-3"
              onClick={() => {
                if (userState !== undefined) {
                  inviteUser([userState.id], boardId).then(() => {
                    setMemberIds([...memberIds, userState.id]);
                    setUsername("");
                    setUserState(undefined);
                  }).catch((err) => {
                    setUsername("");
                    setUserState(undefined);
                    err = JSON.parse(err.message);
                    toast.error(Object.values(err.errors)[0] as string);
                  });
                }
              }}
            >
              <i className="fas fa-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    </DialogBox>
  );
};

export default InviteDialog;
