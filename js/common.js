// Validar campos vacíos
export function areFieldsEmpty(...fields) {
    return fields.some(field => !field.trim());
}

// Mostrar alerta personalizada
export function showAlert(message) {
    alert(message);
}

// Verificar si hay usuario logueado (redirige si no)
export function verifySessionOrRedirect(redirectTo = 'login.html') {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    if (!user) {
        window.location.href = redirectTo;
    }
    return user;
}

// Obtener tareas del usuario actual
export function getTasks(email) {
    return JSON.parse(localStorage.getItem(`tasks_${email}`)) || [];
}

// Guardar tareas del usuario actual
export function saveTasks(email, tasks) {
    localStorage.setItem(`tasks_${email}`, JSON.stringify(tasks));
}
