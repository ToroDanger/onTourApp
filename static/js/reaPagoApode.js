document.addEventListener("DOMContentLoaded", async () => {
    const cursoId = localStorage.getItem('idCurso');
    const url = `http://127.0.0.1:5000/cuotas_curso/${cursoId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (data.estado === "sin datos") {
            alert("No se encontraron cuotas para este curso.");
            return;
        }

        const pendientesBody = document.getElementById("pendientes-body");

        // Función para actualizar la suma de montos y mostrar IDs seleccionados
        function actualizarSuma() {
            let sumaMontos = 0;
            let idsSeleccionados = [];
            
            const checkboxesSeleccionados = document.querySelectorAll(".cuota-checkbox:checked");
            checkboxesSeleccionados.forEach(checkbox => {
                const monto = parseFloat(checkbox.dataset.valor);
                sumaMontos += monto;
                idsSeleccionados.push(checkbox.dataset.id);
            });

            console.log("Suma de montos:", sumaMontos);
            console.log("IDs seleccionados:", idsSeleccionados);
        }

        data.detalle_pendientes.forEach(cuota => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${cuota.fecha_cuota}</td>
                <td>$${cuota.valor}</td>
                <td>
                    <input 
                        type="checkbox" 
                        class="cuota-checkbox" 
                        data-id="${cuota.cuota_id}" 
                        data-valor="${cuota.valor}" 
                    />
                </td>
            `;
            pendientesBody.appendChild(row);
        });

        // Añadir eventos a los checkboxes
        document.querySelectorAll(".cuota-checkbox").forEach(checkbox => {
            checkbox.addEventListener("change", actualizarSuma);
        });

        // Escuchar el botón "Pagar"
        document.querySelector(".btn-pay").addEventListener("click", pagarCuota);
    } catch (error) {
        console.error("Error al cargar los datos:", error);
        alert("Ocurrió un error al cargar la información de pagos.");
    }
});


async function pagarCuota() {
    const nroTarjeta = document.getElementById("nro-tarjeta").value;
    const fecVen = document.getElementById("fecha-vencimiento").value;
    const cvv = document.getElementById("cvv-tarjeta").value;

    // Selección de cuotas
    const selectedRows = Array.from(document.querySelectorAll("#pendientes-body input[type='checkbox']:checked"));
    const cuotas = selectedRows.map(row => row.dataset.id);

    // Validación de campos
    if (!nroTarjeta || !fecVen || !cvv || cuotas.length === 0) {
        alert("Por favor, complete todos los datos y seleccione al menos una cuota.");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/pagos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nroTarjeta,
                fecVec: fecVen,
                cvv,
                cuotas
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error desconocido al realizar el pago");
        }

        const data = await response.json();
        alert(data.Mensaje || "Pago realizado con éxito");
        location.reload(); // Recargar la página para mostrar los cambios
    } catch (error) {
        console.error("Error al realizar el pago:", error);
        alert("Ocurrió un error al procesar el pago. Intente nuevamente.");
    }
}
