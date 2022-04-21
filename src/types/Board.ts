type UserAvatar = {
  id: number;
  photo: string;
  name: string;
}

export type BoardMember = {
  id: number;
  name: string;
  username?: string;
  email?: string;
  avatar?: UserAvatar;
}

export type Task = {
  id: number;
  title: string;
  description?: string;
  priority?: 'L' | 'M' | 'H';
  labels?: number[];
  assignees: number[];
  task_order?: number;
  column: number;
  due_date: string;
  finished?: boolean;
  created?: Date;
  modified?: Date;
}

export type TaskLabel = {
  id: number;
  name: string;
  color: string;
  board: number;
}

export type BoardColumn = {
  id: number;
  title: string;
  tasks: Task[];
  column_order: number;
  board: number;
}

type Board = {
  id: number;
  name: string;
  description: string;
  owner?: number;
  members?: BoardMember[] | number[];
  columns?: BoardColumn[];
  labels?: TaskLabel[];
}

export default Board;
