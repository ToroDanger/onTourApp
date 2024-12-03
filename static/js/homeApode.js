document.addEventListener("DOMContentLoaded", async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const alumnoId = queryParams.get('alumno'); // Obtener el ID del alumno desde la URL

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

        if (data && data.alumno) {
            // Procesa los datos del alumno
            console.log(data.alumno);
        } else {
            console.error("No se encontraron datos del alumno.");
        }
    } catch (error) {
        console.error("Error al obtener la información del alumno:", error);
    }
});
