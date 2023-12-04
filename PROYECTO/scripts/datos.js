document.addEventListener('DOMContentLoaded', function () {
    const urlObtenerUsuarios = 'http://localhost/eduxplora/obtenerUsuarios.php';
  
    fetch(urlObtenerUsuarios)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error de red: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const containerUsuarios = document.querySelector('.contenedor');
  
        // Crear la tabla
        const table = document.createElement('table');
  
        // Crear la fila de encabezado
        const headerRow = document.createElement('tr');
        [ 'Empresa', 'Grupo', 'Usuario', 'Carrera', 'Estado', 'Reseña'].forEach(headerText => {
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
          });
  
          // Agregar enlace "Reseña"
          const resenaCell = document.createElement('td');
          const resenaLink = document.createElement('a');
          resenaLink.href = '#';  // Puedes proporcionar la URL deseada
          resenaLink.classList.add('btn', 'btn-cta__tercero');
          resenaLink.textContent = 'Reseña';
          resenaCell.appendChild(resenaLink);
          row.appendChild(resenaCell);
  
          // Agregar la fila a la tabla
          table.appendChild(row);
        });
  
        // Agregar la tabla al contenedor
        containerUsuarios.appendChild(table);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  });
  