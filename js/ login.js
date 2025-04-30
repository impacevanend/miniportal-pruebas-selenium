// Espera a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = form.email.value.trim();
        const password = form.password.value.trim();

        // Simulación: obtener usuarios desde localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Buscar usuario con email y password coincidentes
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Guardar el usuario en sesión (simulada)
            localStorage.setItem('loggedUser', JSON.stringify(user));

            // Redirigir al dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('Correo o contraseña incorrectos.');
        }
    });
});
