import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskType } from "./data";
import Task from "./Task";

export class TaskList extends Component<{ tasks: TaskType[] }> {
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
          <Draggable key={index} draggableId={task.id.toString()} index={index}>
            {(provided) => (
              <Task 
                key={index} 
                task={task}
                provided={provided}
              />
            )}
          </Draggable>
        ))}
      </>
    );
  }
}

export default TaskList;
