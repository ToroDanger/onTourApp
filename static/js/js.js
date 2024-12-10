document.addEventListener("DOMContentLoaded", async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('idUser');
    localStorage.removeItem('alumno');
    localStorage.removeItem('idCurso');
});

async function loginUser() {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Asegúrate de que esto esté aquí
            },
            body: JSON.stringify({
                mail: email,  // El correo del usuario
                password: password  // La contraseña del usuario
            }),
        });


        const data = await response.json();  // Asumimos que la respuesta es JSON
    
        console.log(data);

        if (response.ok) {
            // Verificar si el objeto 'user' está presente en la respuesta
            if (data.user && data.user.rol) {
                // Guardar el token en localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user',JSON.stringify(data.user));
                const user = localStorage.getItem('user');
                const userObject = JSON.parse(user);
                const userid = userObject.id;
                localStorage.setItem('idUser',userObject.id)

                // Obtener el rol del usuario
                const userRole = data.user.rol;

                // Redirigir según el rol
                if (userRole === 'apoderado') {
                    const baseURL = '../vistaApode/curApode.html';
                    const URL = `${baseURL}?id=${userid}`;
                    window.location.href = URL;
                  
                   
                } else if (userRole === 'ejecutivo') {
                    const baseURL = '../vistaEjec/homeEjec.html';
                    const URL = `${baseURL}?id=${userid}`;
                    window.location.href = URL;
                } else {
                    alert('Rol no reconocido. Contacte al administrador.');
                }
            } else {
                alert('Error: Rol de usuario no encontrado en la respuesta.');
            }
        } else {
            alert(data.message || 'Error de autenticación. Verifica tus credenciales.');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
    }
}

