async function cargarCursos() {
    try {
        const response = await fetch('http://127.0.0.1:5000/cursos'); 
        const data = await response.json();

        if (response.ok && data.Cursos) {
            const cursos = data.Cursos;
            const tablaCuerpo = document.querySelector('#tabla-cursos-saldados tbody');
            tablaCuerpo.innerHTML = ''; 

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

async function verDocumentos(cursoId) {
    try {
        const response = await fetch('http://127.0.0.1:5000/archivo'); 
        const data = await response.json();

        if (response.ok && data.archivos) {
            const archivosCurso = data.archivos.filter(archivo => archivo.curso === cursoId);

            if (archivosCurso.length > 0) {
                const listaArchivos = archivosCurso.map(
                    archivo => `<li><a href="http://127.0.0.1:5000/get_pdf/${archivo.nombre}" target="_blank">${archivo.nombre}</a></li>`
                ).join('');

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


function verPagos(cursoId) {
    const url = `pagoCurso.html?cursoId=${cursoId}`;
    window.location.href = url; 
}



// Cargar los datos cuando la página haya cargado
document.addEventListener('DOMContentLoaded', cargarCursos);
