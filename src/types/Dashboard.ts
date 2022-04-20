import { Task } from "./Board";

export interface DashboardType {
  incomplete_tasks: Task[];
  completed_tasks: Task[];
  overdue_tasks: Task[];
}