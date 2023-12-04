<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Allow: GET, POST, OPTIONS, PUT, DELETE');


if (isset($_REQUEST['nombreEmpresa']) && isset($_REQUEST['Fecha']) && isset($_REQUEST['Actividades']) && isset($_REQUEST['Objetivos']) && isset($_REQUEST['Escala']) && isset($_REQUEST['Recomendacion']) && isset($_REQUEST['Justificacion']) && isset($_REQUEST['Observacion'])) {
    $pdo = include 'conexion.php'; // Incluir el archivo y obtener la instancia de la conexión PDO
    
	$nombre = $_REQUEST['nombreEmpresa'];
    $fecha = $_REQUEST['Fecha'];
	$actividades = $_REQUEST['Actividades'];
	$objetivos = $_REQUEST['Objetivos'];
    $escala = $_REQUEST['Escala'];
	$recomendar = $_REQUEST['Recomendacion'];
    $justificacion = $_REQUEST['Justificacion'];
	$observacion = $_REQUEST['Observacion'];

	// Consulta preparada con PDO
    $Query ="INSERT INTO reseñas (NombreEmpresa, Fecha, Actividades, Objetivos, Escala, Recomendacion, Justificacion , Observacion)
    VALUES (:nombreEmpresa,:fecha,:actividades,:objetivos,:escala,:recomendar,:justificacion,:observacion)";
    $statement = $pdo->prepare($Query);

    $statement->bindParam(':nombreEmpresa', $nombre);
    $statement->bindParam(':fecha', $fecha);
	$statement->bindParam(':actividades', $actividades);
    $statement->bindParam(':objetivos', $objetivos);
	$statement->bindParam(':escala', $escala);
    $statement->bindParam(':recomendar', $recomendar);
	$statement->bindParam(':justificacion', $justificacion);
    $statement->bindParam(':observacion', $observacion);
	
	$arreglo = array();
    if ($statement->execute()) {
        while ($recibido = $statement->fetch(PDO::FETCH_ASSOC)) {
            array_push($arreglo, $recibido);
        }
    }

    // Convertir resultado a JSON y enviarlo
    print json_encode($arreglo, JSON_FORCE_OBJECT);

    // Cerrar la conexión PDO
    $pdo = null;
	
}

?>