<?php

    $host = "localhost";
    $user = "id20192215_registro_usu";
    $pass = "123aA!123";
    $db = "d20192215_registro";

    $conexion = mysqli_connect($host,$user,$pass,$db);

    if(!$conexion){
        echo "fallo la conexion";
    }
?>