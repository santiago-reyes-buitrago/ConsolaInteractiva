const inquirer = require('inquirer');
require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [{
            value: 1,
            name: `${'1'.green}. Crear tarea`
        },{
            value: 2,
            name: `${'2'.green}. Listar tareas`
        },{
            value: 3,
            name: `${'3'.green}. Listar tareas completadas`
        },{
          value: 4,
          name: `${'4'.green}. Listar Tareas pendientes`
        },{
            value: 5,
            name: `${'5'.green}. Completar tarea(s)`
        },{
            value: 6,
            name: `${'6'.green}. Borrar tarea`
        },{
          value: 0,
          name: `${'0'.green}. Salir`
        }]
    }
];


const inquirerMenu = async () => {
    console.clear();
    console.log('=========================='.green);
    console.log(' Seleccione una opcion'.white);
    console.log('==========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;

}

const pause = async () => {
    return await  inquirer.prompt([{
        type: 'input',
        name: 'pausa',
        message: `\n Presione ${ 'ENTER'.green} para continuar`
    }])
}

const leerInput = async (message) => {
    return await inquirer.prompt([{
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if(value.length === 0){
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }])
}

const listadoTareasBorrar = async (tareas = {}) => {
    const choices = tareas.map((tarea,i) => {
        return {
            value: tarea.id,
            name: `${(i+1).toString().green}. ${tarea.desc}`
        }
    })

    choices.unshift({
        value: 0,
        name: `${'0'.green}. Cancelar`
    })

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }]

    const  {id} = await  inquirer.prompt(preguntas);
    return id;
}

const listadoTareascompletar = async (tareas = {}) => {
    const choices = tareas.map((tarea,i) => {
        return {
            value: tarea.id,
            name: `${(i+1).toString().green}. ${tarea.desc}`,
            checked: !!tarea.completed
        }
    })


    const preguntas = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }]

    const  {ids} = await  inquirer.prompt(preguntas);
    return ids;
}

const confirmar = async (msg) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message: msg,
    }]

    const {ok} = await inquirer.prompt(question)
    return ok;
}

module.exports = {
    inquirerMenu,
    pause,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareascompletar
}