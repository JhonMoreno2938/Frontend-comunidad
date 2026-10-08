document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const usernameInput = document.getElementById('newUsername').value;
    const passwordInput = document.getElementById('newPassword').value;
    const successDiv = document.getElementById('successMsg');
    const errorDiv = document.getElementById('errorMsg');

    successDiv.style.display = 'none';
    errorDiv.style.display = 'none';

    try {
        // Petición hacia tu API de Python en el puerto 8000
        const response = await fetch('http://192.168.0.107:8000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        });

        if (response.ok) {
            // Mostramos mensaje de éxito
            successDiv.style.display = 'block';

            // Limpiamos el formulario
            document.getElementById('registerForm').reset();

            // Si quieres redirigir a otra página, descomenta la línea siguiente
            // window.location.href = 'usuarios-registrados.html';
        } else {
            const errData = await response.json();
            errorDiv.innerText = errData.detail || 'Error al registrar el usuario';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        errorDiv.innerText = 'No se pudo conectar con la API de Python';
        errorDiv.style.display = 'block';
    }
});