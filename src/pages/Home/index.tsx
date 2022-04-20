import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { dashboardCount } from "../../APIMethods";
import { useAuth } from "../../context/AuthContext";
import { DashboardType } from "../../types/Dashboard";
import DashboardCard from "./DashboardCard";
import HeaderTitle from "./HeaderTitle";
import Tasks from "./Tasks";

const InitialDashboard: DashboardType = {
  incomplete_tasks: [],
  completed_tasks: [],
  overdue_tasks: [],
}

const Home = () => {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [dashboard, setDashboard] = React.useState<DashboardType>(InitialDashboard);

  useEffect(() => {
    document.title = "Taskban - Dashboard";
    setLoading(true);
    dashboardCount().then((res) => {
      setDashboard(res);
    }).catch((err) => {
      console.log(err);
      toast.error("Error fetching dashboard data");
    }).finally(() => {
      setLoading(false);
    });

    return () => {
      document.title = "Taskban";
    }
  }, [])

  
  return (
    <>
      <HeaderTitle userName={user!.name || user!.username} />
      <div className="grid grid-cols-4 gap-6 lg:grid-cols-1 my-8">
        <DashboardCard title="Completed Tasks" num={loading ? -1 : dashboard.completed_tasks.length} />
        <DashboardCard title="Incomplete Tasks" num={loading ? -1 : dashboard.incomplete_tasks.length} />
        <DashboardCard title="Overdue Tasks" num={loading ? -1 : dashboard.overdue_tasks.length} />
      </div>

      <Tasks 
        tasks={dashboard}
        loading={loading}  
      />
    </>
  );
};

export default Home;
