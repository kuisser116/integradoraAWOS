const checkAdminAccess = () => {
    const token = localStorage.getItem('token'); // Obtener el token
    const role = localStorage.getItem('role');  
    console.log(role); // Obtener el rol

    if (!token) {
        window.location.href = 'index.html'; // Redirige al login si no hay token
    }

    if (role !== 'ROLE_RESPONSABLE') {
        window.location.href = 'article.html'; // Redirige al login si no es admin
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

// OBTENER CATEGORIAS




const findAllCategories = async () => {
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
    }).catch(console.log);
};



const loadData = async flag => {
    await findAllCategories(); 
    let select = document.getElementById(flag ? 'categories' : 'u_departments'); // Recuperando el select
    let content = ''; 

    categories.forEach(item => { 
        content += `<option value="${item.id}">${item.name}</option>`;
    });
    select.innerHTML = content;
};

// OBTENER A LOS USUARIOS

const findAllEmployees = async () => {
    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/employee`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`

        }
    }).then(response => response.json()).then(response => {
        console.log(response);
        employees = response.data;
    }).catch(console.log);
}

// OBTENER LOS ARTICULOS


const findAllArticles = async () => {
    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/article`, {
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
}

//MOSTRAR A LOS USUARIOS EN LA TABLA

const loadTable = async () => {
    await findAllArticles();
    console.log(articles);
    
    let tbody = document.getElementById('tbody');
    let content = ''; 

    articles.forEach((item, index) => {
        content += `<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${item.name}</td>
                        <td>${item.description}</td>
                        <td>${item.category.name}</td>
                        <td class="text-center">
                            <button class="btn btn-outline-danger" data-bs-target="#deleteModal" data-bs-toggle="modal" onclick="findById(${item.id})">Eliminar</button>
                            <button class="btn btn-outline-primary" data-bs-target="#updateModal" data-bs-toggle="modal" onclick="setDataOnForm(${item.id})">Editar</button>
                        </td>
                    </tr>`;
    });
    tbody.innerHTML = content;
}

// Esta función se ejecuta una sola vez al cargar el JS
(async () => {
    await loadTable();
})();

// SAVE

const save = async () => {
    let form = document.getElementById('saveForm');
    article = {
        name: document.getElementById('fullName').value,
        description: document.getElementById('eMail').value,
        category: {
            id: document.getElementById('categories').value
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
}

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
}

// UPDATE

const setDataOnForm = async id => {
    await findById(id);
    await loadData(false);

    document.getElementById('u_fullName').value = articles.name;
    document.getElementById('u_eMail').value = articles.description;
    document.getElementById('u_departments').value = articles.category.id;
}

const update = async () => {
    let form = document.getElementById('updateForm');
    let updated = {
        name: document.getElementById('u_fullName').value,
        description: document.getElementById('u_eMail').value,
        category: {
            id: document.getElementById('u_departments').value
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
}

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
}