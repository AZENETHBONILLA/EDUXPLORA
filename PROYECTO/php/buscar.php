<?php
header('Access-Control-Allow-Origin: http://127.0.0.1:5501');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
header('Allow: GET, POST, OPTIONS, PUT, DELETE');

if (isset($_REQUEST['idMateria'])) {
    include 'conexion.php'; // Incluir el archivo y obtener la instancia de la conexión PDO

    $idMateria = $_REQUEST['idMateria'];

    // Obtener las empresas que tienen el idMateria proporcionado
    $stmtGetMaterias = $pdo->prepare("SELECT idMateria, Nombre, Direccion, Contacto, Descripcion FROM empresas WHERE idMateria = :idMateria");
    $stmtGetMaterias->bindValue(':idMateria', $idMateria);
    $stmtGetMaterias->execute();
    $empresas = $stmtGetMaterias->fetchAll(PDO::FETCH_ASSOC);

    if (empty($empresas)) {
        // No hay materias registradas para el idCarrera proporcionado
        $error_response = array('error' => 'No hay empresas registradas para el idMateria proporcionado');
        echo json_encode($error_response); // Responder con el mensaje de error
    } else {
        // Mostrar la información de las materias
        $success_response = array('empresas' => $empresas);
        echo json_encode($success_response); // Responder con el mensaje de éxito y la información de las materias
    }
}
?>
