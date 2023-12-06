require('colors');
const {inquirerMenu, pause, leerInput, listadoTareasBorrar, confirmar, listadoTareascompletar} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
const {guardarDb, leerDb} = require("./helpers/guardarArchivo");

const main = async () => {
    console.clear();
    let opt = '';
    const tareas = new Tareas();
    const tareasdb =  leerDb();

    if (tareasdb){ //cargar tareas
        tareas.cargarTareasFromArray(tareasdb);
    }

    do {
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                //crear tarea
                const {desc} = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case 2:
                tareas.listadoCompleto()
                break;
            case 3:
                const a = tareas.listarTareasPendientesCompletadas(true);
                for (let i = 0; i < a.length; i++) {
                    console.log(`${(i+1).toString().green}. ${a[i].desc} ${a[i].completed  ? a[i]?.completed.toString().green: 'Pendiente'.red }`)
                }
                break;
            case 4:
                const b = tareas.listarTareasPendientesCompletadas(false);
                for (let i = 0; i < b.length; i++) {
                    console.log(`${(i+1).toString().green}. ${b[i].desc} ${b[i].completed ? this._listado[key]?.completed.toString().green: 'Pendiente'.red }`)
                }
                break;
            case 5:
                const ids = await listadoTareascompletar(tareas.listadoArreglo);
                tareas.switchCompletadas(ids)
                break;
            case 6:
                const id = await listadoTareasBorrar(tareas.listadoArreglo);
                if (id === 0){
                    console.log('se cancelo la operacion');
                }else {
                    const ok = await confirmar('Estas Seguro?');
                    if (ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break
        }

        guardarDb(JSON.stringify(tareas.listadoArreglo));

        await pause();
    }while (opt !== 0);
}

main()