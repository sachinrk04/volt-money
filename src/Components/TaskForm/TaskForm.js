import React, { useState } from "react";
import "./TaskForm.scss";
import Button from "../Button/Button";
import { Tasks } from "../../DataFormat/taskData";

export default function TaskForm({
  onSetTasks,
  submitType,
  editData,
  closePopup,
}) {
  const [addTask, setAddTask] = useState(
    submitType === "update-task"
      ? editData
      : { title: "", description: "", priority: "Low", status: "Created" }
  );

  const onChangeTask = (e) => {
    const { name, value } = e.target;
    setAddTask({ ...addTask, [name]: value });
  };

  const onAddTask = () => {
    if (submitType === "add-task") {
      const taskId = "ADD-TASK-" + new Date().getTime();
      const addTaskTime = new Date();
      const newTask = new Tasks(
        taskId,
        addTask.title,
        addTask.description,
        addTask.priority,
        addTask.status,
        addTaskTime
      );
      onSetTasks(newTask);
      setAddTask({
        title: "",
        description: "",
        priority: "Low",
        status: "Created",
      });
      closePopup();
    } else {
      const updatedTask = new Tasks(
        editData.id,
        addTask.title,
        addTask.description,
        editData.priority,
        editData.taskStatus,
        editData.time
      );
      onSetTasks(editData.id, updatedTask);
      setAddTask({
        title: "",
        description: "",
        priority: "Low",
        status: "Created",
      });
      closePopup();
    }
  };

  return (
    <div className="add-task-container">
      <div className={`add-task-box`}>
        <input
          className={`${
            submitType === "add-task" ? "add-title" : "edit-title"
          }`}
          type="text"
          name="title"
          placeholder="Title"
          value={addTask.title}
          onChange={(e) => onChangeTask(e)}
          autoFocus={submitType === "add-task" ? false : true}
        />
        <textarea
          rows={4}
          className={`${
            submitType === "add-task" ? "add-description" : "edit-description"
          }`}
          type="text"
          name="description"
          placeholder="Description"
          value={addTask.description}
          onChange={(e) => onChangeTask(e)}
        />
        {submitType === "update-task" ? (
          <div>
            <Button
              type={"button"}
              children={"UPDATE"}
              onClick={onAddTask}
              className={"update-button"}
              disabled={!addTask.title?.length}
            />
            <Button
              type={"button"}
              children={"Cancel"}
              onClick={closePopup}
              className={"update-button"}
            />
          </div>
        ) : (
          <Button
            type={"button"}
            children={"ADD TASK"}
            onClick={onAddTask}
            className={"add-button"}
            disabled={!addTask.title?.length}
          />
        )}
      </div>
    </div>
  );
}
