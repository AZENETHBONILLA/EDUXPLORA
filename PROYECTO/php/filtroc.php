<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
header('Allow: GET, POST, OPTIONS, PUT, DELETE');

$pdo = include 'conexion.php'; // Obtener la instancia de la conexión PDO

// Verificar si el producto existe en la tabla inventario
$carreras = array();

$sql = "SELECT idCarrera, nombre FROM carrera";
$result = $pdo->query($sql);

if ($result->rowCount() > 0) {
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $carreras[] = array(
            'idCarrera' => $row['idCarrera'],
            'nombre' => $row['nombre']
        );
    }
}

$json_carreras = json_encode($carreras);


// Puedes enviar el JSON como respuesta a la solicitud HTTP
echo $json_carreras;
?>
