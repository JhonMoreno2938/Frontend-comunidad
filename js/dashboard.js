const loggedUser = localStorage.getItem('username');

if (!loggedUser) {
    // Si alguien intenta entrar aquí sin loguearse, lo devolvemos al login
    window.location.href = 'index.html';
} else {
    document.getElementById('userDisplay').innerText = loggedUser;
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}
