function enviarFormulario(event) {
    event.preventDefault();

    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;

    var url = "http://localhost/eduxplora/login.php?Usuario=" + encodeURIComponent(usuario) + "&Password=" + encodeURIComponent(password);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error && data.error === "El usuario no existe") {
                alert("ERROR: El usuario no existe");
            } else {
                mostrarVentanaSegunRol(data);
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}

function mostrarVentanaSegunRol(usuario) {
    var rolUsuario = usuario['0']['Rol'];

    switch (rolUsuario) {
        case "administrador":
            alert("Bienvenido ADMINISTRADOR");
            window.location.href = "../html/Admin/admin.html";             
            break;
        case "docente":
            alert("Bienvenido DOCENTE");
            window.location.href ="../html/Docente/docente.html";
            break;
        case "coordinacion":
            alert("Bienvenido COORDINADADOR");
            window.location.href ="../html/Coordinador/coordinador.html";
            break;
        case "vinculacion":
            alert("Bienvenido VINCULACIÓN");
            window.location.href ="../html/Vinculacion/vinculacion.html";
        break;
        default:
            alert("Rol desconocido");
            break;
    }
}