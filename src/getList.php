<?php

    session_start();
    require_once "./settings.php";

    // json vars
    $errors = [];
    $data = array();

    $query = "SELECT * FROM asociados";
    $sql = mysqli_query($con, $query) or die("Problemas al insertar" . mysqli_error($con));
    while ($row = mysqli_fetch_assoc($sql)) {
        $data[] = $row;
    }





    mysqli_close($con);




echo json_encode($data);
