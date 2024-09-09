document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    
    let tasks = [];
    let editIndex = null; // Track the index of the task being edited

    function addTaskRow(task, index) {
        const row = taskTable.insertRow();
        row.classList.add(`${task.priority.toLowerCase()}-priority`);
        row.innerHTML = `
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
                </select>
            </td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        row.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1); // Remove the task from the list
            displayTasks(); // Re-display the tasks
        });

        row.querySelector('.edit-btn').addEventListener('click', () => {
            editTask(index);
        });
    }

    function displayTasks() {
        taskTable.innerHTML = ''; // Clear the table
        tasks.forEach((task, index) => {
            addTaskRow(task, index); // Add each task to the table
        });
    }

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newTask = {
            team: document.getElementById('team').value,
            description: document.getElementById('description').value,
            priority: document.getElementById('priority').value,
            deadline: document.getElementById('deadline').value,
            assignee: document.getElementById('assignee').value
        };

        if (editIndex === null) {
            // Add new task
            tasks.push(newTask);
        } else {
            // Update the existing task
            tasks[editIndex] = newTask;
            editIndex = null;
        }

        taskForm.reset(); // Clear the form
        document.querySelector('button[type="submit"]').textContent = 'Add Task'; // Reset button text
        displayTasks(); // Refresh the task table
    });

    function editTask(index) {
        const task = tasks[index];
        document.getElementById('team').value = task.team;
        document.getElementById('description').value = task.description;
        document.getElementById('priority').value = task.priority;
        document.getElementById('deadline').value = task.deadline;
        document.getElementById('assignee').value = task.assignee;

        editIndex = index; // Set the current edit index
        document.querySelector('button[type="submit"]').textContent = 'Update Task'; // Change the button text to "Update Task"
    }

    function filterTasks() {
        const searchQuery = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        Array.from(taskTable.rows).forEach((row, index) => {
            const title = tasks[index].team.toLowerCase();
            const priority = tasks[index].priority;

            const isMatch = title.includes(searchQuery) &&
                (filterValue === '' || priority === filterValue);

            row.style.display = isMatch ? '' : 'none';
        });
    }

    searchInput.addEventListener('input', filterTasks);
    filterSelect.addEventListener('change', filterTasks);

    function restrictPastDates() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('deadline').setAttribute('min', today);
    }

    restrictPastDates();
});
