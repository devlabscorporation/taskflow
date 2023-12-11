

const First = document.querySelector('.First');
const Second = document.querySelector('.Second');
const Points = document.querySelector('.Points');
const Third = document.querySelector('.Third');
const Quarter = document.querySelector('.Quarter');
const Timer = document.querySelector('.Timer');
const WriteFullDate = document.querySelector('.WriteFullDate');
const WelcomeText = document.querySelector('.WelcomeText');
const ProfilePhoto = document.querySelector('.ProfilePhoto');
const TaskCounter = document.querySelector('.TaskCounter');
const NoTasks = document.querySelector('.NoTasks');
const CurrentTasks = document.querySelector('.CurrentTasks');
const GetTaskDetails = document.querySelector('.GetTaskDetails');
const SaveTask = document.querySelector('.SaveTask');
const Left = document.querySelector('.Left');
const Right = document.querySelector('.Right');




/*if(confirm('¿Eliminar todos los elementos de localStorage?') == true){

    localStorage.clear();

}else{


}*/

window.addEventListener('DOMContentLoaded', e => {

    const TaskCompleted = localStorage.getItem('TaskCompleted');

    GetOldTasksList()

    if(TaskCompleted){

        console.log('Listado de tareas Recuperado.');

    }else{

        localStorage.setItem('TaskCompleted', 0)

    }

    const DelItems = localStorage.getItem('DeletedItems');

    if(DelItems){

        

    }else{

        localStorage.setItem('DeletedItems', 0)

    }


    setTimeout(() => {

        Right.style.display = "flex";
        
    function ReviewDevice() {
    var Devices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    var UserAgente = navigator.userAgent;

    if (Devices.test(UserAgente)) {

        Left.style.display = "none";

    } else {
        
        Left.style.display = "flex";

    }
}


ReviewDevice();


    }, 500);

})

//Relojito

setInterval(() => {

    //Reloj

    const GetCurrentDate = new Date();
    const GetHour = GetCurrentDate.getHours();
    const GetMinutes = GetCurrentDate.getMinutes();
    const GetDay = GetCurrentDate.getDay();
    const GetDate = GetCurrentDate.getDate();
    const GetMonth = GetCurrentDate.getMonth();

    if (GetHour >= 13) {

        Timer.innerHTML = "p.m"

    } else if (GetHour < 12) {

        Timer.innerHTML = "a.m"

    }

    if (GetHour == 0) {

        First.innerHTML = "1";
        Second.innerHTML = "2";

    }


    if (GetHour > 4 && GetHour < 12) {

        WelcomeText.innerHTML = "Buenos días 👋🏻";

    }

    if (GetHour > 11 && GetHour < 18) {

        WelcomeText.innerHTML = "Buenas Tardes ☀️";

    }


    if (GetHour > 17) {

        WelcomeText.innerHTML = "Buenas Noches 🌙";

    }

    if (GetHour < 5) {

        WelcomeText.innerHTML = "Buenas Noches 🌙";

    }

    if (GetHour < 10) {

        First.innerHTML = "0";
        Second.innerHTML = GetHour;

    } else if (GetHour > 9) {

        const HourToString = GetHour.toString();

        First.innerHTML = HourToString.substr(0, 0);
        Second.innerHTML = HourToString.substr(0, 2);

    }


    if (GetHour >= 13) {

        const GetHour = GetCurrentDate.getHours() - 12;

        if (GetHour < 10) {

            First.innerHTML = "0";
            Second.innerHTML = GetHour;

        } else if (GetHour > 9) {

            const HourToString = GetHour.toString();

            First.innerHTML = HourToString.substr(0, 0);
            Second.innerHTML = HourToString.substr(0, 2);

        }

    }

    if (GetMinutes < 10) {

        Third.innerHTML = "0";
        Quarter.innerHTML = GetMinutes;

    } else if (GetMinutes > 9) {

        const MinutesToString = GetMinutes.toString();

        Third.innerHTML = MinutesToString.substr(0, 0);
        Quarter.innerHTML = MinutesToString.substr(0, 2);

    }

    //Fecha 

    //Obtenemos los dias

    const DayNames = ["Domingo", "Lunes", "Martes", "Miercóles", "Jueves", "Viernes", "Sábado"];

    //Obtenemos los Meses
    const MonthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    //Escribimos la fechita 

    WriteFullDate.innerHTML = `${DayNames[GetDay]}, ${GetDate} de ${MonthNames[GetMonth]}`;

}, 0);


