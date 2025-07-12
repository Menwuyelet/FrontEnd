/// Selectors
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

// initializes the index storage properly
if (localStorage.getItem("count") === null) {
  localStorage.setItem("count", 0);
}

function addTask() {
  const taskName = taskInput.value.trim();
  if (taskName === "") {
    alert("Please enter a task.");
    return;
  }

  // store the task not only its name also its status to get consistent state after reloading
  const taskObject = {
    name: taskName,
    completed: false
  };

    
  let idx = Number(localStorage.getItem("count"));
  localStorage.setItem(idx, JSON.stringify(taskObject)); // using json to make it string not an object
  localStorage.setItem("count", idx + 1);

  taskInput.value = "";
  listTasks();
}

function listTasks() {
  taskList.innerHTML = ""; // clear the existing list in the html doc
  let count = Number(localStorage.getItem("count"));

  for (let i = 0; i < count; i++) {
    let taskString = localStorage.getItem(i);
    if (!taskString || taskString === "undefined") continue; // to jump the key that is deleted.

    const taskObject = JSON.parse(taskString);

    const list = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskObject.name;

    if (taskObject.completed) {
      span.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";

    deleteButton.addEventListener("click", function (e) {
      e.stopPropagation();
      localStorage.removeItem(i);
      listTasks();
    });

    list.addEventListener("click", function () {
      span.classList.toggle("completed");
      taskObject.completed = !taskObject.completed;
      localStorage.setItem(i, JSON.stringify(taskObject));
    });

    list.appendChild(span);
    list.appendChild(deleteButton);
    taskList.appendChild(list);
  }
}

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

addTaskButton.addEventListener("click" , addTask);
listTasks();