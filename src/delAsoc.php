<?php
session_start();
require_once "./settings.php";

// json vars
$errors = [];
$data = [];
$data['success'] = false;

//session vars
// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $idAsoc = htmlspecialchars(strtoupper(trim($_POST["idAsoc"])), ENT_QUOTES, 'UTF-8');
    $query = "DELETE FROM asociados WHERE id='$idAsoc'";
    $sql = mysqli_query($con, $query) or die("Problemas al insertar" . mysqli_error($con));
    // Close connection
    // Attempt to execute the prepared statement
    if (!$sql) {
        $errors['error'] .= " -+- Algo salió mal, por favor inténtalo de nuevo. <br> Error: " . $sql . "<br>" . $con->error;
    }
    mysqli_close($con);
}


if (!empty($errors)) {
    $data['success'] = false;
    $data['errors'] = $errors;
} else {
    $data['success'] = true;
    $data['device'] = $device;
}

echo json_encode($data);
