import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../types/Board";
import TaskComponent from "./Task";

interface TaskListProps {
  tasks: Task[];
  setTaskDialog: React.Dispatch<React.SetStateAction<Task>>;
  setIsTaskDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleArchive: (task: Task) => void;
}

export class TaskList extends Component<TaskListProps> {
  shouldComponentUpdate(nextProps: { tasks: Task[] }) {
    if (nextProps.tasks !== this.props.tasks) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <>
        {this.props.tasks.map((task, index) => (
          <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => (
              <TaskComponent
                task={task}
                provided={provided}
                handleArchive={this.props.handleArchive}
                isDragging={snapshot.isDragging}
                onClick={() => {
                  this.props.setTaskDialog(task);
                  this.props.setIsTaskDialogOpen(true);
                }}
              />
            )}
          </Draggable>
        ))}
      </>
    );
  }
}

export default TaskList;
