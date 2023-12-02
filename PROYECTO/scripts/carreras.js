// Obtener los elementos select
var selectCarrera = document.getElementById("Carrera");
var selectMateria = document.getElementById("Materia");

// Realizar la solicitud AJAX para obtener el JSON de carreras desde el servidor PHP
fetch('http://localhost/eduxplora/filtroc.php')
    .then(response => response.json())
    .then(data => {
        // Recorrer el array y agregar opciones al primer select
        data.forEach(function (carrera) {
            var option = document.createElement("option");
            option.value = carrera.idCarrera;
            option.text = carrera.nombre;
            selectCarrera.add(option);
        });

        // Agregar un evento de cambio al primer select
        selectCarrera.addEventListener("change", function () {
            // Limpiar opciones anteriores del segundo select
            selectMateria.innerHTML = '<option value="0">Elige una opción</option>';

            // Obtener el idCarrera seleccionado
            var selectedCarreraId = this.value;

            // Realizar la solicitud AJAX para obtener el JSON de materias desde el servidor PHP basado en la carrera seleccionada
            fetch('http://localhost/eduxplora/filtrom.php?idCarrera=' + selectedCarreraId)
                .then(response => response.json())
                .then(responseData => {
                    // Verificar si la respuesta contiene un error
                    if (responseData.error && responseData.error === "No hay materias registradas para el idCarrera proporcionado") {
                        alert('No hay materias registradas para la Carrera proporcionada.');
                    } else if (responseData.materias && Array.isArray(responseData.materias)) {
                        // Acceder al array "materias" dentro del objeto y agregar opciones al segundo select
                        responseData.materias.forEach(function (materia) {
                            var option = document.createElement("option");
                            option.value = materia.idMateria;
                            option.text = materia.nombre;
                            selectMateria.add(option);
                        });
                    } else {
                        console.error('La respuesta del servidor no tiene el formato esperado:', responseData);
                    }
                })
                .catch(error => console.error('Error al obtener los datos de materias:', error));

        });
    })
    .catch(error => console.error('Error al obtener los datos de carreras:', error));
