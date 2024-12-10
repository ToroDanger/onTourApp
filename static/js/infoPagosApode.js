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

        // Mostrar cuotas pagadas
        const pagadasBody = document.getElementById("pagadas-body");
        data.detalle_pagadas.forEach(cuota => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${cuota.fecha_cuota}</td>
                <td>$${cuota.valor}</td>
            `;
            pagadasBody.appendChild(row);
        });

        // Mostrar cuotas pendientes
        const pendientesBody = document.getElementById("pendientes-body");
        data.detalle_pendientes.forEach(cuota => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${cuota.fecha_cuota}</td>
                <td>$${cuota.valor}</td>
            `;
            pendientesBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error al cargar los datos:", error);
        alert("Ocurrió un error al cargar la información de pagos.");
    }
});

// Función auxiliar para obtener el curso ID desde la URL
function getCursoIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("curso_id");
}
