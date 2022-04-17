import React from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardCard from "./DashboardCard";
import HeaderTitle from "./HeaderTitle";
import Tasks from "./Tasks";

const Home = () => {
  const auth = useAuth();

  return (
    <>
      <HeaderTitle userName={auth.user} />
      <div className="grid grid-cols-4 gap-6 lg:grid-cols-1 my-8">
        <DashboardCard title="Completed Tasks" num={60} />
        <DashboardCard title="Incomplete Tasks" num={10} />
        <DashboardCard title="Total Tasks" num={70} />
      </div>

      <Tasks />
    </>
  );
};

export default Home;
