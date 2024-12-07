const setEmail = async () => {
    const emailInput = document.getElementById("email").value;

    if (!emailInput) {
        console.error("Por favor ingresa un correo.");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailInput })
        });

        if (response.ok) {
            // Mostrar el modal con Bootstrap
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

              // Redirigir al cerrar el modal
              document.getElementById('successModal').addEventListener('hidden.bs.modal', () => {
                window.location.href = "index.html";
            });
            
            console.log(`Correo enviado exitosamente a: ${emailInput}`);
        } else {
            console.error('Error al enviar el correo.');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
    }
};
