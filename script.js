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

        // Add delete functionality
        row.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1); // Remove the task from the list
            displayTasks(); // Re-display the tasks
        });

        // Add edit functionality
        row.querySelector('.edit-btn').addEventListener('click', () => {
            editTask(index);
        });
        // Apply priority color to the priority cell only
        const priorityCell = row.cells[3];
        if (task.priority === 'High') {
         priorityCell.style.color = 'red';
        } else if (task.priority === 'Medium') {
        priorityCell.style.color = 'orange';
        } else if (task.priority === 'Low') {
        priorityCell.style.color = 'green';
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

    // Function to fill the form with task data for editing
    function editTask(index) {
        const task = tasks[index];
        document.getElementById('title').value = task.title;
        document.getElementById('team').value = task.team;
        document.getElementById('description').value = task.description;
        document.getElementById('priority').value = task.priority;
        document.getElementById('deadline').value = task.deadline;
        document.getElementById('assignee').value = task.assignee;

        editIndex = index; // Set the current edit index
        document.querySelector('button[type="submit"]').textContent = 'Update Task'; // Change the button text to "Update Task"
    }

    // Word count logic
    descriptionInput.addEventListener('input', function() {
        const wordCount = descriptionInput.value.split(/\s+/).filter(word => word.length > 0).length;
        wordCountDisplay.textContent = `${wordCount}/30 words`;
        if (wordCount > 30) {
            wordCountDisplay.style.color = 'red';
        } else {
            wordCountDisplay.style.color = '#888';
        }
    });

    // Set date input to only show future dates
    const today = new Date().toISOString().split('T')[0];
    deadlineInput.setAttribute('min', today);

    // Function to filter tasks by search or priority
    function filterTasks() {
        const searchQuery = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        Array.from(taskTable.rows).forEach((row, index) => {
            const title = tasks[index].title.toLowerCase();
            const description = tasks[index].description.toLowerCase();
            const priority = tasks[index].priority;
            const isMatch = (title.includes(searchQuery) || description.includes(searchQuery)) &&
                (filterValue === '' || priority === filterValue);

            row.style.display = isMatch ? '' : 'none';
        });
    }

    searchInput.addEventListener('input', filterTasks);
    filterSelect.addEventListener('change', filterTasks);
});

