<?php
session_start();
require_once "../settings.php";

// json vars
$errors = [];
$data = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_SESSION['expire'])) {
        $data['message'] = "Bienvenido de vuelta, te estamos reedireccionando.";
    } 
}

if (!empty($errors)) {
    $data['success'] = false;
    $data['errors'] = $errors;
} else {
    $data['success'] = true;
}
mysqli_close($con);


echo json_encode($data);
