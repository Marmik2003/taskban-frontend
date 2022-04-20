import React from "react";

interface PriorityTextProps {
  priority: "L" | "M" | "H" | "N";
}

const PriorityText = ({ priority }: PriorityTextProps) => {
  if (priority === "H") {
    return (
      <p className="ml-6 flex text-sm justify-center items-center">
        <i className="far fa-arrow-up text-lg text-red-600 mr-1" /> High
      </p>
    );
  } else if (priority === "M") {
    return (
      <p className="ml-6 flex text-sm justify-center items-center">
        <i className="far fa-circle text-yellow-500 text-lg mr-1" /> Medium
      </p>
    );
  } else if (priority === "L") {
    return (
      <p className="ml-6 flex text-sm justify-center items-center">
        <i className="far fa-arrow-down text-lg text-green-600 mr-1" /> Low
      </p>
    );
  } else {
    return (
      <p className="ml-6 flex text-sm justify-center items-center">
        <i className="far fa-circle text-gray-500 text-lg mr-1" /> Not set
      </p>
    );
  }
};

export default PriorityText;
