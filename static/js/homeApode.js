
document.addEventListener("DOMContentLoaded", async () => {
    const queryParams = localStorage.getItem('alumnooo')
    if (!queryParams) {
        console.error("No se proporcionó el ID del alumno en la URL.");

        return;
    }


    try {
        const response = await fetch(`http://127.0.0.1:5000/alumnos?id=${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        console.log(localStorage.getItem('alumno'))

        if (data && data.alumno) {
            

            // Suponiendo que el objeto 'alumno' tiene las propiedades 'apoderado', 'nom', 'nomCurso'
            const alumno = data.alumno;
      
            localStorage.setItem('idCurso',alumno.idCurso)
           

            document.getElementById('perfil');
            document.getElementById('nombre-apoderado').textContent = `Apoderado: ${alumno.apoderado || 'No disponible'}`;
            document.getElementById('nombre-alumno').textContent = `Nombre Alumno: ${alumno.nom+' '+alumno.appat+' '+alumno.apmat || 'No disponible'}`;
            document.getElementById('nombre-curso').textContent = `Curso: ${alumno.curso || 'No disponible'}`;

   


        } else {
            console.error("No se encontraron datos del alumno.");
            // Si no se encuentran los datos, mostrar un mensaje predeterminado
            document.getElementById('nombre-apoderado').textContent = 'Apoderado: No disponible';
            document.getElementById('nombre-alumno').textContent = 'Nombre Alumno: No disponible';
            document.getElementById('nombre-curso').textContent = 'Curso: No disponible';
        }
    } catch (error) {
        console.error("Error al obtener la información del alumno:", error);
        // En caso de error, mostrar un mensaje de error en el HTML
        document.getElementById('nombre-apoderado').textContent = 'Error al obtener datos del apoderado';
        document.getElementById('nombre-alumno').textContent = 'Error al obtener datos del alumno';
        document.getElementById('nombre-curso').textContent = 'Error al obtener datos del curso';
    }

    
});
  