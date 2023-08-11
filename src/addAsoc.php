<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    require_once "./settings.php";

    $data = [];
    if (isset($_SESSION['expire'])) {
        $apellidos = htmlspecialchars(mb_strtoupper(trim($_POST["apellidos"])), ENT_QUOTES, 'UTF-8');
        $nombres = htmlspecialchars(mb_strtoupper(trim($_POST["nombres"])), ENT_QUOTES, 'UTF-8');
        $identificacion = htmlspecialchars(mb_strtoupper(trim($_POST["identificacion"])), ENT_QUOTES, 'UTF-8');
        $contacto = htmlspecialchars(mb_strtoupper(trim($_POST["contacto"])), ENT_QUOTES, 'UTF-8');
        $fecha = htmlspecialchars(mb_strtoupper(trim($_POST["fecha"])), ENT_QUOTES, 'UTF-8');

        $peticion = "INSERT INTO asociados(apellidos,nombres,identificacion,contacto,fechaAfiliado, estado) VALUES ('$apellidos','$nombres','$identificacion','$contacto','$fecha', 'ACTIVO')";
        // añadir luego: AND idDevIPS = '$idIPS'
        $sql = mysqli_query($con, $peticion);
        if (!$sql) {
            $errors['error'] = "Ocurrió un error al intentar ingresar el nuevo asociado.";
        }
    } else {
        $errors['error'] = "Ocurrió un error al intentar ingresar el nuevo asociado.";
    }



    if (!empty($errors)) {
        $data['success'] = false;
        $data['errors'] = $errors;
    } else {
        $data['success'] = true;
    }

    mysqli_close($con);
    echo json_encode($data);
}
