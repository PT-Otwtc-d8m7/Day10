const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = ""; // Biến lưu trạng thái hiện tại của bộ lọc

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
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
    const taskText = tasks[index].text;
    taskInput.value = taskText;

    const addButton = document.querySelector(".input-container button");
    addButton.innerText = "Edit";
    addButton.onclick = function() {
        saveEdit(index);
    };
}

function saveEdit(index) {
    const newTaskText = taskInput.value.trim();
    if (newTaskText === "") {
        alert("Edit Fail - Type Again Please");
        return;
    }

    tasks[index].text = newTaskText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();

    taskInput.value = "";
    const addButton = document.querySelector(".input-container button");
    addButton.innerText = "Add";
    addButton.onclick = addTask;

    alert("Edit Success");
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        if (currentFilter === "" || (currentFilter === "done" && task.done) || (currentFilter === "undone" && !task.done)) {
            const li = document.createElement("li");
            li.innerHTML = `
            <span onclick="toggleDone(${index})", style="${task.done ? 'text-decoration: line-through;' : ''}">${task.text}</span>
            <hr>
            <button class="edit-button" onclick="editTask(${index})">Edit</button>
            <button class="delete-button" onclick="deleteTask(${index})">Delete</button>`;
            taskList.appendChild(li);
        }
    });
    showAllButtons();
}

function filterDone() {
    currentFilter = "done";
    displayTasks();
    hideButtonsExcept("Done", "All");
}

function filterUndone() {
    currentFilter = "undone";
    displayTasks();
    hideButtonsExcept("Undone", "All");
}

function displayAllTasks() {
    currentFilter = "";
    displayTasks();
    showAllButtons();
}

function hideButtonsExcept(buttonName, buttonName2) {
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    filterButtons.forEach(button => {
        if (button.innerText !== buttonName && button.innerText !== buttonName2) {
            button.style.display = "none";
        } else {
            button.style.display = "inline-block";
        }
    });
}

function showAllButtons() {
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    filterButtons.forEach(button => {
        button.style.display = "inline-block";
    });
}

displayTasks();