document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const descriptionInput = document.getElementById('description');
    const wordCountDisplay = document.getElementById('wordCount');
    const deadlineInput = document.getElementById('deadline');

    let tasks = [];
    let editIndex = null;

    function addTaskRow(task, index) {
        const row = taskTable.insertRow();
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.team}</td>
            <td>${task.description}</td>
            <td>${task.priority}</td>
            <td>${task.deadline}</td>
            <td>${task.assignee}</td>
            <td>
                <select>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Blocked">Blocked</option>
                </select>
            </td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        row.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1);
            displayTasks();
        });

        row.querySelector('.edit-btn').addEventListener('click', () => {
            editTask(index);
        });

        const priorityCell = row.cells[3];
        if (task.priority === 'High') {
            priorityCell.style.color = 'red';
        } else if (task.priority === 'Medium') {
            priorityCell.style.color = 'orange';
        } else if (task.priority === 'Low') {
            priorityCell.style.color = 'green';
        }
    }

    function displayTasks(filteredTasks = tasks) {
        taskTable.innerHTML = '';
        filteredTasks.forEach((task, index) => {
            addTaskRow(task, index);
        });
    }

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newTask = {
            title: document.getElementById('title').value,
            team: document.getElementById('team').value,
            description: document.getElementById('description').value,
            priority: document.getElementById('priority').value,
            deadline: document.getElementById('deadline').value,
            assignee: document.getElementById('assignee').value
        };

        if (editIndex === null) {
            tasks.push(newTask);
        } else {
            tasks[editIndex] = newTask;
            editIndex = null;
        }

        taskForm.reset();
        document.querySelector('button[type="submit"]').textContent = 'Add Task';
        displayTasks();
    });

    function editTask(index) {
        const task = tasks[index];
        document.getElementById('title').value = task.title;
        document.getElementById('team').value = task.team;
        document.getElementById('description').value = task.description;
        document.getElementById('priority').value = task.priority;
        document.getElementById('deadline').value = task.deadline;
        document.getElementById('assignee').value = task.assignee;

        editIndex = index;
        document.querySelector('button[type="submit"]').textContent = 'Update Task';
    }

    descriptionInput.addEventListener('input', function() {
        const wordCount = descriptionInput.value.trim().split(/\s+/).length;
        wordCountDisplay.textContent = `${wordCount}/30 words`;
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm));
        displayTasks(filteredTasks);
    });

    filterSelect.addEventListener('change', function() {
        const filterValue = filterSelect.value;
        const filteredTasks = tasks.filter(task => task.priority === filterValue || filterValue === "");
        displayTasks(filteredTasks);
    });

    deadlineInput.setAttribute('min', new Date().toISOString().split('T')[0]);
});
