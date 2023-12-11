<?php

    if(isset($_POST["UserName"])){

        //Obtengo el valor del POST

        $UserName = $_POST["UserName"];

        //Datos de Conexión

        $ServerName = "localhost";
        $ServerUserName = "root";
        $Password = "";
        $DatabaseName = "taskflow";

        //Se hace la conexión

        $Connection = new mysqli($ServerName, $ServerUserName, $Password, $DatabaseName);

        $DoQuery = "SELECT UserKey, Name, Password FROM accounts WHERE UserName = '$UserName'";
        $QueryResults = $Connection -> query($DoQuery);

        if($QueryResults){

            //Obtengo el valor asociado

            if($QueryResults -> num_rows > 0){

                $Row = $QueryResults -> fetch_assoc();

                $GetPass = $Row["Password"];
                $GetUserName = $Row["UserKey"];
    
                echo "<script> const LoginData = {UserKey: '$GetUserName', Password: '$GetPass'}; const CompressObject = JSON.stringify(LoginData); localStorage.setItem('@HKEY_CLASSES_ROOT', CompressObject); window.location.href = '../password' </script>";

            }else{

                echo "<script> localStorage.setItem('TaskFlowLoginEvent', 0);  window.location.href = '../' </script>";


            }


        }else{

            echo "<script> localStorage.setItem('TaskFlowLoginEvent', 4);  window.location.href = '../' </script>";


        }

    }else{

        //Error Falta de credenciales

        echo "<script> localStorage.setItem('TaskFlowLoginEvent', 2);  window.location.href = '../' </script>";

    }

?>