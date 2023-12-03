function crearRegistro(event) {
    //event.preventDefault();

    let carrera = document.getElementById("Carrera").value;
    let materia = document.getElementById("Materia").value;
    let objetivo = document.getElementById("Objetivo").value;
    
    let objetivoCurado = objetivo.replace(/ /g, "_"); // Agrega guiones bajos a los espacios de la cadena de objetivos
    
    // Verifica si los datos no esta vacios
    if (!carrera || !materia || !objetivo) {
        alert('TODOS LOS CAMPOS SE DEBEN LLENAR PARA CREAR UNA MATERIA');
        return;
    }
    
    if (carrera === 'ingenieria' || carrera === 'Ingenieria'){
        // Se necesita esta variable para poder enviar los datos a la base de datos
        let carreraConvertida = "1";
        // Esta variable combierte todo el string a un formato adecuado para la base de datos
        let materiaCurada = materia.replace(/ /g, "_").toUpperCase()
        let url = "http://localhost/eduxplora/crearMateria.php?Carrera="+carreraConvertida+"&Materia="+materiaCurada+"&Objetivo="+objetivoCurado;
        
        // Envia la solicitud a la url
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            return response.text(); // regresa la respuesta en formato texto NO json
        })
        .then(data => {
            // Manejar la respuesta exitosa
            alert("MATERIA CREADA EXITOSAMENTE");
            // Limpiar los campos después del registro
            document.getElementById('Carrera').value = "";
            document.getElementById('Materia').value = "";
            document.getElementById('Objetivo').value = "";
        })
        .catch(error => {
            // Manejar errores
            console.error("Error en la solicitud:", error);
        });
        
    }

}

function eliminarRegistro(event){
    //event.preventDefault();

    // Extrae los datos
    let materia = document.getElementById("Materia").value;
    // Verifica si el campo esta vacio y si lo esta, manda este mensaje.
    if (!materia) {
        alert('PARA ELIMINAR SOLO SE NECESITA QUE LLENE EL CAMPO MATERIA QUE DESEA ELIMINAR');
        return;
    }
    // Modifica el texto para que sea adecuado a la base de datos
    let materiaCurada = materia.replace(/ /g, "_").toUpperCase()
    // Url para eliminar
    let url = "http://localhost/eduxplora/eliminarMateria.php?Nombre="+materiaCurada;
        
    // Envia la solicitud a la url
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        return response.text(); // regresa la respuesta en formato texto NO json
    })
    .then(data => {
        // Maneja la respuesta exitosa
        alert("MATERIA ELIMINADA EXITOSAMENTE");
        // Limpia el campos después del registro
        document.getElementById('Materia').value = "";
    })
    .catch(error => {
        // Manejar errores
        console.error("Error en la solicitud:", error);
    });
}

function actualizarObj(event){
    // Extrae los datos materia
    let materia = document.getElementById("Materia").value;
    let objetivo = document.getElementById("Objetivo").value;

    if (!materia || !objetivo) {
        alert('Para actualizar el objetivo, complete el campo de la materia que desea modificar y también ingrese el nuevo valor en el campo del objetivo.');
        return;
    }
    
    let objetivoCurado = objetivo.replace(/ /g, "_"); // Agrega guiones bajos a los espacios de la cadena de objetivos
    let materiaCurada = materia.replace(/ /g, "_").toUpperCase(); // Agrega guiones bajos Y lo hace mayusculas.

    let url = "http://localhost/eduxplora/actualizarObjMateria.php?Nombre="+materiaCurada+"&Objetivo="+objetivoCurado;

    // Envia la solicitud a la url
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        return response.text(); // regresa la respuesta en formato texto NO json
    })
    .then(data => {
        // Maneja la respuesta exitosa
        alert("OBJETIVO DE MATERIA ACTUALIZADA EXITOSAMENTE");
        // Limpia el campos después del registro
        document.getElementById('Materia').value = "";
        document.getElementById('Objetivo').value = "";
    })
    .catch(error => {
        // Manejar errores
        console.error("Error en la solicitud:", error);
    });

}