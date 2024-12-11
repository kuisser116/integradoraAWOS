// URL base del backend
const URL = 'http://localhost:8080';

// Verificar si ya existe un token y rol en localStorage
const token = localStorage.getItem('token'); // Obtener el token
const role = localStorage.getItem('role');  
console.log(role); // Obtener el rol

// Si el token ya existe y el rol también, redirigir según el rol
if (token && role) {
    if (role === 'ROLE_ADMIN') {
        window.location.href = 'user.html'; // Redirige a la página de admin
    } else if (role === 'ROLE_RESPONSABLE') {
        window.location.href = 'article_user.html'; // Redirige a la página de responsable
    } 
}

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
            throw new Error('Usuario o contraseña incorrectos');
        }

        const data = await response.json();
        localStorage.setItem('token', data.data); // Guarda el token
        
        const userRole = await getUserRole(username);
        if (userRole) {
            localStorage.setItem('role', userRole); // Guarda el rol
        }
        return true;
    } catch (error) {
        console.error('Error en la autenticación:', error.message);
        return false;
    }
};

// Función para obtener el rol del usuario
const getUserRole = async (username) => {
    try {
        const response = await fetch(`${URL}/api/employee/${username}/role`, {
            method: 'GET',
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('No se pudo obtener el rol del usuario');
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        console.log('Rol del usuario:', data.name);
        return data.name; // Devuelve el rol (nombre del rol)
        
    } catch (error) {
        console.error('Error al obtener el rol del usuario:', error.message);
        return null;
    }
};

// Función para manejar el evento de envío del formulario
const Login = async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    loginMessage.textContent = '';
    loginMessage.classList.remove('text-danger', 'text-success');

    const isAuthenticated = await authenticate(username, password);

    if (isAuthenticated) {
        loginMessage.textContent = 'Inicio de sesión exitoso';
        loginMessage.classList.add('text-success');

        const userRole = await getUserRole(username);

        if (userRole) {
            console.log('Redirigiendo según el rol:', userRole);

            setTimeout(() => {
                switch (userRole) {
                    case 'ROLE_ADMIN':
                        window.location.href = 'user.html';
                        break;
                    case 'ROLE_RESPONSABLE':
                        window.location.href = 'article_user.html';
                        break;
                    case 'ROLE_USUARIO':
                        window.location.href = 'usuario.html';
                        break;
                    default:
                        alert('Rol no reconocido');
                        console.error('Rol no reconocido');
                        break;
                }
            }, 1000);
        } else {
            alert('No se pudo determinar el rol del usuario');
        }
    } else {
        loginMessage.textContent = 'Usuario o contraseña incorrectos. Intenta de nuevo.';
        loginMessage.classList.add('text-danger');
    }
};

// Asociar la función al evento de envío del formulario
document.getElementById('loginForm').addEventListener('submit', Login);
