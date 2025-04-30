document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const logoutBtn = document.getElementById('logoutBtn');
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const userNameDisplay = document.getElementById('userName');

    if (!user) {
        // Si no hay usuario logueado, redirige a login
        window.location.href = 'login.html';
        return;
    }

    userNameDisplay.textContent = user.name;

    // Cargar tareas del usuario logueado
    let tasks = JSON.parse(localStorage.getItem(`tasks_${user.email}`)) || [];
    renderTasks();

    // Cerrar sesión
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedUser');
        window.location.href = 'login.html';
    });

    // Agregar nueva tarea
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const text = taskInput.value.trim();
        if (!text) return;

        const newTask = {
            id: Date.now(),
            text
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    });

    // Renderizar tareas en pantalla
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;

            const btn = document.createElement('button');
            btn.textContent = 'Eliminar';
            btn.addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
                renderTasks();
            });

            li.appendChild(btn);
            taskList.appendChild(li);
        });
    }

    // Guardar tareas en localStorage
    function saveTasks() {
        localStorage.setItem(`tasks_${user.email}`, JSON.stringify(tasks));
    }
});
