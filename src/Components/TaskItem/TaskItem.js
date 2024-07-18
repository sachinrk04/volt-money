import React, { useState } from "react";
import "./TaskItem.scss";
import Button from "../Button/Button";
import TaskForm from "../TaskForm/TaskForm";
import { Tasks } from "../../DataFormat/taskData";
import Modal from "../Modal/Modal";

export default function TaskItem({ task, deleteTask, editedTask }) {
  const [isEditModal, setEditModal] = useState(false);
  const [isEditStatus, setEditStatus] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState(
    isEditStatus ? "" : task.taskStatus
  );
  const [isEditPeiority, setEditPeiority] = useState(false);
  const [peiorityUpdate, setPeiorityUpdate] = useState(
    isEditPeiority ? "" : task.priority
  );

  const updatedTask = (id, data) => {
    editedTask(id, data);
    setEditStatus(false);
  };

  const onClickStatus = () => {
    const newStatus = new Tasks(
      task.id,
      task.title,
      task.description,
      task.priority,
      statusUpdate,
      task.time
    );
    editedTask(task.id, newStatus);
    setEditStatus(false);
  };

  const onClickPeiority = () => {
    const newPeiority = new Tasks(
      task.id,
      task.title,
      task.description,
      peiorityUpdate,
      task.taskStatus,
      task.time
    );
    editedTask(task.id, newPeiority);
    setEditPeiority(false);
  };

  return (
    <li className="task-list__item">
      {isEditModal ? (
        <Modal modalTitle="Update task" closePopup={() => setEditModal(false)}>
          <TaskForm
            onSetTasks={updatedTask}
            submitType="update-task"
            editData={task}
            closePopup={() => setEditModal(false)}
          />
        </Modal>
      ) : null}
      <div className="task-list__item__view">
        <div className="task-list__item__header">
          <h3 className="task-list__item__title">{task.title}</h3>
          <div className="task-list__item__action">
            <div className="task-list__item__status">
              <h4 className="task-status">
                Status:{" "}
                {isEditStatus ? (
                  <div>
                    <select
                      name="status"
                      value={statusUpdate}
                      onChange={(e) => setStatusUpdate(e.target.value)}
                    >
                      <option value="Created">Created</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <span className="update" onClick={onClickStatus}>
                      &#9989;
                    </span>
                    <span
                      className="close"
                      onClick={() => setEditStatus(false)}
                    >
                      &#10060;
                    </span>
                  </div>
                ) : (
                  <span onDoubleClick={() => setEditStatus(true)}>
                    {task.taskStatus}
                  </span>
                )}
              </h4>
              <h4 className="task-priority">
                Priority:{" "}
                {isEditPeiority ? (
                  <div>
                    <select
                      name="priority"
                      value={peiorityUpdate}
                      onChange={(e) => setPeiorityUpdate(e.target.value)}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <span className="update" onClick={onClickPeiority}>
                      &#9989;
                    </span>
                    <span
                      className="close"
                      onClick={() => setEditPeiority(false)}
                    >
                      &#10060;
                    </span>
                  </div>
                ) : (
                  <span onDoubleClick={() => setEditPeiority(true)}>
                    {task.priority}
                  </span>
                )}
              </h4>
            </div>
            <div>
              <Button
                type={"button"}
                children={"Edit"}
                className="edit-task"
                onClick={() => setEditModal(true)}
              />
              <Button
                type={"button"}
                children={"Delete"}
                className="delete-task"
                onClick={() => deleteTask(task.id)}
              />
            </div>
          </div>
        </div>
        <div className="task-list__item__description">
          {task.description?.length ? task.description : "No description"}
        </div>
      </div>
    </li>
  );
}
