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
          resenaLink.href = '#IrVentanaFlotante';  // Puedes proporcionar la URL deseada
          resenaLink.classList.add('btn', 'btn-cta__tercero');
          resenaLink.textContent = 'RESEÑA';
          resenaCell.appendChild(resenaLink);
          row.appendChild(resenaCell);
  
          // Agregar la fila a la tabla
          table.appendChild(row);

          // Agregar evento de clic al enlace de reseña
          resenaLink.addEventListener('click', function () {
            // Obtener el nombre de la empresa de la celda correspondiente en la misma fila
            var nombreEmpresa = row.cells[0].textContent;

            document.querySelector('.contenedorV.izquierdaV .btn-cta__tercero').addEventListener('click', function () {
              var fecha = document.getElementById('fecha').value;
              var actividades = document.getElementById('actVis').value;
              var objetivos = document.getElementById('objetivos').value;
              var calificacion = document.getElementById('calificacion').value;
              var recomendar = document.getElementById('recomendacion').value;
              var razones = document.getElementById('pq').value;
              var observaciones = document.getElementById('obsysuj').value;
      
              // Verificar si algún campo está vacío
              if (!fecha || !actividades || !objetivos || !calificacion || !recomendar || !razones || !observaciones) {
                  alert('Todos los campos son obligatorios');
                  return;
              }
      
              // Construir la URL de la solicitud
              var url = "http://localhost/eduxplora/resena.php?nombreEmpresa="+  nombreEmpresa  +"&Fecha=" + fecha + "&Actividades=" + actividades + "&Objetivos=" + objetivos + "&Escala=" + calificacion + "&Recomendacion=" + recomendar + "&Justificacion=" + razones + "&Observacion=" + observaciones;
      
              // Realizar la solicitud HTTP utilizando fetch
              fetch(url)
                  .then(response => {
                      if (!response.ok) {
                          throw new Error("Error en la solicitud");
                      }
                      return response.json(); // Puedes cambiar esto según el formato de respuesta esperado
                  })
                  .then(data => {
                      // Manejar la respuesta exitosa
                      alert("Resenia REGISTRADA EXITOSAMENTE");
                      // Limpiar los campos después del registro
                      document.getElementById('fecha').value = "";
                      document.getElementById('actividades').value = "";
                      document.getElementById('objetivos').value = "";
                      document.getElementById('calificacion').value = "";
                      document.getElementById('recomendar').value = "";
                      document.getElementById('razones').value = "";
                      document.getElementById('observaciones').value = "";
                  })
                  .catch(error => {
                      // Manejar errores
                      mostrarError("INTENTE DE NUEVO: " + error.message);
                  });
            });
            
        });
        });
  
        // Agregar la tabla al contenedor
        containerUsuarios.appendChild(table);

      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  });
  