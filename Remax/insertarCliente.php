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

// Obtener los datos del formulario
$dni = $_POST['dni'];
$nombre = $_POST['nombre'];
$direccion = $_POST['direccion'];

// Insertar los datos en la tabla Cliente
$sql = "INSERT INTO Cliente (DNI, NOM, CDIR) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $dni, $nombre, $direccion);
$result = $stmt->execute();

// Verificar el resultado de la inserción
if ($result) {
    echo "Cliente registrado exitosamente";
} else {
    echo "Error al registrar el cliente: " . $stmt->error;
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>