const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

let taskList = [];

function addTask(taskList, description){

    taskList.push({done: false, description: description})


};

function printTask(taskList){
    for(let i =0; i < taskList.length; i++){
    if(taskList[i].done){
        console.log((i+1) + '. [x] '+ taskList[i].description);
    }else{
        console.log((i+1) + '. [ ] '+ taskList[i].description);
        }
    }
}

function markTaskAsDone(taskList, index){
    if(index >= 0 && index < taskList.length){
        taskList[index].done = true;
    }
}

function checkAllDone(taskList){

    for(task of taskList){
        if(!taskList.done)return false;
    }
    return true;

}

function mode1(taskList){

    rl.question('Introduce tareas (Escribe fin para terminar): ', (answer) => {

        switch(answer){

            case 'fin': 
            mode2(taskList);
            break;

            case 'exit':
            rl.close();
            break;

            default:
                addTask(taskList, answer);
                console.log('La lista de tareas actual es:' );
                printTask(taskList);
                mode1(taskList);

        }
    })
}

function mode2(taskList){

    printTask(taskList);
    rl.question('Que tareas has hecho? (1-N)', (answer) => {

        switch(answer){
            case 'fin': 
            case 'exit':
            console.log('Hasta luego!');
            rl.close();
            break;
            default:
                markTaskAsDone(taskList, answer - 1);
                if(checkAllDone(taskList)){
                    console.log('Felicidades! Completaste todas las tareas!, nos vemos!');
            rl.close();
                }else{
                mode2(taskList);
                }
        }
    })
}

mode1(taskList);
