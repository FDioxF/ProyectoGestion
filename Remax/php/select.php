<?php
include 'conRemax.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dni = $_POST["dni"];

    // Utilizando consultas preparadas para mayor seguridad
    $sql = "SELECT NOM FROM cliente WHERE DNI = ?";
    
    // Preparar la consulta
    $stmt = $conn->prepare($sql);
    
    // Vincular parámetros
    $stmt->bind_param("s", $dni);
    
    // Ejecutar la consulta
    $stmt->execute();
    
    // Obtener resultados
    $stmt->bind_result($nombreResultado);

    // Preparar los resultados para enviar al HTML
    $resultadosHTML = '';

    // Obtener el nombre
    while ($stmt->fetch()) {
        $resultadosHTML .= "<p>Nombre: " . $nombreResultado . "</p>";
    }

    // Cerrar la consulta preparada
    $stmt->close();

    // Enviar los resultados al HTML usando JavaScript
    echo "<script>mostrarResultados('$resultadosHTML');</script>";
}

// Cerrar la conexión
$conn->close();
?>