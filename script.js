// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskTableBody = document.querySelector('#taskTable tbody');
    let tasks = [];
    let editIndex = -1;

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const priority = document.getElementById('priority').value;
        const deadline = document.getElementById('deadline').value;
        const assignee = document.getElementById('assignee').value;

        const task = { title, description, priority, deadline, assignee };

        if (editIndex === -1) {
            // Add new task
            tasks.push(task);
        } else {
            // Edit existing task
            tasks[editIndex] = task;
            editIndex = -1;
        }

        resetForm();
        displayTasks();
    });

    function displayTasks() {
        taskTableBody.innerHTML = '';
        tasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.priority}</td>
                <td>${task.deadline}</td>
                <td>${task.assignee}</td>
                <td>${task.completed ? 'Completed' : 'Pending'}</td>
                <td class="actions">
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </td>
            `;
            taskTableBody.appendChild(row);
        });
    }

    function resetForm() {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('priority').value = 'Low';
        document.getElementById('deadline').value = '';
        document.getElementById('assignee').value = 'Member1';
        document.getElementById('editIndex').value = '';
        editIndex = -1;
        document.getElementById('addTaskBtn').innerText = 'Add Task';
    }

    window.editTask = function (index) {
        const task = tasks[index];
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;
        document.getElementById('priority').value = task.priority;
        document.getElementById('deadline').value = task.deadline;
        document.getElementById('assignee').value = task.assignee;
        editIndex = index;
        document.getElementById('addTaskBtn').innerText = 'Update Task';
    }

    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        displayTasks();
    }
});
