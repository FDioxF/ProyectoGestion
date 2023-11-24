<?php
$servername = "localhost";
$username = "FDioxF";
$password = "Shaolin4788";
$database = "remax";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener el DNI del formulario
$dni = $_GET['dni'];

// Consultar la base de datos
$sql = "SELECT NOM FROM cliente WHERE DNI = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $dni);
$stmt->execute();
$result = $stmt->get_result();

// Obtener los resultados como un array asociativo
$resultados = $result->fetch_all(MYSQLI_ASSOC);

// Devolver los resultados en formato JSON
echo json_encode($resultados);

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
