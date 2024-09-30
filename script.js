document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const confirmationMessage = document.getElementById('confirmationMessage');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const descriptionInput = document.getElementById('description');
    const wordCountDisplay = document.getElementById('wordCount');
    const deadlineInput = document.getElementById('deadline');

    let tasks = [];
    let editIndex = null;

    function addTaskRow(task, index) {
        const row = taskTable.insertRow();
        row.innerHTML = 
            `<td>${task.title}</td>
            <td>${task.team}</td>
            <td>${task.description}</td>
            <td style="color: ${getPriorityColor(task.priority)};">${task.priority}</td>
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
            </td>`;

        row.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete the task titled "${task.title}"?`)) {
                tasks.splice(index, 1);
                displayTasks();
            }
        });

        row.querySelector('.edit-btn').addEventListener('click', () => {
            editIndex = index;
            document.getElementById('title').value = task.title;
            document.getElementById('team').value = task.team;
            document.getElementById('description').value = task.description;
            document.getElementById('priority').value = task.priority;
            document.getElementById('deadline').value = task.deadline;
            document.getElementById('assignee').value = task.assignee;
        });
    }

    function displayTasks() {
        taskTable.innerHTML = '';
        tasks.forEach(addTaskRow);
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

        const actionMessage = editIndex === null ? "add" : "edit";
        if (confirm(`Are you sure you want to ${actionMessage} this task?`)) {
            if (editIndex === null) {
                tasks.push(newTask);
                confirmationMessage.style.display = 'block'; // Show confirmation message
                setTimeout(() => confirmationMessage.style.display = 'none', 3000); // Hide after 3 seconds
            } else {
                tasks[editIndex] = newTask;
                editIndex = null;
            }

            taskForm.reset();
            displayTasks();
        }
    });

    function getPriorityColor(priority) {
        switch (priority) {
            case "High":
                return "red";
            case "Medium":
                return "orange";
            case "Low":
                return "green";
            default:
                return "black";
        }
    }

    descriptionInput.addEventListener('input', function() {
        const wordCount = this.value.split(/\s+/).filter(Boolean).length;
        wordCountDisplay.textContent = `${wordCount}/30 words`;
    });

    // Filter and search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        displayTasks(tasks.filter(task => task.title.toLowerCase().includes(searchTerm)));
    });

    filterSelect.addEventListener('change', function() {
        const filterValue = this.value;
        displayTasks(tasks.filter(task => (filterValue === '' || task.priority === filterValue)));
    });
});

