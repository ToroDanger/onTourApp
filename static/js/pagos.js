document.addEventListener("DOMContentLoaded", async () => {
  const cursoId = localStorage.getItem('idCurso');
  const url = `http://127.0.0.1:5000/cuotas_alum/${cursoId}`;

    


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


      totalValor.innerText = `$${data.total_valor}`;
      totalPagado.innerText = `$${data.total_pagado}`;
      totalPendiente.innerText = `$${data.total_pendiente}`;
     

      // Actualizar barra de progreso
      const porcentajeAvance = data.porcentaje_avance || 0;
      const barraProgreso = document.getElementById('porcentaje-avance');
      barraProgreso.style.width = `${porcentajeAvance}%`;
      barraProgreso.style.backgroundColor = '#007bff';
      barraProgreso.textContent = `${porcentajeAvance.toFixed(2)}%`;
      

  } catch (error) {
      console.error("Error al cargar los datos:", error);
      alert("Ocurrió un error al cargar la información de pagos.");
  }

});
