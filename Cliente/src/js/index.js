// URL base del backend
const URL = 'http://localhost:8080';

// Función para manejar la autenticación
const authenticate = async (username, password) => {
    try {
        const response = await fetch(`${URL}/auth`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",  // Indica que el cuerpo es JSON
                "Accept": "application/json"         // Espera una respuesta JSON
            },
            body: JSON.stringify({ user: username, password: password })
        });

        if (!response.ok) {
            throw new Error('Usuario o contraseña incorrectos'); // Error personalizado
        }

        const data = await response.json();
        localStorage.setItem('token', data.data); // Guarda el token
        return true; // Indica éxito
    } catch (error) {
        console.error('Error en la autenticación:', error.message);
        return false; // Indica fallo
    }
};

// Función para manejar el evento de envío del formulario
const Login = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage'); // Obtener el elemento del mensaje

    // Limpiar mensajes previos
    loginMessage.textContent = '';
    loginMessage.classList.remove('text-danger', 'text-success');

    // Llamar a la función de autenticación
    const isAuthenticated = await authenticate(username, password);

    if (isAuthenticated) {
        // Mostrar mensaje de éxito y redirigir
        loginMessage.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
        loginMessage.classList.add('text-success');

        setTimeout(() => {
            window.location.href = '../../article.html'; // Cambia esto a la URL de tu página destino
        }, 2000);
    } else {
        // Mostrar mensaje de error
        loginMessage.textContent = 'Usuario o contraseña incorrectos. Intenta de nuevo.';
        loginMessage.classList.add('text-danger');
    }
};

// Asociar la función al evento de envío del formulario
document.getElementById('loginForm').addEventListener('submit', Login);
