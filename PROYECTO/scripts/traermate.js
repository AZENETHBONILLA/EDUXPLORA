const urlObtenerMaterias = 'http://localhost/eduxplora/obtenermateria.php';
const urlAgregarMateria = 'http://localhost/eduxplora/agregarmateria.php';
const urlEditarMateria = 'http://localhost/eduxplora/actualizarmateria.php';
const urlBorrarMateria = 'http://localhost/eduxplora/borrarmateria.php';

let listaMaterias = [];

const objMateria = {
    idMateria: '',
    Nombre: '',
    objetivo: '',
    idCarrera: ''
};

let editando = false;

const formulario = document.querySelector('#formulario');

const nombreInput = document.querySelector('#nombre');
const objetivoInput = document.querySelector('#objetivo');
const carreraInput = document.querySelector('#idCarrera');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if([nombreInput.value, objetivoInput.value, carreraInput.value].includes('')) {
        alert('Todos los campos son obligatorios');
        return;
    }

    if(editando) {
        editarMateria();
        editando = false;
    } else {
        objMateria.idMateria = Date.now();
        objMateria.Nombre = nombreInput.value;
        objMateria.objetivo = objetivoInput.value;
        objMateria.idCarrera = carreraInput.value;

        agregarMateria();
    }
}

async function obtenerMaterias() {
    listaMaterias = await fetch(urlObtenerMaterias)
        .then(respuesta => respuesta.json())
        .then(datos => datos)
        .catch(error => console.log(error));

    mostrarMaterias();
}

obtenerMaterias();

function mostrarMaterias() {
    const divMaterias = document.querySelector('.div-materiasin');
    const tabla = document.createElement('table');
    const encabezado = tabla.createTHead();
    const filaEncabezado = encabezado.insertRow();

    // Crear encabezados de la tabla
    const encabezados = ['Nombre', 'Objetivo', 'ID Carrera', 'Acciones'];

    encabezados.forEach(encabezado => {
        const th = document.createElement('th');
        th.textContent = encabezado;
        filaEncabezado.appendChild(th);
    });

    // Crear filas con datos
    listaMaterias.forEach(materia => {
        const { Nombre, objetivo, idCarrera } = materia;

        const fila = tabla.insertRow();
        const celdas = [Nombre, objetivo, idCarrera];

        celdas.forEach((celda, index) => {
            const td = fila.insertCell();
            if (index === 1) { // Si es la columna "Objetivo"
                if (celda.length > 50) {
                    // Trunca el texto y agrega un botón para ver más detalles
                    const textoTruncado = celda.substring(0, 50) + '...';
                    const verMas = document.createElement('span');
                    verMas.textContent = ' Ver más';
                    verMas.classList.add('ver-mas');
                    verMas.onclick = () => alert(`Objetivo completo: ${celda}`);
                    td.innerHTML = `${textoTruncado}`;
                    td.appendChild(verMas);
                } else {
                    td.innerHTML = `${celda}`;
                }
            } else {
                td.innerHTML = `${celda}`;
            }
        });

        // Acciones (Editar y Eliminar)
        const celdaAcciones = fila.insertCell();
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.classList.add('btn-editar');
        btnEditar.onclick = () => cargarMateria(materia);
        celdaAcciones.appendChild(btnEditar);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.onclick = () => eliminarMateria(materia.idMateria);
        celdaAcciones.appendChild(btnEliminar);
    });

    divMaterias.appendChild(tabla);
}


async function agregarMateria() {
    const res = await fetch(urlAgregarMateria, {
            method: 'POST',
            body: JSON.stringify(objMateria)
        })
        .then(respuesta => respuesta.json())
        .then(data => data)
        .catch(error => alert(error));

    
        alert('Se registró exitosamente');
        limpiarHTML();
    obtenerMaterias();
    formulario.reset();
    limpiarObjeto();

    // Recargar la página después de la actualización
    location.reload();

       
    
}



async function editarMateria() {
    // Utilizar el idMateria original
    objMateria.idMateriaOriginal = objMateria.idMateria;

    objMateria.Nombre = nombreInput.value;
    objMateria.objetivo = objetivoInput.value;
    objMateria.idCarrera = carreraInput.value;

    const res = await fetch(urlEditarMateria, {
            method: 'POST',
            body: JSON.stringify(objMateria)
        })
        .then(respuesta => respuesta.json())
        .then(data => data)
        .catch(error => alert(error));

    // Realizar operaciones de limpieza y recarga independientemente del resultado de la solicitud
    limpiarHTML();
    obtenerMaterias();
    formulario.reset();
    limpiarObjeto();

    // Recargar la página después de la actualización
    location.reload();
    
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false;

    // Eliminar la propiedad idMateriaOriginal después de la actualización
    delete objMateria.idMateriaOriginal;
}

async function eliminarMateria(id) {
    const res = await fetch(urlBorrarMateria, {
            method: 'POST',
            body: JSON.stringify({'idMateria': id})
        })
        .then(respuesta => respuesta.json())
        .then(data => data)
        .catch(error => alert(error));

        if(res.msg === 'OK') {
            alert('Se eliminó exitosamente');
            limpiarHTML();
            obtenerMaterias();
            limpiarObjeto();
        }

    // Recargar la página después de la actualización
    location.reload();
    
}

function cargarMateria(materia) {
    const { idMateria, Nombre, objetivo, idCarrera } = materia;

    nombreInput.value = Nombre;
    objetivoInput.value = objetivo;
    carreraInput.value = idCarrera;

    objMateria.idMateria = idMateria;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

function limpiarHTML() {
    const divMaterias = document.querySelector('.div-materiasin');
    while(divMaterias.firstChild) {
        divMaterias.removeChild(divMaterias.firstChild);
    }
}

function limpiarObjeto() {
    objMateria.idMateria = '';
    objMateria.Nombre = '';
    objMateria.objetivo = '';
    objMateria.idCarrera = '';
}
