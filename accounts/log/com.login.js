//Declaración de variables

const SendButton = document.querySelector('.SendButton');
const GoogleSignUp = document.querySelector('.GoogleSignUp');
const AppleSignUp = document.querySelector('.AppleSignUp');
const PasskeyLogin = document.querySelector('.PasskeyLogin');
const GetUserName = document.querySelector('.GetUserName');
const GetUser = document.querySelector('.GetUser');


//Comprobación de seguridad

window.addEventListener('load', CheckSecurityOrigin);

function CheckSecurityOrigin(){

    const AppProtocol = window.location.protocol;

    if(AppProtocol == "https:"){

        console.log("Se inició el sistema de obtención de credenciales");

        LoginInit();

    }else if(AppProtocol == "http:"){

        if(window.location.hostname == "localhost" || window.location.hostname == "10.80.10.100"){

            console.warn("Acceso concedido a desarrolladores.");
            LoginInit();

        }else{

            console.error("Se denegó el acceso porque el origen no es seguro")

        }

    }else if(AppProtocol == "file:"){

        console.warn("Se inició sesión como archivo local en " +  window.location.href);
        LoginInit();

    }

}

function LoginInit(){

    GetUserName.addEventListener('keydown', e=>{

        const GetKeyPressed = e.keyCode;

        if(GetKeyPressed == 13){

            CheckUserNameInfo();

        }

    })

    SendButton.addEventListener('click', CheckUserNameInfo);

}


function CheckUserNameInfo(){

    if(GetUserName.value.trim() === ""){

        GetUserName.classList.add("GetUserNameError");
        GetUserName.setAttribute("placeholder", "Debes ingresar tu nombre de usuario");

        setTimeout(() => {
            
            GetUserName.classList.remove("GetUserNameError");
            GetUserName.setAttribute("placeholder", "Ingresa tu @");

        }, 3000);

    }else{

        document.querySelector('.SetUserName').value = GetUserName.value;
        document.querySelector('.SendForm').submit()

    }

}


//Errors Manage 

const Errors = ["No se encontró el nombre de usuario", //Código de evento 0
                "La contraseña es incorrecta", //Código de evento 1
                "Debes proporcionar tus datos antes de acceder", //Código de evento 2
                "login_required", //Código de evento 3
                "Ocurrió un error desconocido, inténtalo de nuevo."//Código de evento 4 
                ];

const GetErrors = localStorage.getItem('TaskFlowLoginEvent');

if(GetErrors){

    document.querySelector('.Error').innerHTML = DeterminateError();
    document.querySelector('.Error').style.display = "flex";

}

function DeterminateError(){

    const TaskFlowLoginEvent = localStorage.getItem('TaskFlowLoginEvent');
    const ToINT = parseFloat(TaskFlowLoginEvent);

    setTimeout(() => {
        
        localStorage.removeItem('TaskFlowLoginEvent')

    }, 500);

    return Errors[ToINT];


}



GoogleSignUp.addEventListener('click', e=>{

    window.open('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Faccounts.google.com%2Fgsi%2Fselect%3Fclient_id%3D705648808057-3chuddbr6oahbebib1uh693k02sgfl30.apps.googleusercontent.com%26ux_mode%3Dpopup%26ui_mode%3Dcard%26as%3DsPdzNqnAPP2heE2YOtJW6A%26channel_id%3Df2399dc552e1a218d9c96cac14814ec136601a0145e0515c373f0fe924fdd7c0%26origin%3Dhttps%3A%2F%2Fid.freepikcompany.com&faa=1&ifkv=ASKXGp0NR2qmuTKyjevs6-qP9nHaoCxApKT_3jJY7P1-oDkGSlc2My7Wt6DVOHWma5weJQGs-5lg-w&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-2046758358%3A1702002683514553&theme=glif', "GoogleLogin", "width=500px, height=700px")

})

AppleSignUp.addEventListener('click', e=>{

    window.open('https://appleid.apple.com/sign-in', "AppleLogin", "width=500px, height=700px")

})

PasskeyLogin.addEventListener('click', e=>{

    window.open('passkey', "PasskeyLogin", "width=500px, height=700px")

})



