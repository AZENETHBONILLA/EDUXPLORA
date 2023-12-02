<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Allow: GET, POST, OPTIONS, PUT, DELETE');

//REGISTRO DE CONTACTO

if (isset($_REQUEST['Nombre']) && isset($_REQUEST['Email']) && isset($_REQUEST['Mensaje'])) {
    $pdo = include 'conexion.php'; // Incluir el archivo y obtener la instancia de la conexión PDO
    
    $Nombre = $_REQUEST['Nombre'];
	$Email = $_REQUEST['Email'];
	$Mensaje = $_REQUEST['Mensaje'];


	// Consulta preparada con PDO
    $Query ="INSERT INTO contacto (Nombre, Email,Mensaje) VALUES (:nombre,:email,:mensaje)";
    $statement = $pdo->prepare($Query);
    $statement->bindParam(':nombre', $Nombre);
	$statement->bindParam(':email', $Email);
    $statement->bindParam(':mensaje', $Mensaje);
	
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