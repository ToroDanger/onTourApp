document.addEventListener("DOMContentLoaded", async () => {
    console.log(localStorage.getItem('idCurso'));
    const cursoId = localStorage.getItem('idCurso');
    const url = `http://127.0.0.1:5000/cuotas_curso/${cursoId}`;



    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        
        const data = await response.json();

        // Verifica si hay cuotas disponibles
        if (data.estado === "sin datos") {
            alert("No se encontraron cuotas para este curso.");
            return;
        }

        // Mostrar información general
        const totalValor = document.getElementById("total-valor");
        const totalPagado = document.getElementById("total-pagado");
        const totalPendiente = document.getElementById("total-pendiente");
        const porcentajeAvance = document.getElementById("porcentaje-avance");

        totalValor.innerText = `$${data.total_valor}`;
        totalPagado.innerText = `$${data.total_pagado}`;
        totalPendiente.innerText = `$${data.total_pendiente}`;
        porcentajeAvance.innerText = `${data.porcentaje_avance}%`;
        

    } catch (error) {
        console.error("Error al cargar los datos:", error);
        alert("Ocurrió un error al cargar la información de pagos.");
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

// Función auxiliar para obtener el curso ID desde la URL
function getCursoIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("curso_id");
}
