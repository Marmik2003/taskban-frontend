import React from "react";
import LoadingComponent from "../../components/LoadingComponent";

interface DashboardCardProps {
    title: string;
    num: number;
};

const DashboardCard = ({ title, num }: DashboardCardProps) => {
  return (
    <div className="report-card">
      <div className="card">
        <div className="card-body flex flex-col">
          {/* top */}
          <div className="flex flex-row justify-between items-center">
            <h6 className="h6 text-sm">{title}</h6>
          </div>
          {/* end top */}
          {/* bottom */}
          <div className="mt-8">
            <h1 className="h5 num-4">{num !== -1 ? num : (
              <LoadingComponent />
            )}</h1>
            <p>Task Count</p>
          </div>
          {/* end bottom */}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
