<?php
include 'conRemax.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger datos del formulario
    $dni = $_POST["dni"];
    $nombre = $_POST["nombre"];
    $direccion = $_POST["direccion"];
    $distrito = $_POST["distrito"];
    $provincia = $_POST["provincia"];
    $ciudad = $_POST["ciudad"];
    $telefono = $_POST["telefono"];

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Llamar al procedimiento almacenado (ajusta el nombre del procedimiento según tu configuración)
    $stmt = $conn->prepare("call regCli(?,?,?,?,?,?,?)");
    $stmt->bind_param("sssssss", $direccion, $distrito, $provincia, $ciudad, $dni, $nombre, $telefono);
    // Ejecutar el procedimiento almacenado
    $stmt->execute();

    // Cerrar la conexión y liberar recursos
    $stmt->close();
    $conn->close();

    // Puedes redirigir a una página de éxito o mostrar un mensaje aquí
    echo "Datos procesados exitosamente.";
} else {
    // Manejo de errores si no se reciben datos del formulario
    echo "No se han recibido datos del formulario.";
}
?>