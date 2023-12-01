document.addEventListener("DOMContentLoaded", function () {
    var url = "http://localhost/eduxplora/filtroc.php";

    // aRealiza una solicitud AJAX para obtener el JSON desde el servidor
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Parsea el JSON
            var carreras = JSON.parse(xhr.responseText);

            // Obtén el elemento select
            var selectCarrera = document.getElementById("Carrera");

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
