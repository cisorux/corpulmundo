<?php
date_default_timezone_set('America/Bogota');
/*Datos de conexion a la base de datos*/
$db_host = "localhost";
$db_user = "root";
$db_pass = "CwFg5rp6";
$db_name = "corpulmundo";

$master = "Corpulmundo";
$pwMaster ="4998";

$con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if(mysqli_connect_errno()){
	echo 'No se pudo conectar a la base de datos : '.mysqli_connect_error();
}

$timenow = date('Y-m-d H:i:s');




// versión de bmcrud

$version = "1.0";

?>