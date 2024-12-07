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






//MOSTRAR los almacenes EN LA TABLA

const loadTable = async () => {
    await findAllCategories();
    console.log(categories);
    
    let tbody = document.getElementById('tbody');
    let content = ''; 

    categories.forEach((item, index) => {
        content += `<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${item.name}</td>
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
    categories = {
        name: document.getElementById('fullName').value,
       
    };

    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/category`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify(categories)
    }).then(response => response.json()).then(async response => {
        console.log(response);
        categories = {};
        form.reset();
        await loadTable();
    }).catch(console.log);
}

// FIND BY ID

const findById = async id => {
    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/category/${id}`, {
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
}

// UPDATE

const setDataOnForm = async id => {
    await findById(id);
    await loadData(false);

    document.getElementById('u_fullName').value = categories.name;
}

const update = async () => {
    let form = document.getElementById('updateForm');
    let updated = {
        name: document.getElementById('u_fullName').value
        
    };
    const token = localStorage.getItem('token');


    await fetch(`${URL}/api/category/${categories.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify(updated)
    }).then(response => response.json()).then(async response => {
        console.log(response);
        categories = {};
        form.reset();
        await loadTable();
    }).catch(console.log);
}

// REMOVE 

const remove = async () => {
    const token = localStorage.getItem('token');

    await fetch(`${URL}/api/category/${categories.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`

        }
    }).then(response => response.json()).then(async response => {
        console.log(response);
        categories = {};
        await loadTable();
    }).catch(console.log);
}