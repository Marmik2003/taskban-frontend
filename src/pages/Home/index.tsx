import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { updateTask } from "../../APIMethods";
import { dashboardCount } from "../../APIMethods";
import { useAuth } from "../../context/AuthContext";
import { Task } from "../../types/Board";
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
    dashboardCount().then((res) => {
      setLoading(false);
      setDashboard(res);
    }).catch((err) => {
      console.log(err);
      toast.error("Error fetching dashboard data");
    })

    return () => {
      document.title = "Taskban";
    }
  }, [])

  const handleCompleteTask = (task: Task) => {
    setLoading(true);
    updateTask(task.id, undefined, undefined, undefined, undefined, undefined, undefined, true).then((res) => {
      setDashboard((prevState) => {
        const newDashboard = {
          ...prevState,
          completed_tasks: [...prevState.completed_tasks, {...task, finished: true}],
          incomplete_tasks: prevState.incomplete_tasks.filter((t) => t.id !== task.id),
        }
        return newDashboard;
      });
    }).catch((err) => {
      console.log(err);
      toast.error("Error completing task");
    }).finally(() => {
      setLoading(false);
    });
  }
  
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
        handleCompleteTask={handleCompleteTask}
        loading={loading}  
      />
    </>
  );
};

export default Home;
