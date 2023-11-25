<?php
include 'conRemax.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $direccion = $_POST["direccion"];
    $distrito = $_POST["distrito"];
    $provincia = $_POST["provincia"];
    $partida = $_POST["partida"];
    $dnipro = $_POST["dnipro"];
    $precio = $_POST["precio"];
    $habitaciones = $_POST["habitaciones"];
    $banos = $_POST["banos"];
    $piso = $_POST["piso"];
    $antiguedad = $_POST["antiguedad"];
    $areaTotal = $_POST["areaTotal"];
    $areaDisponible = $_POST["areaDisponible"];
    $areaConstruida = $_POST["areaConstruida"];

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    echo "hola\n";
    $stmt = $conn->prepare("call regPro(?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param("ssssssssssssss", $direccion, $distrito, $provincia, $ciudad,
                    $areaTotal, $areaDisponible, $areaConstruida,
                    $partida, $dnipro, $antiguedad, $precio, $banos, $habitaciones, $piso);
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