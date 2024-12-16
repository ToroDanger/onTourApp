document.addEventListener("DOMContentLoaded", async () => {
    const cursoId = localStorage.getItem('alumnooo');
    const url = `http://127.0.0.1:5000/cuotas_alum/${cursoId}`;

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

        document.querySelectorAll(".cuota-checkbox").forEach(checkbox => {
            checkbox.addEventListener("change", actualizarSuma);
        });

        document.querySelector(".btn-pay").addEventListener("click", pagarCuota);
    } catch (error) {
        console.error("Error al cargar los datos:", error);
        alert("Ocurrió un error al cargar la información de pagossssßs.");
    }
});


async function pagarCuota() {
    const nroTarjeta = document.getElementById("nro-tarjeta").value;
    const fecVen = document.getElementById("fecha-vencimiento").value;
    const cvv = document.getElementById("cvv-tarjeta").value;

    const selectedRows = Array.from(document.querySelectorAll("#pendientes-body input[type='checkbox']:checked"));
    const cuotas = selectedRows.map(row => row.dataset.id);

    if (!nroTarjeta || !fecVen || !cvv || cuotas.length === 0) {
        alert("Por favor, complete todos los datos y seleccione al menos una cuota.");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/pago', {
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
        location.reload(); 
    } catch (error) {
        console.error("Error al realizar el pago:", error);
        alert("Ocurrió un error al procesar el pago. Intente nuevamente.");
    }
}
