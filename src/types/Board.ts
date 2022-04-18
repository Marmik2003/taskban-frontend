type UserAvatar = {
  id: Number;
  photo: string;
  name: string;
}

export type BoardMember = {
  id: Number;
  name: string;
  email?: string;
  avatar?: UserAvatar;
}

type Task = {
  id: Number;
  title: string;
  description: string;
  priority: 'L' | 'M' | 'H';
  labels: Number[];
  assignees: Number[];
  task_order: Number;
  column: Number;
  due_date: string;
  finished: boolean;
  created: Date;
  modified: Date;
}

type TaskLabel = {
  id: Number;
  name: string;
  color: string;
  board: Number;
}

export type BoardColumn = {
  id: Number;
  title: string;
  tasks: Task[];
  column_order: Number;
  board: Number;
}

type Board = {
  id: Number;
  title: string;
  description: string;
  owner?: Number;
  members?: BoardMember[];
  columns?: BoardColumn[];
  labels?: TaskLabel[];
}

export default Board;
