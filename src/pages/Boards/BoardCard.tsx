import React from "react";
import MembersList from "../../components/MembersList";
import { history } from "../../history";
import Board from "../../types/Board";

interface CardProps {
  board: Board;
  onClick: (board: Board) => void;
}

const BoardCard = ({ board, onClick }: CardProps) => {
  return (
    <div 
      className="report-card cursor-pointer"
      onClick={() => history.push(`boards/${board.id}`)}
    >
      <div className="card rounded-xl">
        <div className="relative card-body flex flex-col h-44">
          {/* top */}
          <div className="flex flex-row justify-between items-center">
            <h6 className="text-base">{board.name}</h6>
            <button
              className="text-gray-600 border border-gray-600 px-2 py-1 text-xs rounded-md"
              onClick={(e) => {
                onClick(board)
                e.stopPropagation()
              }}
            >
              <i className="far fa-edit text-xs"></i>
            </button>
          </div>
          <p className="text-xs text-gray-600">
            {board.description.length > 0
              ? board.description.length > 120
                ? board.description.substring(0, 120) + "..."
                : board.description
              : "No description"}
          </p>
          {/* end top */}
          {/* bottom */}
          <div className="absolute bottom-0 mb-3 flex mt-4">
            <MembersList memberIds={board.members as number[]} />
          </div>
          {/* end bottom */}
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
