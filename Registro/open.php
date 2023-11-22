<?php

    $conexion = new mysqli("localhost","id20192215_registro_usu","123aA!123","id20192215_registro");
    if($conexion){
        echo "conexion existosa!";
    }else{
        echo "fallo en la conexion";
    }

?>