//Funcionalidad


class Task {

    constructor(Description, Status) {

        this.Description = Description;
        this.Status = Status;

    }

}



SaveTask.addEventListener('click', e => {

            
    if (GetTaskDetails.value.trim() == '') {

        SaveTask.style.backgroundColor = "#9b9b9b";
        SaveTask.style.color = "#FFFFFF";

    }else{

        CreateItem();


    }

})


GetTaskDetails.addEventListener('keyup', e => {

    if (GetTaskDetails.value.trim() == '') {

        SaveTask.style.backgroundColor = "#9b9b9b";
        SaveTask.style.color = "#FFFFFF";

    } else {

        SaveTask.style.backgroundColor = "#7668AF";
        SaveTask.style.color = "#FFFFFF";

        const GetKeyPressed = e.keyCode;

        if (GetKeyPressed == 13) {

            CreateItem();

        }


    }

})


function CreateItem() {

    const GetOldTasks = localStorage.getItem('ToDoTasks');

    const NewTask = new Task(GetTaskDetails.value, "false");

    const NewItem = document.createElement('div');
    NewItem.className = "Item";
    NewItem.innerHTML = `<div class="Exit"> <input type="checkbox" name="" id="" class='Item${GetTaskNumber()}'> <es>${NewTask.Description}</es> </div> <i class="fi fi-rr-trash DeleteListItem DeleteTask${GetTaskNumber}"></i>`;
    CurrentTasks.appendChild(NewItem);

    GetTaskDetails.value = "";

    function GetTaskNumber(){

        if(localStorage.getItem('NumberTasks')){

            const INT = parseFloat(localStorage.getItem('NumberTasks'));
            const AddNumber = INT + 1;
            localStorage.setItem('NumberTasks', AddNumber);

            return AddNumber;

        }else{

            localStorage.setItem('NumberTasks', "1");
            return 1

        }

    }

    const TaskContain = {

        Details: NewTask.Description,
        State: NewTask.Status

    }

    const CompressTask = JSON.stringify(TaskContain);
    const INT = parseFloat(localStorage.getItem('NumberTasks'));

    localStorage.setItem(`Task${INT}`, CompressTask);

    const GetTasks = localStorage.getItem('NumberTasks');
    const GetAllTasks = parseFloat(GetTasks);

    if(GetAllTasks > 0){

        if(localStorage.getItem('DeletedItems')){

            const Operation = parseFloat(localStorage.getItem('NumberTasks')) - parseFloat(localStorage.getItem('DeletedItems'));

            TaskCounter.style.display = "flex";
NoTasks.style.display = "none";
            TaskCounter.innerHTML = localStorage.getItem('TaskCompleted') + "/" + Operation;

        }else{

            TaskCounter.style.display = "flex";
NoTasks.style.display = "none";
            TaskCounter.innerHTML = localStorage.getItem('TaskCompleted') + "/" + GetAllTasks;

        }

    }else{

        TaskCounter.style.display = "none";
NoTasks.style.display = "flex";

    }

}


