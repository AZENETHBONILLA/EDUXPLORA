function registrarSolicitud() {
    var nombreEmpresa = document.getElementById('nombreEmpresa').value;
    var grupo = document.getElementById('grupo').value;
    var carrera = document.getElementById('carrera').value;

    // Verificar si algún campo está vacío
    if (!nombreEmpresa || !grupo || !carrera) {
        alert('Todos los campos son obligatorios');
        return;
    }

    // Construir la URL de la solicitud
    var url = "http://localhost/eduxplora/solicitud.php?nombreEmpresa=" + nombreEmpresa + "&grupo=" + grupo + "&carrera=" + carrera;

    // Realizar la solicitud HTTP utilizando fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            return response.json(); // Puedes cambiar esto según el formato de respuesta esperado
        })
        .then(data => {
            // Manejar la respuesta exitosa
            alert("SOLICITUD REGISTRADA EXITOSAMENTE");
            // Limpiar los campos después del registro
            document.getElementById('nombreEmpresa').value = "";
            document.getElementById('grupo').value = "";
            document.getElementById('carrera').value = "";
        })
        .catch(error => {
            // Manejar errores
            mostrarError("INTENTE DE NUEVO: " + error.message);
        });
}

