// ============================================
// DASHBOARD - SERVICIO A
// ============================================

// ============================================
// CONFIGURACIÓN CENTRAL DE SERVICIOS
// ============================================
// Aquí defines las URLs de TODOS tus microservicios.
// Si mañana cambia un puerto o IP, solo editas aquí.
const SERVICIOS = {
    viajes:    'http://192.168.0.107:3001',
    historial: 'http://192.168.0.107:3002', // Ejemplo futuro
    registro:  'http://192.168.0.107:3003', // Ejemplo futuro
};

// ============================================
// VERIFICAR SESIÓN DEL USUARIO
// ============================================
const loggedUser = localStorage.getItem('username');

if (!loggedUser) {
    // Si no hay usuario logueado, lo devolvemos al login
    console.warn('⚠️ No hay usuario logueado. Redirigiendo al login...');
    window.location.href = 'index.html';
} else {
    // Mostrar el usuario en la barra superior
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) {
        userDisplay.innerText = loggedUser;
    }
    console.log('✅ Usuario logueado:', loggedUser);
}

// ============================================
// FUNCIÓN DE REDIRECCIÓN A SERVICIOS
// ============================================
// Esta función se llama desde el onclick de cada tarjeta del HTML.
// Recibe el nombre del servicio (ej: 'viajes') y redirige a su URL
// pasando el usuario como parámetro.
function irAServicio(nombreServicio) {
    // 1. Verificamos que el usuario esté logueado
    const usuario = localStorage.getItem('username');
    
    if (!usuario) {
        console.error('❌ No hay usuario logueado. Redirigiendo al login...');
        window.location.href = 'index.html';
        return;
    }

    // 2. Buscamos la URL base del servicio en la configuración
    const urlBase = SERVICIOS[nombreServicio];
    
    if (!urlBase) {
        console.error(`❌ El servicio "${nombreServicio}" no está configurado`);
        alert(`El servicio "${nombreServicio}" no está disponible.`);
        return;
    }

    // 3. Construimos la URL final con el parámetro usuario
    const urlFinal = `${urlBase}/?usuario=${encodeURIComponent(usuario)}`;
    
    console.log(`🔗 Redirigiendo a ${nombreServicio}: ${urlFinal}`);
    
    // 4. Redirigimos al servicio
    window.location.href = urlFinal;
}

// ============================================
// FUNCIÓN DE LOGOUT
// ============================================
function logout() {
    console.log('👋 Cerrando sesión...');
    localStorage.clear();
    window.location.href = 'index.html';
}