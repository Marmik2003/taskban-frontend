import React, { useEffect } from "react";
import { getUser } from "../APIMethods";
import { BoardMember } from "../types/Board";
import LoadingComponent from "./LoadingComponent";
import Tooltip from "./Tooltip";

interface MembersListProps {
  memberIds?: Number[];
}

const MembersList = ({ memberIds }: MembersListProps) => {
  const [loading, setLoading] = React.useState(true);
  const [boardMembers, setBoardMembers] = React.useState<BoardMember[]>([]);

  const _getUser = async (id: Number) => {
    const user = await getUser(id);
    return user;
  };

  useEffect(() => {
    setLoading(true);
    setBoardMembers([]);
    Promise.all(
      memberIds!.map((id) => _getUser(id).then((user) => user))
    ).then((users) => {
      setBoardMembers(users);
    });
    setLoading(false);
  }, [memberIds]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <LoadingComponent />
        </div>
      ) : (
        boardMembers.map((user, index) => (
          <Tooltip tooltipText={user.name || user.username!} key={index} idx={index}>
            <img
              src={user.avatar ? user.avatar.photo : "/img/user.svg"}
              alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-blue-50 shadow"
            />
          </Tooltip>
        ))
      )}
    </>
  );
};

export default MembersList;
