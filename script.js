document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');

    let tasks = [];
    let editIndex = null; // Track the index of the task being edited

    // Function to add a row to the task table
    function addTaskRow(task, index) {
        const row = taskTable.insertRow();
        row.innerHTML = `
            <td>${task.title}</td>
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

        // Add delete functionality
        row.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1); // Remove the task from the list
            displayTasks(); // Re-display the tasks
        });

        // Add edit functionality
        row.querySelector('.edit-btn').addEventListener('click', () => {
            editTask(index);
        });

        // Apply priority color
        const priorityCell = row.cells[2];
        if (task.priority === 'High') {
            priorityCell.style.backgroundColor = 'red';
            priorityCell.style.color = 'white';
        } else if (task.priority === 'Medium') {
            priorityCell.style.backgroundColor = 'orange';
            priorityCell.style.color = 'black';
        } else if (task.priority === 'Low') {
            priorityCell.style.backgroundColor = 'green';
            priorityCell.style.color = 'white';
        }
    }

    // Function to display all tasks
    function displayTasks() {
        taskTable.innerHTML = ''; // Clear the table
        tasks.forEach((task, index) => {
            addTaskRow(task, index); // Add each task to the table
        });
    }

    // Add or update a task
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newTask = {
            title: document.getElementById('title').value,
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

    // Function to fill the form with task data for editing
    function editTask(index) {
        const task = tasks[index];
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;
        document.getElementById('priority').value = task.priority;
        document.getElementById('deadline').value = task.deadline;
        document.getElementById('assignee').value = task.assignee;

        editIndex = index; // Set the current edit index
        document.querySelector('button[type="submit"]').textContent = 'Update Task'; // Change the button text to "Update Task"
    }

    // Function to filter tasks by search or priority
    function filterTasks() {
        const searchQuery = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        Array.from(taskTable.rows).forEach((row, index) => {
            const description = tasks[index].description.toLowerCase();
            const priority = tasks[index].priority;

            const isMatch = description.includes(searchQuery) &&
                (filterValue === '' || priority === filterValue);

            row.style.display = isMatch ? '' : 'none';
        });
    }

    searchInput.addEventListener('input', filterTasks);
    filterSelect.addEventListener('change', filterTasks);
});
