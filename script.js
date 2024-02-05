let tasks = [
    { id: 1, name: 'Task 1', dueDate: 'MM/DD/YYYY', status: 'In Progress' },
    { id: 2, name: 'Task 2', dueDate: 'MM/DD/YYYY', status: 'Completed' },
    // Add more tasks as needed
];

function displayTasks() {
    const taskListContainer = document.getElementById('task-list');
    taskListContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <h3>${task.name}</h3>
            <p>Due Date: <span>${task.dueDate}</span></p>
            <p>Status: <span>${task.status}</span></p>
            <div class="task-actions">
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                <button class="status-btn" onclick="updateTaskStatus(${task.id})">Mark ${task.status === 'In Progress' ? 'Completed' : 'In Progress'}</button>
            </div>
        `;
        taskListContainer.appendChild(taskItem);
    });
}

function addTask(taskName, dueDate) {
    const newTask = {
        id: tasks.length + 1,
        name: taskName,
        dueDate: dueDate,
        status: 'In Progress',
    };

    tasks.push(newTask);
    displayTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
}

function updateTaskStatus(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    const currentStatus = tasks[taskIndex].status;

    tasks[taskIndex].status = currentStatus === 'In Progress' ? 'Completed' : 'In Progress';
    displayTasks();
}
document.addEventListener('DOMContentLoaded', function () {
    const featureCheckboxes = document.querySelectorAll('.feature-checkbox');
    const featuredTaskList = document.getElementById('featured-task-list');

    featureCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const taskItem = checkbox.closest('.task-item');
            const taskId = taskItem.dataset.taskId;

            if (checkbox.checked) {
                // If checked, add to featured tasks on home page
                const featuredTaskItem = taskItem.cloneNode(true);
                featuredTaskList.appendChild(featuredTaskItem);
            } else {
                // If unchecked, remove from featured tasks
                const featuredTaskItem = featuredTaskList.querySelector(`[data-task-id="${taskId}"]`);
                featuredTaskItem.remove();
            }
        });
    });
});
document.getElementById('task-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('due-date').value;

    if (taskName && dueDate) {
        addTask(taskName, dueDate);
        document.getElementById('task-name').value = '';
        document.getElementById('due-date').value = '';
    } else {
        alert('Please fill in all the fields.');
    }
});

document.addEventListener('DOMContentLoaded', displayTasks);
