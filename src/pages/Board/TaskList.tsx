import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskType } from "./data";
import Task from "./Task";

interface TaskListProps {
  tasks: TaskType[];
  setTaskDialog: React.Dispatch<React.SetStateAction<TaskType>>;
  setIsTaskDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export class TaskList extends Component<TaskListProps> {
  shouldComponentUpdate(nextProps: { tasks: TaskType[] }) {
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
              <Task 
                task={task}
                provided={provided}
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
