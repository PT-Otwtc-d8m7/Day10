const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") 
    {
        alert("Add Fail - Type Again Please");
        return;
    }    

    const task = { text: taskText, done: false }; 
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";

    displayTasks();
}
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}
function editTask(index) {
    const newTaskText = prompt("Edit the Task: ", tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText;
        alert("Edit Success");

        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}
function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}
function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span onclick="toggleDone(${index})", style="${task.done ? 'text-decoration: line-through;' : ''}">${task.text}</span>
        <hr>
        <button class="edit-button" onclick="editTask(${index})">Edit</button>
        <button class="delete-button" onclick="deleteTask(${index})">Delete</button>`
        // <li onclick="toggleDone(${index})">${task.done ? 'Undone' : 'Done'}</li>`;

        taskList.appendChild(li);
    });
}
function filterDone() {
    const doneTasks = tasks.filter(task => task.done);
    displayFilteredTasks(doneTasks);
}
function filterUndone() {
    const undoneTasks = tasks.filter(task => !task.done);
    displayFilteredTasks(undoneTasks);
}
function displayFilteredTasks(filteredTasks) {
    taskList.innerHTML = "";
    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
       <span onclick="toggleDone(${index})", style="${task.done ? 'text-decoration: line-through;' : ''}">${task.text}</span>
        <hr>
        <button class="edit-button" onclick="editTask(${index})">Edit</button>
        <button class="delete-button" onclick="deleteTask(${index})">Delete</button>`;

        taskList.appendChild(li);
    });
}

function displayAllTasks() {
    displayTasks();
}


displayTasks();
