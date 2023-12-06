const fs = require("fs");
const archivo = './db/data.json';
const guardarDb = (data) => {
    fs.writeFileSync(archivo,data);
}
const leerDb = () => {
    if (!fs.existsSync(archivo)){
        return null;
    }else{
        const info = fs.readFileSync(archivo,{encoding: 'utf-8'});
        return JSON.parse(info);
    }
}

module.exports = {
    guardarDb,
    leerDb
}