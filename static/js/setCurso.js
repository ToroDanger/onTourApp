
    async function subirCurso() {

        const nombreCurso = document.getElementById("nombreCurso").value;
        const nombreColegio = document.getElementById("nombreColegio").value;
        const paqueteTuristicoNumerico = document.getElementById("paqueteTuristico").value;
        const seguroNumerico = document.getElementById("seguro").value;
        const fechaViaje = document.getElementById("fechaViaje").value;
        const paqueteTuristico = convertirPaqueteTuristico(paqueteTuristicoNumerico);
        const seguro = convertirSeguro(seguroNumerico);
        const excelFile = document.getElementById("excelFile").files[0];
        const contratoFile = document.getElementById("contratoFile").files[0];
        console.log(fechaViaje)

        if (!nombreCurso || !nombreColegio || !paqueteTuristico || !seguro || !excelFile || !contratoFile) {
            alert("Por favor completa todos los campos y sube los archivos necesarios.");
            return;
        }

        const formData = new FormData();
        formData.append("Planilla", excelFile);
        formData.append("contrato", contratoFile);
        formData.append("nomCurso", nombreCurso);
        formData.append("nomColegio", nombreColegio);
        formData.append("paqueteTuristico", paqueteTuristico);
        formData.append("seguro", seguro);
        formData.append("fechaViaje", fechaViaje);

        try {
            const response = await fetch("http://127.0.0.1:5000/cursos", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al procesar la solicitud");
            }

            const data = await response.text();
            alert(`Curso creado con éxito: ${data}`);
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert(`Error: ${error.message}`);
        }
    }


        function convertirPaqueteTuristico(paquete) {
            switch (paquete) {
                case "paquete1":
                    return 1; 
                case "paquete2":
                    return 2;
                case "paquete3":
                    return 3;
                default:
                    return 0;
            }
        }

        function convertirSeguro(seguro) {
            switch (seguro) {
                case "seguro1":
                    return 1; 
                case "seguro2":
                    return 2;
                case "seguro3":
                    return 3; 
                default:
                    return 0;
            }
        }


    // Asignar el evento click al botón
    document.getElementById("guardarCursoBtn").addEventListener("click", function (event) {
        event.preventDefault();
        subirCurso();
    });
