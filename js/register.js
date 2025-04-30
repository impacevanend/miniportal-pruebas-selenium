document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value.trim();
        const confirmPassword = form.confirmPassword.value.trim();
        const acceptedTerms = form.terms.checked;

        // Validación básica
        if (!name || !email || !password || !confirmPassword) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        if (!acceptedTerms) {
            alert('Debes aceptar los términos y condiciones.');
            return;
        }

        // Obtener usuarios actuales (si existen)
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificar que el correo no esté registrado
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            alert('Este correo ya está registrado.');
            return;
        }

        // Crear nuevo usuario
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Usuario registrado exitosamente.');

        // Redirigir a login
        window.location.href = 'login.html';
    });
});
