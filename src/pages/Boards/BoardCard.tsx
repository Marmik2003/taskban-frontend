import React from "react";
import Tooltip from "../../components/Tooltip";
import Board from "../../types/Board";

interface CardProps {
  board: Board;
  onClick: (board: Board) => void;
}

const BoardCard = ({ board, onClick }: CardProps) => {
  return (
    <div className="report-card cursor-pointer">
      <div className="card rounded-xl">
        <div className="relative card-body flex flex-col h-44">
          {/* top */}
          <div className="flex flex-row justify-between items-center">
            <h6 className="text-base">{board.title}</h6>
            <button
              className="text-gray-600 border border-gray-600 px-2 py-1 text-xs rounded-md"
              onClick={() => onClick(board)}
            >
              <i className="far fa-edit text-xs"></i>
            </button>

          </div>
          <p className="text-xs text-gray-600">{
            board.description.length > 0 ? (
              board.description.length > 120 ? (
                board.description.substring(0, 120) + "..."
              ) : (
                board.description
              )
            ) : "No description"
          }</p>
          {/* end top */}
          {/* bottom */}
          <div className="absolute bottom-0 mb-3 flex mt-4">
            {board.members?.map((user, index) => (
              <Tooltip tooltipText={user.name} key={index} idx={index}>
                <img
                  src={
                    user.avatar ? user.avatar.photo : "/img/user.svg"
                  }
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-blue-50 shadow"
                />
              </Tooltip>
            ))}
          </div>
          {/* end bottom */}
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
