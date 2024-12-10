function getCursoIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('cursoId'); // Devuelve el valor de "cursoId" si existe
}

async function cargarPagosCurso(cursoId) {
    
    try {
        // Consumir la API Flask
        const response = await fetch(`http://127.0.0.1:5000/cuotas_curso/${cursoId}`);
        if (!response.ok) throw new Error('Error al obtener los datos del curso.');

        const data = await response.json();

        // Actualizar barra de progreso
        const porcentajeAvance = data.porcentaje_avance || 0;
        const barraProgreso = document.getElementById('barra-progreso');
        barraProgreso.style.width = `${porcentajeAvance}%`;
        barraProgreso.style.backgroundColor = '#007bff';
        barraProgreso.textContent = `${porcentajeAvance.toFixed(2)}%`;

        // Actualizar tabla de pagos realizados
        const tablaPagos = document.querySelector('#tabla-pagos tbody');
        tablaPagos.innerHTML = ''; // Limpiar tabla existente
        data.detalle_pagadas.forEach(pago => {
            const fila = `
                <tr>
                    <td>${pago.alumno_rut}</td>
                    <td>${pago.fecha_cuota}</td>
                    <td>$${pago.valor.toLocaleString()}</td>
                </tr>
            `;
            tablaPagos.innerHTML += fila;
        });

        // Actualizar tabla de resumen de pagos
        document.getElementById('total-pagado').textContent = `$${data.total_pagado.toLocaleString()}`;
        document.getElementById('total-pendiente').textContent = `$${data.total_pendiente.toLocaleString()}`;
        document.getElementById('total-valor').textContent = `$${data.total_valor.toLocaleString()}`;

        const resumenDescripcion = `
            <tr>
                <td>Valor Pagado:</td>
                <td>$${data.total_pagado.toLocaleString()}</td>
            </tr>
            <tr>
                <td>Valor Pendiente:</td>
                <td>$${data.total_pendiente.toLocaleString()}</td>
            </tr>
             <tr>
                <td>Valor Total:</td>
                <td>$${data.total_valor.toLocaleString()}</td>
            </tr>
        `;
        const resumenTabla = document.querySelector('#tabla-resumen tbody');
        resumenTabla.innerHTML = resumenDescripcion;

    } catch (error) {
        console.error('Error al cargar los pagos del curso:', error);
    }
}

// Función para volver a la página anterior
function volver() {
    window.history.back();
}

// Cargar datos al inicio
window.onload = function () {
    const cursoId = getCursoIdFromURL();
    cargarPagosCurso(cursoId);
};