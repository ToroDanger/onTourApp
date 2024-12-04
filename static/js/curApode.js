document.addEventListener("DOMContentLoaded", async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const alumnoId = queryParams.get('id'); // Obtener el ID del apoderado desde la URL

    try {
        const response = await fetch(`http://127.0.0.1:5000/alumnos/apoderado?apoderado=${alumnoId}`, {
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
                let alum = alumno.alumno;
                console.log(alum)
                localStorage.setItem('alumno',alum);
                console.log(localStorage.getItem('alumno'));
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
});

