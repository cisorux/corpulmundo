<?php
require_once "./settings.php";



$errors = [];
$data = [];

// Define variables and iidEmpresaialize with empty values
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$username = trim($_POST['username']);
	$password = trim($_POST['password']);
	$remember = trim($_POST['remember']);

	// Processing form data when form is submitted
	if ($password == $pwMaster && $username == $master) {
		session_start() or die('Error iniciando gestor de variables de sesión');
		// Start session 30min or 7 days
		if ($remember == "false") {
			$_SESSION['start'] = time(); // Taking now logged in time.
			// Ending a session in 30 minutes from the starting time.
			$_SESSION['expire'] = $_SESSION['start'] + (30 * 60); // session for 30 min
		} elseif ($remember == "true") {
			$_SESSION['start'] = time(); // Taking now logged in time.
			// Ending a session in 7 days from the starting time.
			$_SESSION['expire'] = $_SESSION['start'] + (7 * 24 * 60 * 60); // session for 7 days
		}

		// Redirect user to welcome page
		//header("location: ".$_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']."index.php");
	} else {
		// Display an error message if password is not valid
		$errors['password'] = "La contraseña que has ingresado no es válida.";
	}

	if (!empty($errors)) {
		$data['success'] = false;
		$data['errors'] = $errors;
		session_destroy();
	} else {
		$data['success'] = true;
		
	}

	echo json_encode($data);
}
