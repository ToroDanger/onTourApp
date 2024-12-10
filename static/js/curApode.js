document.addEventListener("DOMContentLoaded", async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const apoderadoId = queryParams.get('id'); // Obtener el ID del apoderado desde la URL
    console.log('holaa'+apoderadoId)

    try {
        const response = await fetch(`http://127.0.0.1:5000/alumnos/apoderado?apoderado=${apoderadoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();

        if (data && data.alumnos) {
            const tbody = document.querySelector("table tbody");
            tbody.innerHTML = ""; // Limpiar cualquier contenido previo
            
            
            data.alumnos.forEach((alumno) => {
                console.log(alumno);
                const row = `
                        <tr>
                            <td>${alumno.nomCurso}</td>
                            <td>${alumno.nomColegio}</td>
                            <td>${alumno.ciudad}</td>
                            <td>${alumno.rut}</td>
                            <td><a href="/vistaApode/homeApode.html?alumno=${alumno.alumno}">ver</a></td>
                        </tr>
                        `;

                tbody.innerHTML += row; // Agregar la fila al cuerpo de la tabla

            });
        } else {
            console.log("No se encontraron alumnos.");
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
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

