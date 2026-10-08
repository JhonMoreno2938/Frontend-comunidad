// --- VERIFICACIÓN DE SEGURIDAD ---
const accessToken = localStorage.getItem('access_token');
const rolesStr = localStorage.getItem('roles');
let userRoles = [];

try {
    userRoles = rolesStr ? JSON.parse(rolesStr) : [];
} catch (e) {
    userRoles = [];
}

// Si no hay token o no tiene un rol autorizado, lo redirigimos al index
if (!accessToken || (!userRoles.includes('admin') && !userRoles.includes('administrador_junta'))) {
    localStorage.clear();
    window.location.href = 'index.html';
}
// ---------------------------------

document.addEventListener("DOMContentLoaded", function() {
    loadUsers();
});

async function loadUsers() {
    const apiUrl = 'http://192.168.0.107/api/auth/users';
    
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            renderTable(data.users);
        } else {
            document.getElementById('usersTableBody').innerHTML = `<tr><td colspan="3" style="text-align: center; color: red;">Error al cargar los usuarios del servidor.</td></tr>`;
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        document.getElementById('usersTableBody').innerHTML = `<tr><td colspan="3" style="text-align: center; color: red;">No se pudo conectar con la API.</td></tr>`;
    }
}

// Función para pintar la tabla y asignar los botones dinámicos
function renderTable(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    if (users.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">No se encontraron usuarios registrados.</td></tr>`;
        return;
    }

    users.forEach(u => {
        const tr = document.createElement('tr');
        const isActive = u.status === 'Activo';
        const btnClass = isActive ? 'btn-deactivate' : 'btn-activate';
        const btnText = isActive ? 'Desactivar' : 'Activar';

        tr.innerHTML = `
            <td><strong>${u.username}</strong></td>
            <td><span style="color: ${isActive ? 'green' : 'red'}; font-weight: bold;">${u.status}</span></td>
            <td>
                <button class="btn-action ${btnClass}" onclick="toggleUserStatus('${u.username}')">${btnText}</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para alternar el estado (Activar / Desactivar) consumiendo el endpoint PUT
async function toggleUserStatus(username) {
    const apiUrl = 'http://192.168.0.107/api/auth/toggle-status';
    
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        });

        if (response.ok) {
            // Recargamos la lista de usuarios para reflejar el cambio de estado inmediatamente
            loadUsers();
        } else {
            const errData = await response.json();
            alert(errData.detail || 'Error al cambiar el estado del usuario');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert('No se pudo conectar con el servidor.');
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}