const URL = 'http://localhost:8080';


// OBTENER USUARIOS

const findAllUser = async () => {
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
        users = response.data; 
    }).catch(console.log);
};


