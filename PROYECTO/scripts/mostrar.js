const urlObtenerUsuarios = 'http://localhost/eduxplora/obtenerUsuarios.php';
const urlActualizarEstado = 'http://localhost/eduxplora/editarUsuario.php';

fetch(urlObtenerUsuarios)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const containerUsuarios = document.querySelector('.container__usuarios');

    // Crear la tabla
    const table = document.createElement('table');

    // Crear la fila de encabezado
    const headerRow = document.createElement('tr');
    ['Empresa', 'Grupo', 'Usuario', 'Carrera', 'Estado'].forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Agregar datos de usuarios a la tabla
    data.forEach(usuario => {
      const row = document.createElement('tr');
      ['nombreEmpresa', 'grupo', 'nombreUsuario', 'carrera', 'estadoActual'].forEach(prop => {
        const cell = document.createElement('td');
        cell.textContent = usuario[prop];
        row.appendChild(cell);

 // Aplicar estilos directamente según el estado
 if (usuario.estadoActual === 'Rechazado') {
  cell.style.color = 'red'; // Cambia el color de texto según tu preferencia
} else if (usuario.estadoActual === 'Aceptado') {
  cell.style.color = 'green'; // Cambia el color de texto según tu preferencia
} else {
  cell.style.color = 'orange'; // Cambia el color de texto según tu preferencia
} 


      });

      // Agregar botones de "Pendiente" y "Rechazado"
const pendienteButton = document.createElement('button');
pendienteButton.textContent = 'Pendiente';
pendienteButton.addEventListener('click', () => actualizarEstado(usuario.idSolicitud, 'Pendiente', row));
pendienteButton.classList.add('btn', 'btn-cta__tercero'); // Agregar la clase aquí

const rechazadoButton = document.createElement('button');
rechazadoButton.textContent = 'Rechazado';
rechazadoButton.addEventListener('click', () => actualizarEstado(usuario.idSolicitud, 'Rechazado', row));
rechazadoButton.classList.add('btn', 'btn-cta__tercero'); // Agregar la clase aquí

const actionsCell = document.createElement('td');
actionsCell.appendChild(pendienteButton);
actionsCell.appendChild(rechazadoButton);
row.appendChild(actionsCell);


      // Verificar el estado y habilitar/deshabilitar botones
      if (usuario.estadoActual === 'Rechazado' || usuario.estadoActual === 'Pendiente' || usuario.estadoActual === 'Aceptado') {
        pendienteButton.disabled = true;
        rechazadoButton.disabled = true;
        pendienteButton.style.backgroundColor = 'gray';
    rechazadoButton.style.backgroundColor = 'gray';
      }

      table.appendChild(row);
    });

    // Agregar la tabla al contenedor
    containerUsuarios.appendChild(table);
  })
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });

async function actualizarEstado(idSolicitud, nuevoEstado, row) {
  try {
    const res = await fetch(urlActualizarEstado, {
      method: 'POST',
      body: JSON.stringify({ idSolicitud, nuevoEstado }),
    });

    if (!res.ok) {
      throw new Error(`Error en la solicitud: ${res.status}`);
    }

    const contentType = res.headers.get('content-type');

    // Verificar si la respuesta tiene contenido JSON
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();

      if (data && data.msg === 'OK') {
        alert('Estado actualizado correctamente');

        // Deshabilitar los botones después de actualizar el estado
        row.querySelector('button').disabled = true;
        row.querySelector('button:last-child').disabled = true;

        // Refrescar la página después de 1 segundo
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        console.error('Respuesta inesperada del servidor:', data);
        alert('Error al actualizar el estado');
      }
    } else {
      // La respuesta no es JSON válido
      console.error('Respuesta no válida del servidor');
      alert('Error al actualizar el estado');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    alert('Error en la solicitud');
  }
}
