if (!localStorage.getItem('token')) {
    window.location.href = 'index.html'; // Redirigir al login si no hay token
}

const logout = () => {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
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
    let select = document.getElementById(flag ? 'categories' : 'u_categories'); // Recuperando el select
    let content = ''; 

    categories.forEach(item => { 
        content += `<option value="${item.id}">${item.name}</option>`;
    });
    select.innerHTML = content;
};



// OBTENER LOS Almacenes


const findAllStorages = async () => {
    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/department`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`

        }
    }).then(response => response.json()).then(response => {
        console.log(response);
        departments = response.data;
    }).catch(console.log);
}

//MOSTRAR los almacenes EN LA TABLA

const loadTable = async () => {
    await findAllStorages();
    console.log(departments);
    
    let tbody = document.getElementById('tbody');
    let content = ''; 

    departments.forEach((item, index) => {
        content += `<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${item.name}</td>
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
    departments = {
        name: document.getElementById('fullName').value,
        category: {
            id: document.getElementById('categories').value
        }
    };

    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/department`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify(departments)
    }).then(response => response.json()).then(async response => {
        console.log(response);
        departments = {};
        form.reset();
        await loadTable();
    }).catch(console.log);
}

// FIND BY ID

const findById = async id => {
    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/department/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`

        }
    }).then(response => response.json()).then(response => {
        console.log(response);
        departments = response.data;
    }).catch(console.log);
}

// UPDATE

const setDataOnForm = async id => {
    await findById(id);
    await loadData(false);

    document.getElementById('u_fullName').value = departments.name;
    document.getElementById('u_categories').value = departments.category.id;
}

const update = async () => {
    let form = document.getElementById('updateForm');
    let updated = {
        name: document.getElementById('u_fullName').value,
        category: {
            id: document.getElementById('u_categories').value
        }
    };
    const token = localStorage.getItem('token');


    await fetch(`${URL}/api/department/${departments.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify(updated)
    }).then(response => response.json()).then(async response => {
        console.log(response);
        departments = {};
        form.reset();
        await loadTable();
    }).catch(console.log);
}

// REMOVE 

const remove = async () => {
    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/department/${departments.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`

        }
    }).then(response => response.json()).then(async response => {
        console.log(response);
        departments = {};
        await loadTable();
    }).catch(console.log);
}