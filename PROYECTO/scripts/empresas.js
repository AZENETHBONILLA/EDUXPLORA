// Obtener los elementos select
var selectCarrera = document.getElementById("Carrera");
var selectMateria = document.getElementById("Materia");
var infoMateriaDiv = document.getElementById("infoMateria"); // Agregado

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
            infoMateriaDiv.innerHTML = ''; // Limpiar la información de la materia al cambiar de carrera

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
                        // Agregar las opciones al segundo select solo si no hay error
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



// Agregar un evento de clic al botón "Buscar"
document.querySelector('.menuFiltros__busqueda .btn-cta').addEventListener('click', function () {
    // Obtener el idMateria seleccionado
    var selectedMateriaId = selectMateria.value;

    // Realizar la solicitud AJAX para obtener la información de la materia desde el servidor PHP
    fetch('http://localhost/eduxplora/buscar.php?idMateria=' + selectedMateriaId)
    .then(response => response.json())
    .then(responseData => {
        // Verificar si la respuesta contiene un error
        if (responseData.error) {
            alert('Error al obtener la información de la materia: ' + responseData.error);
        } else if (responseData.empresas && Array.isArray(responseData.empresas)) {
            // Limpiar el contenido anterior del div
            infoMateriaDiv.innerHTML = '';

    // Crear un único div contenedor__respuesta para todas las empresas
    var contenedorRespuestaDiv = document.createElement('div');
    contenedorRespuestaDiv.classList.add('contenedor__respuesta');

    // Iterar sobre cada empresa y mostrar su información
    responseData.empresas.forEach(function (empresa) {
        // Crear divs adicionales según sea necesario para la estructura deseada
        var busquedasDiv = document.createElement('div');
        busquedasDiv.classList.add('busquedas');

        var contenedorBusquedasDiv = document.createElement('div');
        contenedorBusquedasDiv.classList.add('contenedor__busquedas');

        // Agregar la información de la empresa al div correspondiente
        var empresaInfo = document.createElement('div');
        empresaInfo.classList.add('busquedas__contenido');
        empresaInfo.innerHTML = '<p>Nombre: ' + empresa.Nombre + '</p>' +
            '<p>Dirección: ' + empresa.Direccion + '</p>' +
            '<p>Contacto: ' + empresa.Contacto + '</p>' +
            '<p>Descripción: ' + empresa.Descripcion + '</p>';

        // Crear un div específico para el botón
        var divBoton = document.createElement('div');
        divBoton.classList.add('opcionvf','busquedas__boton', 'derecha');

        // Crear un enlace (<a>) con la clase y texto especificados
        var enlaceSolicitar = document.createElement('a');
        enlaceSolicitar.href = '#IrVentanaFlotante2';  // Especifica la URL a la que debe dirigirse el enlace
        enlaceSolicitar.classList.add('btn', 'btn-cta__cuarto');
        enlaceSolicitar.textContent = 'RECOMENDAR';

        // Agregar el enlace al div específico para el botón
        divBoton.appendChild(enlaceSolicitar);
        // Agregar el div específico para el botón al div de información de la empresa
        empresaInfo.appendChild(divBoton);
        // Construir la estructura completa y agregarla al div principal
        contenedorBusquedasDiv.appendChild(empresaInfo);
        busquedasDiv.appendChild(contenedorBusquedasDiv);
        contenedorRespuestaDiv.appendChild(busquedasDiv);

        
    });

    // Agregar el div contenedor__respuesta al div principal
    infoMateriaDiv.appendChild(contenedorRespuestaDiv);
        
    } else {
        console.error('La respuesta del servidor no tiene el formato esperado:', responseData);
    }
})
.catch(error => console.error('Error al obtener la información de la materia:', error));
});




