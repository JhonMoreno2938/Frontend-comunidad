// ============================================
// LOGIN - SERVICIO A
// ============================================

// ============================================
// VERIFICAR SI VIENE DE UN LOGOUT DE OTRO SERVICIO
// ============================================
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('logout') === 'true') {
    console.log('🔒 Logout solicitado desde otro servicio. Limpiando sesión...');
    localStorage.clear();
    sessionStorage.clear();
    
    // Limpiamos el parámetro de la URL para que no quede feo
    window.history.replaceState({}, document.title, window.location.pathname);
}

// ============================================
// MANEJO DEL FORMULARIO DE LOGIN
// ============================================
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const errorDiv = document.getElementById('errorMsg');
    
    errorDiv.style.display = 'none';

    // Apuntamos al endpoint de tu API en FastAPI
    const apiUrl = 'http://192.168.0.107:8000/api/auth/login';

    try {
        const response = await fetch(apiUrl, {
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
            const data = await response.json();
            
            // Almacenamos los tokens y roles devueltos por tu API
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('username', usernameInput);
            localStorage.setItem('roles', JSON.stringify(data.roles));

            console.log('✅ Login exitoso:', usernameInput);

            // Validamos los roles para la redirección correspondiente
            if (data.roles && data.roles.includes('admin')) {
                // Si es administrador principal, va al historial
                window.location.href = 'historial.html';
            } else if (data.roles && data.roles.includes('administrador_junta')) {
                // Si tiene el rol administrador_junta, va a la gestión de usuarios registrados
                window.location.href = 'usuarios-registrados.html';
            } else {
                // Si es un usuario normal, va al dashboard estándar
                window.location.href = 'dashboard.html';
            }
        } else {
            const errorData = await response.json();
            errorDiv.innerText = errorData.detail || 'Usuario o contraseña incorrectos';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error de conexión con la API:', error);
        errorDiv.innerText = 'Error al conectar con el servidor';
        errorDiv.style.display = 'block';
    }
});