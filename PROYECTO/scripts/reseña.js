function registrarResenia() {
    var fecha = document.getElementById('FechaDeViaje').value;
    var actividades = document.getElementById('actVis').value;
    var objetivos = document.getElementById('objetivos').value;
    var calificacion = document.getElementById('calificacion').value;
    var recomendar = document.getElementById('recomendacion').value;
    var razones = document.getElementById('pq').value;
    var observaciones = document.getElementById('obsysuj').value;

    // Verificar si algún campo está vacío
    if (!fecha || !actividades || !objetivos || !calificacion || !recomendar || !razones || !observaciones) {
        alert('Todos los campos son obligatorios');
        return;
    }

    // Construir la URL de la solicitud
    var url = "http://localhost/eduxplora/resenia.php?fecha=" + fecha + "&actividades=" + actividades + "&objetivos=" + objetivos + "&calificacion=" + calificacion + "&recomendar=" + recomendar + "&razones=" + razones + "&observaciones=" + observaciones;

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
            alert("Resenia REGISTRADA EXITOSAMENTE");
            // Limpiar los campos después del registro
            document.getElementById('fecha').value = "";
            document.getElementById('actividades').value = "";
            document.getElementById('objetivos').value = "";
            document.getElementById('calificacion').value = "";
            document.getElementById('recomendar').value = "";
            document.getElementById('razones').value = "";
            document.getElementById('observaciones').value = "";
        })
        .catch(error => {
            // Manejar errores
            mostrarError("INTENTE DE NUEVO: " + error.message);
        });
}

