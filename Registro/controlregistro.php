<?php
    /*------123aA!123----*/
    /*-----name: registro ----*/
    /*-----username: registro_usu ----*/
    /*conexión a la base de datos-----------*/
    $conn = new mysqli('localhost','id20192215_registro_usu','123aA!123','id20192215_registro');

    if(isset($_POST['registro'])){
        if(!empty(trim($_POST['password_usu'])) && !empty(trim($_POST['usuario_usu'])) ){

            $password_usu = $_POST['password_usu'];
            $usuario_usu = $_POST['usuario_usu'];

            $enc_password_usu = password_hash($password_usu, PASSWORD_DEFAULT);

            $conn->query("INSERT INTO registro (usuario_usu, password_usu) VALUES ('$usuario_usu','$password_usu')");
            
            header('');

        if($conn->affected_rows !=1){
            $registro_error = "hubo un error";
        }

        }else{
            $registro_error = "ambos campos deben ser llenados";
        }
    }

?>