const fs = require('fs');
const path = require('path');
const pool = require("../config/dbConfig");
const { log } = require('console');

const validateValues = async (inputValues, tableName) => {
    let errors = {};
    const nameRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñÜü\s]+$/
    if (
      inputValues.firstName.length === 0 ||
      inputValues.paternalName.length === 0 ||
      inputValues.maternalName.length === 0 ||
      !nameRegex.test(inputValues.firstName) ||
      !nameRegex.test(inputValues.paternalName) ||
      !nameRegex.test(inputValues.maternalName)
    ) {
      errors.name = "Ingrese un nombre válido";
    }
  
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(inputValues.email)) {
      errors.email = "Ingrese un email válido.";
    }

    const isEmailExists = await checkEmailExists(inputValues.email, tableName);
    if (parseInt(isEmailExists) !== 0) {
      console.log("Se encontró un correo registrado");
      errors.emailExistance = `El email ${inputValues.email} ingresado ya está registrado.`;
    }
    
    if (inputValues.schoolName.length < 5) {
      errors.schoolName = "El nombre de la escuela es muy corto o nulo";
    }
    console.log("Errores totales son: " + JSON.stringify(errors));
    return errors;
  };
  
// Define una función para verificar la existencia del correo electrónico
const checkEmailExists = async (email, tableName) => {
  try {
    const query = `SELECT COUNT(*) FROM ${tableName} WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0].count;
  } catch (error) {
    throw error;
  }
};


const generateClassCode=(seed)=>{
  let length=10;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) 
      result += characters.charAt(Math.floor((Math.random()*1000))%characters.length);

  return result;
}

const guardarImagen = (imagen, nombreArchivo, dirGuardado) => {
  const i=imagen;
  try {
    // Verificar si el directorio existe, si no, créalo
    if (!fs.existsSync(dirGuardado) ) {
      fs.mkdirSync(dirGuardado, { recursive: true });
    }
    // let rutaCompletaPers = `${dirGuardado}/${nombreArchivo}`;
    // Construir la ruta completa del archivo
    let rutaCompletaPers = path.join(dirGuardado, nombreArchivo);
    rutaCompletaPers = path.join(__dirname, rutaCompletaPers).replace(/\\/g, '/').replace('/utils', '');
    let rutaCompletaTemp=rutaCompletaPers.replace("pers","temp");
    
    // checa si no existe el archivo
    if (!fs.existsSync(rutaCompletaTemp)){
      //no existe, retornar false
      console.log("Archivos imagenes no existen");
      console.log(`Ruta completa pers: ${rutaCompletaPers}`);
      console.log(`Ruta completa temp: ${rutaCompletaTemp}`);
      return {estado: false};
    }
    
    //mover el archivo de la carpeta temporal a la carpeta persistente
    fs.copyFileSync(rutaCompletaTemp,rutaCompletaPers)

    // mover los resultados
    const rutaCompletaTempJson=rutaCompletaTemp.replace("images","results")+".json";
    const rutaCompletaPersJson=rutaCompletaPers.replace("images","results")+".json";

    fs.copyFileSync(rutaCompletaTempJson,rutaCompletaPersJson)

    return {estado: true, rutaAbsoluta: path.resolve(rutaCompletaPers)};
  } catch (error) {
    console.error('Error al guardar la imagen:', error.message);
    return {estado: false};
  }
}

const obtenerFecha = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
};

async function borrarArchivoTemporal(rutaArchivo, minutos,fs) {
  const tiempoEnMilisegundos = minutos * 60 * 1000; // Convertir minutos a milisegundos

  // Esperar el tiempo especificado antes de continuar
  await new Promise((resolve) => setTimeout(resolve, tiempoEnMilisegundos));

  // Borrar el archivo después de esperar
  try {
    await fs.promises.unlink(rutaArchivo);
  //   console.log(`El archivo en ${rutaArchivo} fue borrado después de ${minutos} minutos.`);
  } catch (error) {
    console.error(`Error al borrar el archivo: ${error}`);
    // Manejar el error según sea necesario
  }
}


module.exports = {
  validateValues,
  checkEmailExists,
  generateClassCode,
  guardarImagen,
  borrarArchivoTemporal,
  obtenerFecha,
}