require('colors');
const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArreglo() {
        const listado = [];
        Object.keys(this._listado).forEach(key=>{
            listado.push(this._listado[key]);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id) {
        if (this._listado[id]){
            delete this._listado[id];
        }
    }
    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }
    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        Object.keys(this._listado).forEach((key,index)=>{
            console.log(`${(index+1).toString().green}. ${this._listado[key].desc.rainbow} ${this._listado[key]?.completed ? this._listado[key]?.completed.toString().green: 'Pendiente'.red} ` )
        })
    }

    listarTareasPendientesCompletadas(completadas = true){
        let list = [];
        Object.keys(this._listado).forEach((key)=>{
            if (completadas){
                if (this._listado[key]?.completed) {
                    list.push(this._listado[key]);
                }
            }else {
                if (!this._listado[key]?.completed) {
                    list.push(this._listado[key]);
                }
            }
        })

        return list;
    }

    switchCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completed) {
                tarea.completed = new Date().toISOString();
            }
        })

        this.listadoArreglo.forEach(tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completed = null;
            }
        })
    }

}

module.exports = Tareas;