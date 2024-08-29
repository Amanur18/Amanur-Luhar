document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;

        if (taskText) {
            const task = {
                id: Date.now(),
                text: taskText,
                dueDate
            };

            tasks.push(task);
            renderTasks();
            taskInput.value = '';
            dueDateInput.value = '';
        }
    }

    function renderTasks() {
        taskList.innerHTML = '';

        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';

            const taskDetails = document.createElement('div');
            taskDetails.className = 'task-details';

            const taskText = document.createElement('span');
            taskText.textContent = `${task.text} - ${task.dueDate}`;

            taskDetails.appendChild(taskText);

            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-btn';
            editButton.addEventListener('click', () => editTask(task.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(task.id));

            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            taskItem.appendChild(taskDetails);
            taskItem.appendChild(taskActions);

            taskList.appendChild(taskItem);
        });
    }

    function editTask(id) {
        const task = tasks.find(task => task.id === id);
        taskInput.value = task.text;
        dueDateInput.value = task.dueDate;
        deleteTask(id);
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }
});
