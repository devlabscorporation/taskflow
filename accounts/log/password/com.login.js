//Declaraciòn de variables

const GetUserPass = document.querySelector('.GetUserPass');
const ChangeAccount = document.querySelector('.ChangeAccount');
const PasskeyLogin = document.querySelector('.PasskeyLogin');
const SendButton = document.querySelector('.SendButton');

//Obtención del elemento HKEY_CLASSES_ROOT

const HKEY_CLASSES_ROOT = localStorage.getItem('@HKEY_CLASSES_ROOT');

if(!HKEY_CLASSES_ROOT){

    window.location.href = "../login"

}


//Establecer evento para revisar la contraseña
SendButton.addEventListener('click', CheckPassword);

GetUserPass.addEventListener('keydown', e=>{

    const GetKeyPressed = e.keyCode;

    if(GetKeyPressed == 13){

        CheckPassword()

    }
})


//Función para comprobar la contraseña

function CheckPassword(){

    const GetLoginData = JSON.parse(HKEY_CLASSES_ROOT);

    if(GetUserPass.value == GetLoginData.Password){

        localStorage.setItem('@HKEY_LOCAL_MACHINE', GetLoginData.UserKey);
        window.location.href = '../../../';

    }else{

        localStorage.setItem('TaskFlowLoginEvent', 1);
        window.location.href = "../../log";

    }

}


ChangeAccount.addEventListener('click', e=>{

    window.location.href = "../../log"

})



PasskeyLogin.addEventListener('click', e=>{

    window.open('../passkey', "PasskeyLogin", "width=500px, height=700px")

})

