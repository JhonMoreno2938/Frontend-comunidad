// ============================================
// DASHBOARD - SERVICIO A
// ============================================

// ============================================
// CONFIGURACIÓN CENTRAL DE SERVICIOS
// ============================================
const SERVICIOS = {
    viajes:    'http://192.168.0.107:3001',
    historial: 'http://192.168.0.107:3002',
    registro:  'http://192.168.0.107:3003',
};

// ============================================
// VERIFICAR SESIÓN DEL USUARIO
// ============================================
// ✅ Usamos las claves que guarda tu login.js: 'username' y 'access_token'
const loggedUser = localStorage.getItem('username');
const userToken = localStorage.getItem('access_token');

if (!loggedUser || !userToken) {
    console.warn('⚠️ No hay sesión activa. Redirigiendo al login...');
    localStorage.clear();
    window.location.href = 'index.html';
} else {
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) {
        userDisplay.innerText = loggedUser;
    }
    console.log('✅ Usuario logueado:', loggedUser);
}

// ============================================
// FUNCIÓN DE REDIRECCIÓN A SERVICIOS
// ============================================
function irAServicio(nombreServicio) {
    // ✅ Leemos las claves correctas
    const usuario = localStorage.getItem('username');
    const token = localStorage.getItem('access_token');

    // Verificamos que haya sesión activa
    if (!usuario || !token) {
        console.error('❌ No hay sesión activa. Redirigiendo al login...');
        localStorage.clear();
        window.location.href = 'index.html';
        return;
    }

    const urlBase = SERVICIOS[nombreServicio];

    if (!urlBase) {
        console.error(`❌ El servicio "${nombreServicio}" no está configurado`);
        alert(`El servicio "${nombreServicio}" no está disponible.`);
        return;
    }

    // 🔑 Construimos la URL con usuario Y token
    const urlFinal = `${urlBase}/?usuario=${encodeURIComponent(usuario)}&token=${encodeURIComponent(token)}`;
    console.log(`🔗 Redirigiendo a ${nombreServicio}: ${urlFinal}`);

    window.location.href = urlFinal;
}

// ============================================
// FUNCIÓN DE LOGOUT
// ============================================
function logout() {
    console.log('👋 Cerrando sesión...');
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'index.html';
}