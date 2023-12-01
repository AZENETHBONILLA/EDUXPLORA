document.addEventListener("DOMContentLoaded", function () {
    var urlCarreras = "http://localhost/eduxplora/filtroc.php";
    var urlMaterias = "http://localhost/eduxplora/filtrom.php"; // Cambia la URL según tu estructura

    var selectCarrera = document.getElementById("Carrera");
    var selectMateria = document.getElementById("Materia");

    // Función para cargar opciones en el segundo select según la carrera seleccionada
    function cargarMaterias(carreraId) {
        // Realiza una solicitud AJAX para obtener las materias según la carrera
        var xhr = new XMLHttpRequest();
        xhr.open("GET", urlMaterias + "?carrera=" + carreraId, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Parsea el JSON
                var materias = JSON.parse(xhr.responseText);

                // Limpia el segundo select antes de agregar nuevas opciones
                selectMateria.innerHTML = '<option value="0">Elige una opción</option>';

                // Itera sobre las materias y agrega opciones al segundo select
                for (var i = 0; i < materias.length; i++) {
                    var option = document.createElement("option");
                    option.value = "m" + (i + 1);  // Puedes ajustar la lógica para asignar valores a las opciones
                    option.text = materias[i];
                    selectMateria.add(option);
                }
            }
        };
        xhr.send();
    }

    // Maneja el evento de cambio en el primer select
    selectCarrera.addEventListener("change", function () {
        var selectedCarreraId = selectCarrera.value;
        if (selectedCarreraId !== "0") {
            // Si se selecciona una carrera, carga las materias correspondientes
            cargarMaterias(selectedCarreraId);
        } else {
            // Si se elige la opción por defecto, limpia el segundo select
            selectMateria.innerHTML = '<option value="0">Elige una opción</option>';
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        var url = "http://localhost/eduxplora/filtrom.php";
    
        // aRealiza una solicitud AJAX para obtener el JSON desde el servidor
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Parsea el JSON
                var carreras = JSON.parse(xhr.responseText);
    
                // Obtén el elemento select
                var selectCarrera = document.getElementById("Materia");
    
                // Itera sobre las carreras y agrega opciones al select
                for (var i = 0; i < carreras.length; i++) {
                    var option = document.createElement("option");
                    option.value = "c" + (i + 1);  // Puedes ajustar la lógica para asignar valores a las opciones
                    option.text = carreras[i];
                    selectCarrera.add(option);
                }
            }
        };
        xhr.send();
    });
    

    
});