<?php
include 'conRemax.php';

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Realizar la consulta
$consulta = "SELECT NPR, DIR, CIU, DIST, PROV, PRC, NPS, NHB, NBA, ART, ARD, ARC
FROM Propiedad P
INNER JOIN Ubicacion U
ON P.CDIR = U.CDIR
INNER JOIN Area_Propiedad AP
ON P.CAR = AP.CAR
ORDER BY P.CDIR desc;";
$resultado = $conn->query($consulta);

// Obtener los resultados en un array
$propiedades = [];
while ($fila = $resultado->fetch_assoc()) {
    $propiedades[] = $fila;
}

// Cerrar la conexión
$conn->close();

// Devolver los resultados en formato JSON
header('Content-Type: application/json');
echo json_encode($propiedades);
?>