const checkAdminAccess = () => {
    const token = localStorage.getItem('token'); // Obtener el token
    const role = localStorage.getItem('role');  
    const department = localStorage.getItem('department');
    const departmentId = localStorage.getItem('departmentId');
    const departmentCategoryId = localStorage.getItem('departmentCategoryId');

    console.log(departmentCategoryId); // Obtener el rol


    if (!token) {
        window.location.href = 'index.html'; // Redirige al login si no hay token
    }

    if (role !== 'ROLE_RESPONSABLE') {
        window.location.href = 'article_user.html'; // Redirige al login si no es admin
    }
};

// Llamar a la función para verificar el acceso solo si se necesita
checkAdminAccess();

// Función para cerrar sesión
const logout = () => {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    localStorage.removeItem('role');  // Elimina el rol del almacenamiento local
    window.location.href = 'index.html'; // Redirige al login
};

const URL = 'http://localhost:8080';
let departments = [];
let categories = [];
let employees = [];
let articles = [];
let employee = {};



const displayUserInfo = () => {
    const userName = localStorage.getItem('username'); // Suponiendo que almacenas el nombre del usuario
    const userRole = localStorage.getItem('role');
    console.log(userName);
    
    if (userName && userRole) {
        const userInfoContainer = document.getElementById('user-info');
        userInfoContainer.innerHTML = `<strong>${userName}</strong> (${userRole.replace('ROLE_', '')})`;
    }
};

// Llama a esta función cuando se cargue la página
window.onload = displayUserInfo;

const loadCategories = async () => {
    const token = localStorage.getItem('token');
    await fetch(`${URL}/api/category`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.json()).then(response => {
        console.log(response);
        categories = response.data; 
        populateCategorySelect(); // Llamar a esta función para cargar las categorías en el select
    }).catch(console.log);
};

const populateCategorySelect = () => {
    const categorySelect = document.getElementById('categories');
    categorySelect.innerHTML = ''; // Limpiar el select antes de llenarlo
    categories.forEach(category => {
        categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
};

// Llamar a esta función cuando se cargue la página para cargar las categorías
window.onload = async () => {
    await loadCategories();
    displayUserInfo(); // Mantén la función de mostrar usuario también
};

console.log(localStorage.getItem('token'))

// OBTENER ARTICULOS
const findAllArticles = async () => {
    const token = localStorage.getItem('token');
    const departmentName = localStorage.getItem('department');  // Obtener el nombre del departamento

    await fetch(`${URL}/api/article`, {  // Obtener todos los artículos
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.json()).then(response => {
        console.log(response);
        // Filtrar artículos que coincidan con el nombre del departamento
        articles = response.data.filter(article => 
            article.department.name.trim().toLowerCase() === departmentName.trim().toLowerCase()
        );
        
    }).catch(console.log);
};

// Cargar tabla de artículos
const loadTable = async () => {
    await findAllArticles();
    console.log("Articulos chidos",articles);
    
    let tbody = document.getElementById('tbody');
    let content = ''; 

    articles.forEach((item, index) => {
        content += `<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${item.name}</td>
                        <td>${item.description}</td>
                        <td>${item.category.name}</td>
                        <td>${item.department.name}</td> <!-- Muestra el departamento del artículo -->
                        <td class="text-center">
                            <button class="btn btn-danger" data-bs-target="#deleteModal" data-bs-toggle="modal" onclick="findById(${item.id})">Eliminar</button>
                            <button class="btn btn-primary" data-bs-target="#updateModal" data-bs-toggle="modal" onclick="setDataOnForm(${item.id})">Editar</button>
                        </td>
                    </tr>`;
    });
    tbody.innerHTML = content;
}

// Esta función se ejecuta una sola vez al cargar el JS
(async () => {
    await loadTable();
})();

// FUNCIONES DE GUARDAR, ACTUALIZAR Y ELIMINAR
const save = async () => {
    let form = document.getElementById('saveForm');
    article = {
        name: document.getElementById('fullName').value,
        description: document.getElementById('eMail').value,
        category: {
            id: 2
        },
        department: {
            id: localStorage.getItem('departmentId')
        }
    };

    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/article`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(article)
    }).then(response => response.json()).then(async response => {
        console.log(response);
        article = {};
        form.reset();
        await loadTable();
    }).catch(console.log);
};

// FIND BY ID
const findById = async id => {
    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/article/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.json()).then(response => {
        console.log(response);
        articles = response.data;
    }).catch(console.log);
};

// UPDATE
const setDataOnForm = async id => {
    await findById(id);

   

    document.getElementById('u_fullName').value = articles.name;
    document.getElementById('u_eMail').value = articles.description;


};

const update = async () => {
    let form = document.getElementById('updateForm');
    let updated = {
        name: document.getElementById('u_fullName').value,
        description: document.getElementById('u_eMail').value,
        category: {
            id: 2
        },
        department: {
            id: localStorage.getItem('departmentId')  // Asigna el nombre del departamento desde el localStorage
        }
        
    };
    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/article/${articles.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updated)
    }).then(response => response.json()).then(async response => {
        console.log(response);
        articles = {};
        form.reset();
        await loadTable();
    }).catch(console.log);
};

// REMOVE
const remove = async () => {
    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/article/${articles.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.json()).then(async response => {
        console.log(response);
        articles = {};
        await loadTable();
    }).catch(console.log);
};
