// Archivo: getCurso.js

// Función para obtener los datos de los cursos y mostrarlos en la tabla
async function cargarCursos() {
    try {
        const response = await fetch('http://127.0.0.1:5000/cursos'); // Cambia la URL según sea necesario
        const data = await response.json();

        if (response.ok && data.Cursos) {
            const cursos = data.Cursos;
            const tablaCuerpo = document.querySelector('#tabla-cursos-saldados tbody');
            tablaCuerpo.innerHTML = ''; // Limpiar contenido previo

            cursos.forEach(curso => {
                const fila = document.createElement('tr');

                fila.innerHTML = `
                    <td>${curso.nomCurso}</td>
                    <td>${curso.nomColegio}</td>
                    <td>${curso.cantAlumnos}</td>
                    <td>${curso.nomPaquete}</td>
                    <td>${curso.seguro}</td>
                    <td><button onclick="verDocumentos(${curso.id})">Ver</button></td>
                    <td><button onclick="verPagos(${curso.id})">Ver</button></td>
                `;

                tablaCuerpo.appendChild(fila);
            });
        } else {
            console.error('Error al obtener los datos: ', data.mensajes);
        }
    } catch (error) {
        console.error('Error en la solicitud: ', error);
    }
}

// Función para mostrar los documentos relacionados con un curso
async function verDocumentos(cursoId) {
    try {
        const response = await fetch('http://127.0.0.1:5000/archivo'); // Endpoint para obtener archivos
        const data = await response.json();

        if (response.ok && data.archivos) {
            // Filtrar los archivos relacionados con el curso
            const archivosCurso = data.archivos.filter(archivo => archivo.curso === cursoId);

            if (archivosCurso.length > 0) {
                // Mostrar los archivos en un modal o lista
                const listaArchivos = archivosCurso.map(
                    archivo => `<li><a href="http://127.0.0.1:5000/get_pdf/${archivo.nombre}" target="_blank">${archivo.nombre}</a></li>`
                ).join('');

                // Crear un modal dinámico (puedes usar estilos personalizados o librerías como Bootstrap)
                const modalHTML = `
                    <div id="modal-documentos" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
                        <div style="background: white; padding: 20px; border-radius: 10px; max-width: 500px; width: 90%;">
                            <h3>Documentos del Curso</h3>
                            <ul>${listaArchivos}</ul>
                            <button onclick="cerrarModal()">Cerrar</button>
                        </div>
                    </div>
                `;

                document.body.insertAdjacentHTML('beforeend', modalHTML);
            } else {
                alert('No hay documentos disponibles para este curso.');
            }
        } else {
            console.error('Error al obtener los documentos.');
        }
    } catch (error) {
        console.error('Error en la solicitud de documentos: ', error);
    }
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal-documentos');
    if (modal) {
        modal.remove();
    }
}

// Función para manejar los pagos (placeholder)
function verPagos(cursoId) {
    const url = `pagoCurso.html?cursoId=${cursoId}`;
    window.location.href = url; // Redirige a la página `pagoCurso.html` con el ID en la URL.
}



// Cargar los datos cuando la página haya cargado
document.addEventListener('DOMContentLoaded', cargarCursos);
