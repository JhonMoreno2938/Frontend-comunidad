// ============================================
// DASHBOARD - SERVICIO A
// ============================================

// 1. Verificar que el usuario esté logueado
const loggedUser = localStorage.getItem('username');

if (!loggedUser) {
    // Si alguien intenta entrar aquí sin loguearse, lo devolvemos al login
    console.warn('⚠️ No hay usuario logueado. Redirigiendo al login...');
    window.location.href = 'index.html';
} else {
    // 2. Mostrar el usuario en la barra superior
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) {
        userDisplay.innerText = loggedUser;
    }
    console.log('✅ Usuario logueado:', loggedUser);

    // 3. Construir dinámicamente el enlace al Servicio B
    // Esperamos a que el DOM esté listo por si acaso
    document.addEventListener('DOMContentLoaded', () => {
        const linkViajes = document.getElementById('linkViajes');
        
        if (linkViajes) {
            // Construimos la URL pasando el usuario como parámetro
            const urlServicioB = `http://192.168.0.107:3001/?usuario=${encodeURIComponent(loggedUser)}`;
            linkViajes.href = urlServicioB;
            console.log('🔗 Enlace a Servicio B configurado:', urlServicioB);
        } else {
            console.error('❌ No se encontró el elemento #linkViajes');
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