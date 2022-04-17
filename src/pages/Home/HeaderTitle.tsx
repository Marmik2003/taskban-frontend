import React from "react";

interface HeaderTitleProps {
  userName: string;
}

const HeaderTitle = ({ userName }: HeaderTitleProps) => {
  const curDate = new Date();
  const hours = curDate.getHours();
  let greet;

  if (hours < 12) greet = "Good Morning";
  else if (hours >= 12 && hours <= 17) greet = "Good Afternoon";
  else if (hours >= 17 && hours <= 24) greet = "Good Evening";

  const dd = curDate.getDate();

  const todayDay = `${curDate.toLocaleDateString("en-US", {weekday: "long"})}, ${curDate.toLocaleDateString("en-US", {month: "long"})} ${dd}`;

  return (
    <div className="w-full flex-col">
      <p className="text-sm text-gray-600">
        {todayDay}
      </p>
      <h4 className="text-2xl font-bold text-left">
        {greet}, {userName}!
      </h4>
    </div>
  );
};

export default HeaderTitle;
