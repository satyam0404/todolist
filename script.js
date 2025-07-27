let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = 'all';

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div class="task-main">
        <span onclick="toggleTask(${index})">${task.text}</span>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
      <small>Added on: ${task.date}</small>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text !== "") {
    const now = new Date().toLocaleDateString("en-IN", {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    tasks.push({ text, completed: false, date: now });
    saveAndRender();
    input.value = "";
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function toggleDark() {
  document.body.classList.toggle("dark-mode");
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();
