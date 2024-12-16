document.addEventListener("DOMContentLoaded", async () => {

    if (!localStorage.getItem('alumnooo')) {
        console.error("No se proporcionó el ID del apoderado en la URL.");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/pefilApode?id=${localStorage.getItem('alumnooo')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        console.log(localStorage.getItem('alumno'))

        if (data && data.apoderados && data.apoderados.length > 0) {
            const apoderado = data.apoderados[0]; // Asumimos que hay al menos un apoderado en la respuesta
            const nombreApoderado = document.getElementById("nombre-apoderado");
            const nombreAlumno = document.getElementById("nombre-alumno");
            const nombreCurso = document.getElementById("nombre-curso");
            const correoElemento = document.getElementById("correo-elemento");

            // Actualizar datos en HTML
            nombreApoderado.textContent = `Nombre: ${apoderado.nom}`;
            nombreAlumno.textContent = `Alumno: ${apoderado.nomAlum}`;
            nombreCurso.textContent = `RUT del Alumno: ${apoderado.rutAlum}`;

            // Opcional: Agregar correo al perfil
            correoElemento.textContent = `Correo: ${apoderado.mail}`;
            document.querySelector(".card-body").appendChild(correoElemento);
        } else {
            console.log("No se encontraron datos del apoderado.");
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
    const logoutButton = document.getElementById('logoutButton');
  
});
