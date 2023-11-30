
const urlAgregarUsuario = 'http://localhost/eduxplora/agregarUsuario.php'


let listaEmpleados = []

const objEmpleado = {
    idUsuario: '',
    usuario: '',
    contrasena: '',
    cargo: 'coordinacion' // Cambiando "email" por "cargo" y estableciendo el valor predeterminado como "administrador"
}

let editando = false

const formulario = document.querySelector('#formulario')
const usuarioInput = document.querySelector('#usuario')
const contrasenaInput = document.querySelector('#contrasena')
const cargoInput = document.querySelector('#cargo') // Cambiando la variable de emailInput a cargoInput

formulario.addEventListener('submit', validarFormulario)

function validarFormulario(e) {
    e.preventDefault()
    if([usuarioInput.value, contrasenaInput.value, cargoInput.value].includes('')) {
        alert('Todos los campos son obligatorios')
        return
    }

    if(editando) {
        editarEmpleado()
        editando = false
    } else {
        objEmpleado.idUsuario = Date.now()
        objEmpleado.usuario = usuarioInput.value
        objEmpleado.contrasena = contrasenaInput.value
        // No es necesario asignar el valor de cargoInput.value ya que ya está predefinido como "administrador"
        agregarEmpleado()
    }
}



async function agregarEmpleado() {
    const res = await fetch(urlAgregarUsuario, {
        method: 'POST',
        body: JSON.stringify(objEmpleado)
    })
    .then(respuesta => respuesta.json())
    .then(data => data)
    .catch(error => alert(error))

    if(res.msg === 'OK') {
        alert('Se registró exitosamente')
        
        

        formulario.reset()
        
    }
}