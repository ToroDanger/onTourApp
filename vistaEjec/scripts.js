// Validación del formulario antes de enviarlo
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nombreCurso = document.getElementById("nombreCurso");
    const cantidadAlumnos = document.getElementById("cantidadAlumnos");
    const mensajeError = document.createElement("p");

    mensajeError.style.color = "red";
    mensajeError.style.fontWeight = "bold";
    mensajeError.style.display = "none";
    form.prepend(mensajeError);

    form.addEventListener("submit", (e) => {
        mensajeError.style.display = "none";
        
        // Verificar que el nombre del curso no esté vacío
        if (!nombreCurso.value.trim()) {
            mensajeError.textContent = "El nombre del curso es obligatorio.";
            mensajeError.style.display = "block";
            e.preventDefault();
            return;
        }

        // Verificar que la cantidad de alumnos sea mayor a 0
        if (cantidadAlumnos.value <= 0) {
            mensajeError.textContent = "La cantidad de alumnos debe ser mayor a 0.";
            mensajeError.style.display = "block";
            e.preventDefault();
            return;
        }

        // Si todo está correcto, enviar el formulario
        alert("Formulario enviado correctamente.");
    });
});
