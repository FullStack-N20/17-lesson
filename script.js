document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskForm = document.getElementById("add-task");
    const tasksContainer = document.getElementById("tasks");
    const doneContainer = document.getElementById("done-tasks");
    const taskCount = document.getElementById("task-count");
    const doneCount = document.getElementById("done-count");

    let tasks = 0;
    let doneTasks = 0;

    addTaskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        addTask(taskText);
        taskInput.value = "";
    });

    function addTask(text) {
        const task = document.createElement("div");
        task.classList.add("task");

        task.innerHTML = `
            <span>${text}</span>
            <div class="icons">
                <span class="check">✔</span>
                <span class="delete">🗑</span>
            </div>
        `;

        tasksContainer.appendChild(task);
        tasks++;
        updateCount();

        task.querySelector(".check").addEventListener("click", function () {
            moveToDone(task);
        });
        task.querySelector(".delete").addEventListener("click", function () {
            deleteTask(task);
        });
    }

    function moveToDone(task) {
        task.classList.add("completed");
        doneContainer.appendChild(task);
        tasks--;
        doneTasks++;
        updateCount();

        task.querySelector(".check").remove();
    }

    function deleteTask(task) {
        task.remove();
        if (task.classList.contains("completed")) {
            doneTasks--;
        } else {
            tasks--;
        }
        updateCount();
    }

    function updateCount() {
        taskCount.textContent = tasks;
        doneCount.textContent = doneTasks;
    }
});
