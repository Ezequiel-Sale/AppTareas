const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");
const tasksContainer = document.getElementById("tasksContainer");
const taskInput = document.getElementById("taskText");
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString("es", { day: "numeric" });
  dateText.textContent = date.toLocaleString("es", { weekday: "long" });
  dateMonth.textContent = date.toLocaleString("es", { month: "short" });
  dateYear.textContent = date.toLocaleString("es", { year: "numeric" });
};

const addNewTask = (event) => {
  event.preventDefault();
  const task = taskText.value;
  const taskObj = {
    task,
    id: Date.now()
  };
  tasks = [...tasks, taskObj];
  createTask();
  event.target.reset();
};

function createTask() {
  clearHTML();
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const div = document.createElement("div");
      div.addEventListener("click", changeTaskState);
      div.classList.add("task", "roundBorder");
      div.innerHTML = `${task.task} <button task-id="${task.id}" class="botonBorrar">X</button>`;
      tasksContainer.prepend(div);
    });
  }
  syncLocalStorage();
}

function syncLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

function clearHTML() {
  tasksContainer.innerHTML = "";
}

const changeTaskState = (event) => {
  event.target.classList.toggle("done");
}; 

const order = () => {
  const done = [];
  const toDo = [];
  tasksContainer.childNodes.forEach((el) => {
    el.classList.contains("done") ? done.push(el) : toDo.push(el);
  });
  return [...toDo, ...done];
};

const orderedTask = () => {
  order().forEach((el) => tasksContainer.appendChild(el));
};

function initialCharge() {
    if (tasks.length > 0) {
        tasks.map((task) =>{
            createTask(task);
        })
    }
}

initialCharge();

setDate();

tasksContainer.addEventListener('click', deleteTask)

function deleteTask(e) {
  if (e.target.className == 'botonBorrar') {
      const deleteId = parseInt(e.target.getAttribute('task-id'));
      tasks = tasks.filter(task => task.id !== deleteId);
      createTask()
  }
}
