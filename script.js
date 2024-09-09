document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');

    function addTaskRow(task) {
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
                <button class="delete-btn">Delete</button>
            </td>
        `;
        row.querySelector('.delete-btn').addEventListener('click', () => {
            taskTable.deleteRow(row.rowIndex - 1);
        });
    }

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newTask = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            priority: document.getElementById('priority').value,
            deadline: document.getElementById('deadline').value,
            assignee: document.getElementById('assignee').value
        };

        addTaskRow(newTask);

        taskForm.reset();
    });

    function filterTasks() {
        const searchQuery = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        Array.from(taskTable.rows).forEach(row => {
            const title = row.cells[0].textContent.toLowerCase();
            const priority = row.cells[2].textContent;

            const isMatch = title.includes(searchQuery) &&
                (filterValue === '' || priority === filterValue);

            row.style.display = isMatch ? '' : 'none';
        });
    }

    searchInput.addEventListener('input', filterTasks);
    filterSelect.addEventListener('change', filterTasks);
});
