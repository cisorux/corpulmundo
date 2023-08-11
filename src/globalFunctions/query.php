<?php
session_start();
require_once "../settings.php";

// json vars
$errors = [];
$data = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_SESSION['expire'])) {
        //verificando temporalidad de la sessión
        if ((time() >= $_SESSION['expire']) && (time() <= $_SESSION['expire'] + 30)) {
            $_SESSION['expire'] = time() + (30 * 60);
        } elseif (time() > ($_SESSION['expire'] + 30)) {
            session_unset();
            session_destroy();
            $errors['error'] = 'La sesión ha caducado, <a href="./logout.php">Inicia sesión nuevamente</a>.';
        }
    } else {
        $errors['error'] = 'Inicia sesión para usar este servicio. <a href="./logout.php">Inicia sesión nuevamente</a>.';
    }
}
if (!empty($errors)) {
    $data['success'] = false;
    $data['errors'] = $errors;
} else {

    $data['success'] = true;
}

echo json_encode($data);
