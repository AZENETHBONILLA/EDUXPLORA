<?php
class Conexion extends PDO 
{
    public function __construct() {
        try {
            $servername = "127.0.0.1:3306";
            $username = "root";
            $password = "";
            $dbname = "prueba";

            // Llama al constructor de la clase base PDO (padre) para establecer la conexión
            parent::__construct("mysql:host=$servername;dbname=$dbname", $username, $password);
            $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Conexión exitosa";
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }
}

// Crear una nueva instancia de la clase Conexion para establecer la conexión y retornarla.
$pdo = new Conexion();
return $pdo; // Retorna la instancia de la conexión PDO
?>


