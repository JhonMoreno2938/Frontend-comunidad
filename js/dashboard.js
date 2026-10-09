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

    // ============================================
    // CONSTRUIR DINÁMICAMENTE TODOS LOS ENLACES
    // ============================================
    // Mapeamos cada ID del HTML con su servicio correspondiente.
    // Si agregas una nueva tarjeta, solo añades una línea aquí.
    const enlacesConfig = {
        'linkViajes':    SERVICIOS.viajes,
        'linkHistorial': SERVICIOS.historial,
        'linkRegistro':  SERVICIOS.registro,
    };

    // Recorremos todos los enlaces y les asignamos la URL con el usuario
    Object.keys(enlacesConfig).forEach(id => {
        const elemento = document.getElementById(id);
        const urlBase = enlacesConfig[id];

        if (elemento && urlBase) {
            // Construimos la URL final con el parámetro ?usuario=
            const urlFinal = `${urlBase}/?usuario=${encodeURIComponent(loggedUser)}`;
            elemento.href = urlFinal;
            console.log(`🔗 ${id} → ${urlFinal}`);
        } else if (elemento && !urlBase) {
            console.warn(`⚠️ El servicio para #${id} no está configurado en SERVICIOS`);
        } else {
            console.warn(`⚠️ No se encontró el elemento #${id} en el HTML`);
        }
    });
}

// ============================================
// FUNCIÓN DE LOGOUT
// ============================================
function logout() {
    console.log('👋 Cerrando sesión...');
    localStorage.clear();
    window.location.href = 'index.html';
}