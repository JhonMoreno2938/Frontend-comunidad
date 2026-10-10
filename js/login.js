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

    // 👇 NUEVA IP DEL SERVIDOR (192.168.0.103) 👇
    const apiUrl = 'http://192.168.0.103:8000/api/auth/login';

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
            console.log('🎭 Roles del usuario:', data.roles);

            // ============================================
            // REDIRECCIÓN SEGÚN EL ROL
            // ============================================
            if (data.roles && data.roles.includes('gitlab')) {
                // Si tiene el rol "gitlab", va DIRECTAMENTE al SSO de GitLab
                // (sin pasar por la pantalla de login de GitLab)
                console.log('➡️ Redirigiendo al SSO de GitLab...');
                window.location.href = 'http://192.168.0.103:8090/users/auth/openid_connect';
            } else if (data.roles && data.roles.includes('dashboard')) {
                // Si tiene el rol "dashboard", va al Dashboard
                console.log('➡️ Redirigiendo al Dashboard...');
                window.location.href = 'dashboard.html';
            } else {
                // Si no tiene ninguno de los roles anteriores, error
                console.warn('⚠️ Usuario sin rol asignado');
                errorDiv.innerText = 'No tienes acceso a ningún servicio. Contacta al administrador.';
                errorDiv.style.display = 'block';
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