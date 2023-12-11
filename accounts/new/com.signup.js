//Declarando Variables

const UserKey = document.querySelector('.UserKey');
const SendPassword = document.querySelector('.SendPassword');
const SendUserName = document.querySelector('.SendUserName');
const FormControl = document.querySelector('.FormControl');
const SendSignupForm = document.querySelector('.SendSignupForm');


//Validar Antes de enviar

SendSignupForm.addEventListener('click', CheckFormData)

//Validar formulario mediante la tecla Enter
SendUserName.addEventListener('keydown', e=>{

    const KeyPressed = e.keyCode;

    if(KeyPressed == 13){

        SendPassword.focus();

    }

});

SendPassword.addEventListener('keydown', e=>{

    const KeyPressed = e.keyCode;

    if(KeyPressed == 13){

        CheckFormData()

    }

});


//Función de verificación 

function CheckFormData(){

    if(SendUserName.value.trim() === '' || SendPassword.value.trim() === ''){

        alert('Debes llenar todos los datos para continuar');

    }if(SendPassword.value.length < 4){

        alert('La contraseña debe contener como mínimo 4 caracteres')

    }else{

        //Generación de clave de usuario unica

            const GetDate = new Date();
            const GetYear = GetDate.getFullYear();
            const GetMonth = GetDate.getMonth();
            const GetDay = GetDate.getDate();

            const MonthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

            //Se genera el complemento para evitar la repetición de la clave

            console.log(CreateKeyComplement());

            function CreateKeyComplement(){

                var Exit = '';

                for(let aument = 0; aument < 4; aument++){

                    const Random = Math.floor(Math.random() * 10)   

                    Exit += Random;

                }

                return Exit;

            }



            function GetEncryptedKey(){

                if(GetDay < 10){

                    const CreateEncryptedKey = `${GetYear}${MonthNames[GetMonth]}0${GetDay}${CreateKeyComplement()}`;
                    return CreateEncryptedKey;
                
                }else{
                
                    const CreateEncryptedKey = `${GetYear}${GetMonth[MonthNames]}${GetDay}${CreateKeyComplement()}`;
                    return CreateEncryptedKey;
                
                }
                

            }

            UserKey.value = GetEncryptedKey();
        
            FormControl.submit()

    }

}



//Manejador de Errores

const Errors = ["Ya existe un usuario con el nombre de usuario que seleccionaste", //Código de evento 0
                "El nombre de usuario contiene caracteres inválidos", //Código de evento 1
                "No estableciste una contraseña válida", //Código de evento 2
                "login_required", //Código de evento 3
                "Ocurrió un error desconocido, inténtalo de nuevo."//Código de evento 4 
];

const GetErrors = localStorage.getItem('TaskFlowSignUpEvent');

if(GetErrors){

    document.querySelector('.Error').innerHTML = DeterminateError();
    document.querySelector('.Error').style.display = "flex";

}

function DeterminateError(){

    const TaskFlowSignUpEvent = localStorage.getItem('TaskFlowSignUpEvent');
    const ToINT = parseFloat(TaskFlowSignUpEvent);

    setTimeout(() => {
        
        localStorage.removeItem('TaskFlowSignUpEvent')

    }, 500);

    return Errors[ToINT];


}