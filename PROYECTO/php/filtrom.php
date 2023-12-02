<?php
header('Access-Control-Allow-Origin: http://127.0.0.1:5501');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
header('Allow: GET, POST, OPTIONS, PUT, DELETE');

if (isset($_REQUEST['idCarrera'])) {
    include 'conexion.php'; // Incluir el archivo y obtener la instancia de la conexión PDO

    $idCarrera = $_REQUEST['idCarrera'];

    // Obtener las materias que tienen el idCarrera proporcionado
    $stmtGetMaterias = $pdo->prepare("SELECT idCarrera, nombre, idMateria FROM materias WHERE idCarrera = :idCarrera");
    $stmtGetMaterias->bindValue(':idCarrera', $idCarrera);
    $stmtGetMaterias->execute();
    $materias = $stmtGetMaterias->fetchAll(PDO::FETCH_ASSOC);

    if (empty($materias)) {
        // No hay materias registradas para el idCarrera proporcionado
        $error_response = array('error' => 'No hay materias registradas para el idCarrera proporcionado');
        echo json_encode($error_response); // Responder con el mensaje de error
    } else {
        // Mostrar la información de las materias
        $success_response = array('materias' => $materias);
        echo json_encode($success_response); // Responder con el mensaje de éxito y la información de las materias
    }
}
?>
