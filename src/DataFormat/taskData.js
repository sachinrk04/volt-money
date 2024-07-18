function Tasks(id, title, description, priority, taskStatus, taskTime) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.taskStatus = taskStatus;
  this.taskTime = taskTime;
}

exports.Tasks = Tasks;
