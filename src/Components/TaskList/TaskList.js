import React from "react";
import "./TaskList.scss";
import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({ tasks, deleteTask, editedTask }) {
  return (
    <div className="task-list-container">
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editedTask={editedTask}
          />
        ))}
      </ul>
    </div>
  );
}
