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
?>
