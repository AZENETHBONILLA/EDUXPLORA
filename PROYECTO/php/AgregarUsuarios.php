<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Allow: GET, POST, OPTIONS, PUT, DELETE');

$pdo = include 'conexion.php'; // Incluir el archivo y obtener la instancia de la conexión PDO

// Función para obtener datos JSON
function obtenerDatosJSON()
{
    $json = file_get_contents("php://input");
    return json_decode($json);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $objEmpleado = obtenerDatosJSON();

        $stmt = $pdo->prepare("INSERT INTO login (Usuario, Password, Rol) VALUES (?, ?, ?)");
        $stmt->execute([$objEmpleado->usuario, $objEmpleado->contrasena, $objEmpleado->cargo]);

        $jsonRespuesta = array('msg' => 'OK');
        echo json_encode($jsonRespuesta);
    } catch (PDOException $e) {
        die("Error al agregar usuario: " . $e->getMessage());
    }
}
?>