function GetOldTasksList(){

    const GetTasks = localStorage.getItem('NumberTasks');
    const GetAllTasks = parseFloat(GetTasks);

    if(localStorage.getItem('DeletedItems')){

        const Operation = parseFloat(localStorage.getItem('NumberTasks')) - parseFloat(localStorage.getItem('DeletedItems'));


        if(Operation > 0){

            if(localStorage.getItem('DeletedItems')){
    
    
                TaskCounter.style.display = "flex";
NoTasks.style.display = "none";
                TaskCounter.innerHTML = localStorage.getItem('TaskCompleted') + "/" + Operation;
    
            }else{
    
                TaskCounter.style.display = "flex";
NoTasks.style.display = "none";
                TaskCounter.innerHTML = localStorage.getItem('TaskCompleted') + "/" + GetAllTasks;
    
            }
    
        }else{
    
            TaskCounter.style.display = "none";
NoTasks.style.display = "flex";
    
        }


    }else{

        if(GetAllTasks > 0){
            
            TaskCounter.style.display = "flex";
            NoTasks.style.display = "none";
            TaskCounter.innerHTML = localStorage.getItem('TaskCompleted') + "/" + GetAllTasks - 1;


        }else{

            TaskCounter.style.display = "none";
        NoTasks.style.display = "flex";
    

        }

    }


    for(let TaskItem = 0; TaskItem < GetAllTasks; TaskItem++){

        const GetTask = localStorage.getItem(`Task${TaskItem + 1}`);
        const DiscompressTask = JSON.parse(GetTask);

        console.log(DiscompressTask);

        if(DiscompressTask.State == "del"){

            const NewItem = document.createElement('div');
            NewItem.className = `Item Item${TaskItem + 1}`;
            NewItem.innerHTML = `<div class="Exit"> <input type="checkbox" name="" id="" class='Item${TaskItem + 1}'> <es>${DiscompressTask.Details}</es> </div> <i class="fi fi-rr-trash DeleteListItem DeleteTask${TaskItem + 1}"></i>`;
            NewItem.style.display = "none";
            CurrentTasks.appendChild(NewItem);

            
    

        }else{

            const NewItem = document.createElement('div');
            NewItem.className = `Item Item${TaskItem + 1}`;
            NewItem.innerHTML = `<div class="Exit"> <input type="checkbox" name="" id="" class='Item${TaskItem + 1}'> <es>${DiscompressTask.Details}</es> </div> <i class="fi fi-rr-trash DeleteListItem DeleteTask${TaskItem + 1}"></i>`;
            CurrentTasks.appendChild(NewItem);
    

        }

      
    }

}

//Eliminar Registros
setTimeout(() => {
    const GetTasks = localStorage.getItem('NumberTasks');
    const GetAllTasks = parseFloat(GetTasks);

    for (let TasksForDelete = 0; TasksForDelete < GetAllTasks; TasksForDelete++) {
        const DeleteButton = document.querySelector(`.DeleteTask${TasksForDelete + 1}`);
        
        DeleteButton.addEventListener('click', (e) => {
        
            document.querySelector(`.Item${TasksForDelete + 1}`).style.display = "none";

            const GetElementToDelete = localStorage.getItem(`Task${TasksForDelete + 1}`);

            const DiscompressTask = JSON.parse(GetElementToDelete);

            DiscompressTask.State = "del";

            const GetDeletedItems = localStorage.getItem('DeletedItems');

            if(GetDeletedItems){

                let INT = parseFloat(GetDeletedItems);

                INT++;

                localStorage.setItem('DeletedItems', INT);

            }else{

                localStorage.setItem('DeletedItems', 1);
                

            }


            if(localStorage.getItem('DeletedItems')){

                const Operation = parseFloat(localStorage.getItem('NumberTasks')) - parseFloat(localStorage.getItem('DeletedItems'));


                if(Operation > 0){
    
                    if(localStorage.getItem('DeletedItems')){
            
            
                        TaskCounter.style.display = "flex";
NoTasks.style.display = "none";
                        TaskCounter.innerHTML = localStorage.getItem('TaskCompleted') + "/" + Operation;
            
                    }else{
            
                        TaskCounter.style.display = "flex";
NoTasks.style.display = "none";
                        TaskCounter.innerHTML = localStorage.getItem('TaskCompleted') + "/" + GetAllTasks;
            
                    }
            
                }else{
            
                    TaskCounter.style.display = "none";
NoTasks.style.display = "flex";
            
                }
    

            }else{

                if(GetAllTasks > 0){

                    
                    TaskCounter.style.display = "flex";
NoTasks.style.display = "none";
                    TaskCounter.innerHTML = localStorage.getItem('TaskCompleted') + "/" + GetAllTasks - 1;
        

                }else{

                    TaskCounter.style.display = "none";
NoTasks.style.display = "flex";
            

                }

            }

            const Recompress = JSON.stringify(DiscompressTask);
            localStorage.setItem(`Task${TasksForDelete + 1}`, Recompress);

        });
    }
}, 2000);
