document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profileForm');
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!user) {
        // Si no hay sesión activa, redirigir a login
        window.location.href = 'login.html';
        return;
    }

    // Mostrar datos actuales del usuario en el formulario
    form.name.value = user.name;
    form.email.value = user.email;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newName = form.name.value.trim();
        const newEmail = form.email.value.trim();

        if (!newName || !newEmail) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        // Verificar si el nuevo correo ya lo usa otro usuario
        const emailInUse = users.find(u => u.email === newEmail && u.email !== user.email);
        if (emailInUse) {
            alert('Este correo ya está en uso por otro usuario.');
            return;
        }

        // Actualizar usuario en el array de usuarios
        const updatedUsers = users.map(u => {
            if (u.email === user.email) {
                return { ...u, name: newName, email: newEmail };
            }
            return u;
        });

        // Actualizar tareas si cambió el correo (reubicar clave de localStorage)
        if (user.email !== newEmail) {
            const oldTasks = JSON.parse(localStorage.getItem(`tasks_${user.email}`)) || [];
            localStorage.removeItem(`tasks_${user.email}`);
            localStorage.setItem(`tasks_${newEmail}`, JSON.stringify(oldTasks));
        }

        // Guardar cambios en localStorage
        const updatedUser = { ...user, name: newName, email: newEmail };
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('loggedUser', JSON.stringify(updatedUser));

        alert('Perfil actualizado correctamente.');
        window.location.href = 'dashboard.html';
    });
});
