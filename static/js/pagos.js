document.addEventListener("DOMContentLoaded", async () => {
    const id = localStorage.getItem('user') // Obtén el parámetro 'id' de la URL

    if (!id) {
        console.error("No se proporcionó el ID en la URL.");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/pagos?id=${id}`);
        const data = await response.json();

        if (data && data.pagos) {
            const pagosContainer = document.getElementById('pagos-container');
            if (!pagosContainer) {
                console.error('Contenedor de pagos no encontrado');
                return;
            }

            let totalPagar = 0;
            let totalPagado = 0;

            data.pagos.forEach(pago => {
                const montoPago = pago.montoPago;
                totalPagado += montoPago;

                const pagoElement = document.createElement('div');
                pagoElement.classList.add('payment-item');
                pagoElement.innerHTML = `
                    <p>Pago ID: ${pago.id}</p>
                    <p>Monto Pagado: $${pago.montoPago}</p>
                    <p>Fecha de Vencimiento: ${pago.fecVen}</p>
                `;
                pagosContainer.appendChild(pagoElement);
            });

            totalPagar = 500000; // Ejemplo de valor para totalPagar
            const saldoPorPagar = totalPagar - totalPagado;

            // Verificar si los elementos existen
            const totalPagarElement = document.getElementById('total-pagar');
            const totalPagadoElement = document.getElementById('total-pagado');
            const saldoPorPagarElement = document.getElementById('saldo-por-pagar');

            if (totalPagarElement && totalPagadoElement && saldoPorPagarElement) {
                totalPagarElement.textContent = `$${totalPagar.toLocaleString()} CLP`;
                totalPagadoElement.textContent = `$${totalPagado.toLocaleString()} CLP`;
                saldoPorPagarElement.textContent = `$${saldoPorPagar.toLocaleString()} CLP`;

                // Barra de progreso
                const porcentajePagado = (totalPagado / totalPagar) * 100;
                document.querySelector('.progress-bar').style.width = `${porcentajePagado}%`;
                document.querySelector('.progress-bar span').textContent = `${Math.round(porcentajePagado)}% Pagado`;
            } else {
                console.error('Algunos elementos no se encontraron en el DOM.');
            }

        } else {
            console.error("No se encontraron pagos.");
        }
    } catch (error) {
        console.error("Error al obtener los pagos:", error);
    }
});
