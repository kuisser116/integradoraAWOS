const URL = 'http://localhost:8080';
let storage = [];
let users = [];
let rol = [];


const loadAllData = async () => {
    await loadData(true); // Cargar almacenes
    await loadRoles(true); // Cargar roles
};

// OBTENER USUARIOS

const findAllUser = async () => {
    await fetch(`${URL}/api/employee`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => response.json()).then(response => {
        console.log(response);
        users = response.data; 
    }).catch(console.log);
};

// OBTENER LOS ALMACENES

const findAllStorage = async () => {
    await fetch(`${URL}/api/department`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => response.json()).then(response => {
        console.log(response);
        storage = response.data;
    }).catch(console.log);
}

// OBTENER LOS ROLES

const findAllRol = async () => {
    await fetch(`${URL}/api/rol`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => response.json()).then(response => {
        console.log(response);
        rol = response.data;
        console.log(rol);
    }).catch(console.log);
}

// MOSTRAR LOS ALMACENES

const loadData = async flag => {
    await findAllStorage(); 
    let select = document.getElementById(flag ? 'storages' : 'u_storages'); // Recuperando el select
    let content = ''; 

    storage.forEach(item => { 
        content += `<option value="${item.id}">${item.name}</option>`;
    });
    select.innerHTML = content;
};

// MOSTRAR LOS ROLES

const loadRoles = async flag => {
    await findAllRol(); 
    let select = document.getElementById(flag ? 'rol' : 'u_rol'); 
    let content = ''; 

    rol.forEach(item => { 
        content += `<option value="${item.id}">${item.name}</option>`;
    });
    select.innerHTML = content;

    console.log('roles cargados: ',rol)
};

//MOSTRAR A LOS USUARIOS EN LA TABLA

const loadTable = async () => {
    await findAllUser();
    console.log(users);
    
    let tbody = document.getElementById('tbody');
    let content = ''; 

    users.forEach((item, index) => {
        if(item.rol.name != 'Administrador') {

            content += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${item.fullName}</td>
            <td>${item.user}</td>
            <td>${item.eMail}</td>
            <td>${item.rol.name}</td>
            <td>${item.department.name}</td>
            <td class="text-center">
                <button class="btn btn-outline-danger" data-bs-target="#deleteModal" data-bs-toggle="modal" onclick="findById(${item.id})">Eliminar</button>
                <button class="btn btn-outline-primary" data-bs-target="#updateModal" data-bs-toggle="modal" onclick="setDataOnForm(${item.id})">Editar</button>
            </td>
        </tr>`;
        }
        
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
    users = {
        fullName: document.getElementById('fullName').value,
        eMail: document.getElementById('eMail').value,
        password: document.getElementById('password').value,
        user: document.getElementById('user').value,
        rol: {
            id: document.getElementById('rol').value
        },
        department: {
            id: document.getElementById('storages').value
        }
    };

    await fetch(`${URL}/api/employee`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(users)
    }).then(response => response.json()).then(async response => {
        console.log(response);
        users = {};
        form.reset();
        await loadTable();
    }).catch(console.log);
}

// FIND BY ID

const findById = async id => {
    await fetch(`${URL}/api/employee/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => response.json()).then(response => {
        console.log(response);
        users = response.data;
    }).catch(console.log);
}

// UPDATE

const setDataOnForm = async id => {
    await findById(id);
    await loadData(false);
    await loadRoles(false)


    document.getElementById('u_fullName').value = users.fullName;
    document.getElementById('u_eMail').value = users.eMail;
    document.getElementById('u_password').value = users.password;
    document.getElementById('u_user').value = users.user;
    document.getElementById('u_storages').value = users.department.id; // Asegúrate de que esto esté configurado
    document.getElementById('u_rol').value = users.rol.id; 

}

const update = async () => {
    let form = document.getElementById('updateForm');
    let updated = {
        fullName: document.getElementById('u_fullName').value,
        eMail: document.getElementById('u_eMail').value,
        user: document.getElementById('u_user').value,
        //password: document.getElementById('u_password').value,
        department: {
            id: document.getElementById('u_storages').value
        },
        rol: {
            id: document.getElementById('u_rol').value
        }
       
    };

    await fetch(`${URL}/api/employee/${users.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(updated)
    }).then(response => response.json()).then(async response => {
        console.log(response);
        users = {};
        form.reset();
        await loadTable();
    }).catch(console.log);
}


// REMOVE 

const remove = async () => {
    await fetch(`${URL}/api/employee/${users.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => response.json()).then(async response => {
        console.log(response);
        users = {};
        await loadTable();
    }).catch(console.log);
}