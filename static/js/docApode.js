document.addEventListener("DOMContentLoaded", async () => {
    const apoderadoId = localStorage.getItem('idUser');
    
    if (!apoderadoId) {
        console.error("No se proporcionó el id del apoderado.");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/archivos?apoderado=${apoderadoId}`);
        const data = await response.json();

        if (data.archivos) {
            const archivosContainer = document.getElementById('documentos-tbody');
            archivosContainer.innerHTML = "";  // Limpiar cualquier contenido previo

            data.archivos.forEach(archivo => {
                // Crear dinámicamente las filas de la tabla con los archivos
                const row = document.createElement('tr');
                const cell1 = document.createElement('td');
                cell1.textContent = archivo.id;  // Nro de documento
                const cell2 = document.createElement('td');
                const link = document.createElement('a');
                link.href = `http://127.0.0.1:5000/get_pdf/${archivo.nombre}`;
                link.textContent = archivo.nombre;  // Nombre del documento
                cell2.appendChild(link);
                row.appendChild(cell1);
                row.appendChild(cell2);
                archivosContainer.appendChild(row);
            });
        } else {
            console.error("No se encontraron documentos para este apoderado.");
        }

    } catch (error) {
        console.error("Error al obtener los documentos:", error);
    }

    const logoutButton = document.getElementById('logoutButton');
  
    // Escucha el evento de clic del botón
    logoutButton.addEventListener('click', () => {
      // Obtén el token almacenado (por ejemplo, en localStorage)
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('No se encontró un token activo. Por favor, inicia sesión.');
        return;
      }
  
      // Realiza la solicitud al backend para cerrar sesión
      fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.ok) {
            alert('Sesión cerrada correctamente.');
            // Limpia el token del almacenamiento local
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('alumno');
            localStorage.removeItem('idUser');
            // Redirige al usuario al login o página inicial
            window.location.href = '/login.html';
          } else {
            return response.json().then(data => {
              throw new Error(data.message || 'Error al cerrar sesión.');
            });
          }
        })
        .catch(error => {
          console.error('Error al cerrar sesión:', error.message);
          alert('Ocurrió un error al intentar cerrar sesión.');
        });
    });
});
