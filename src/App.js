import React, { useEffect, useState } from "react";
import "./App.scss";
import AddTask from "./Components/TaskForm/TaskForm";
import TaskList from "./Components/TaskList/TaskList";
import Modal from "./Components/Modal/Modal";
import Button from "./Components/Button/Button";

function App() {
  const [tasks, setTasks] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const addNewTask = (data) => {
    const newData = [...tasks, data];
    localStorage.setItem("tasks", JSON.stringify(newData));
    setTasks(newData);
  };

  const deleteTask = (id) => {
    const deletedData = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(deletedData));
    setTasks(deletedData);
  };

  const editTask = (id, updatedTask) => {
    const editedTask = tasks.map((task) =>
      task.id === id ? updatedTask : task
    );
    localStorage.setItem("tasks", JSON.stringify(editedTask));
    setTasks(editedTask);
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (priorityFilter === "" || task.priority === priorityFilter) &&
      (statusFilter === "" || task.taskStatus === statusFilter) &&
      (titleFilter === "" ||
        task.title.toLowerCase().includes(titleFilter.toLowerCase()))
    );
  });

  return (
    <div className="app-container">
      {modal ? (
        <Modal modalTitle="Add new task" closePopup={() => setModal(false)}>
          <AddTask
            onSetTasks={addNewTask}
            submitType="add-task"
            closePopup={() => setModal(false)}
          />
        </Modal>
      ) : null}
      <div className="add-task">
        <h3>Task Manager</h3>
      </div>
      <div className="filter-tasks">
        <div className="filter">
          <input
            type="text"
            placeholder="Filter by Title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
          <select
            name="priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            name="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Created">Created</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="add-task-btn">
          <Button
            type={"button"}
            children={"ADD TASK"}
            onClick={() => setModal(true)}
            className={"add-task-button"}
          />
        </div>
      </div>
      {filteredTasks && filteredTasks.length ? (
        <div className="task-list">
          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            editedTask={editTask}
          />
        </div>
      ) : (
        <div className="no-task">No Tasks</div>
      )}
    </div>
  );
}

export default App;
