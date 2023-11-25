<?php
include 'conRemax.php';

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta para obtener datos de la base de datos (reemplaza con tu consulta)
$sql = "SELECT id, nombre, descripcion FROM tu_tabla";
$result = $conn->query($sql);

// Crear un array para almacenar los resultados
$data = array();

// Obtener los datos
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Cerrar la conexión
$conn->close();

// Devolver los datos como JSON
header('Content-Type: application/json');
echo json_encode($data);
?>