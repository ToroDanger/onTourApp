
document.addEventListener("DOMContentLoaded", async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const alumnoId = queryParams.get('alumno'); // Cambié 'id' a 'alumno'
    localStorage.setItem('alumno',alumnoId);
    console.log(localStorage.getItem('alumno'));

    if (!alumnoId) {
        console.error("No se proporcionó el ID del alumno en la URL.");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/alumnos?id=${alumnoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        console.log(localStorage.getItem('alumno'))

        if (data && data.alumno) {
            // Procesa los datos del alumno y actualiza el HTML
            console.log(data.alumno);
            

            // Suponiendo que el objeto 'alumno' tiene las propiedades 'apoderado', 'nom', 'nomCurso'
            const alumno = data.alumno;
            console.log(localStorage.getItem('alumno'));
            console.log(alumno.idCurso)
            localStorage.setItem('idCurso',alumno.idCurso)
            console.log(localStorage.getItem('idCurso'))

            document.getElementById('perfil');
            document.getElementById('nombre-apoderado').textContent = `Apoderado: ${alumno.apoderado || 'No disponible'}`;
            document.getElementById('nombre-alumno').textContent = `Nombre Alumno: ${alumno.nom+' '+alumno.appat+' '+alumno.apmat || 'No disponible'}`;
            document.getElementById('nombre-curso').textContent = `Curso: ${alumno.curso || 'No disponible'}`;

            console.log(alumno.id)


        } else {
            console.error("No se encontraron datos del alumno.");
            // Si no se encuentran los datos, mostrar un mensaje predeterminado
            document.getElementById('nombre-apoderado').textContent = 'Apoderado: No disponible';
            document.getElementById('nombre-alumno').textContent = 'Nombre Alumno: No disponible';
            document.getElementById('nombre-curso').textContent = 'Curso: No disponible';
        }
    } catch (error) {
        console.error("Error al obtener la información del alumno:", error);
        // En caso de error, mostrar un mensaje de error en el HTML
        document.getElementById('nombre-apoderado').textContent = 'Error al obtener datos del apoderado';
        document.getElementById('nombre-alumno').textContent = 'Error al obtener datos del alumno';
        document.getElementById('nombre-curso').textContent = 'Error al obtener datos del curso';
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
  