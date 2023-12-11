<?php

    //Se valida si el formulario fue enviado

    if(isset($_POST["UserName"])){

         //Obtener los datos luego del POST

    $UserName = $_POST["UserName"];
    $Password = $_POST["Password"];
    $GetKey = $_POST["SendUserKey"];

    //Datos de conexión

    $ServerName = "localhost";
    $ServerUserName = "root";
    $ServerPassword = "";
    $DataBaseName = "TaskFlow";

    //Realizar la conexión

    $Connection = new mysqli($ServerName, $ServerUserName, $ServerPassword, $DataBaseName);
    $DoQuery = "SELECT UserName FROM accounts WHERE UserName = '$UserName'";
    $QuerResults = $Connection -> query($DoQuery);

    if($QuerResults -> num_rows > 0){

        //Existe una cuenta con el nombre de usuario seleccionado

        //Se envia al handler de errores y se redirige a la página principal

        echo "<script> localStorage.setItem('TaskFlowSignUpEvent', 0);  window.location.href = '../' </script>";


    }else{

        //Se guarda el nuevo registro

        $DoSave = "INSERT INTO `accounts`(`UserKey`, `UserName`, `Name`, `ProfilePhoto`, `Password`) VALUES ('$GetKey','$UserName','undefined','none','$Password')";

        //Se guarda en la base de datos

        if($Connection -> query($DoSave)){

            echo "<script> window.location.href = '../../log' </script>";

        }else{

            echo "<script> localStorage.setItem('TaskFlowSignUpEvent', 4);  window.location.href = '../' </script>";


        }

    }


    }else{

        echo "<script> localStorage.setItem('TaskFlowSignUpEvent', 4);  window.location.href = '../' </script>";

    }

   
?>