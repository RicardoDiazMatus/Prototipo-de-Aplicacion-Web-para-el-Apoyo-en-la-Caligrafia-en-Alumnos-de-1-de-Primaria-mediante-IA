const { request, response } = require("express");
const pool = require("../../config/dbConfig");
const utils = require("../../utils/utils");

const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const imgToPDF = require('image-to-pdf')
const fs = require("fs");
const path = require("path");
const execPromise = require('child-process-promise').exec;
const docController = require("../doc/docx");

dotenv.config();

const pdf = () => {};

const ProcesarImagen = async (request, response) => {
  const imageBuffer = request.file.buffer;
  const fileImage = request.file.originalname;
  console.log(`Recibido: ${fileImage}`);
  const uploadDir = path.join(__dirname, "uploads/temp/images");
  // Ensure the directory exists; create it if it doesn't
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  
  // We generate a unique filename so that we don't overwrite 
  // YYYYMMDDHHmmss_5randomcharacters (we are reusing the generateClassCode function because it generates 10 random characters)
  let date = new Date();
  const year = new Intl.DateTimeFormat('es', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('es', { month: '2-digit' }).format(date);
  const day = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(date);
  const hour = new Intl.DateTimeFormat('es', { hour: '2-digit' }).format(date);
  const minute = new Intl.DateTimeFormat('es', { minute: '2-digit' }).format(date);
  const second = new Intl.DateTimeFormat('es', { second: '2-digit' }).format(date);
  date=`${year}${month}${day}${hour}${minute}${second}`;
  const randomString = utils.generateClassCode(Math.floor(Math.random()*100+1)).substring(0,5);
  const filename = `${date}_${randomString}`;
  console.log(`Renombrado a: ${filename}`);
  // Construct the full path to save the image
  const filePath = path.join(uploadDir, filename + path.parse(fileImage).ext);

  // Write the image buffer to the file
  fs.writeFileSync(filePath, imageBuffer);
  // Process the image
  // console.log("Procesando imagen");
  const result=await EvaluarImagen(filePath, filePath.replace("images","results")+".json");

  if (result.estado){
    // console.log("Imagen procesada con exito");
    result.nombreArchivo=filename+path.parse(fileImage).ext;
    calificacionGlobal=0;
    conteoGlobal=0;
    calificacionExitosa=0;
    conteoExitoso=0;
    for (let i=0; i<result.resultados.length; i++){
      calificacionGlobal+=result.resultados[i].calificacion;
      conteoGlobal++;
      if (result.resultados[i].prediccionCorrecta){
        calificacionExitosa+=result.resultados[i].calificacion;
        conteoExitoso++;
      }
      result.resultados[i].calificacion=`${result.resultados[i].calificacion.toFixed(2)} ${result.resultados[i].emoji}`
    }

    result.calificacionGlobal=conteoGlobal>0 ? calificacionGlobal/conteoGlobal:0;
    result.calificacionExitosa=conteoExitoso>0 ? calificacionExitosa/conteoExitoso:0;

    result.calificacionGlobal=result.calificacionGlobal.toFixed(2);
    result.calificacionExitosa=result.calificacionExitosa.toFixed(2);


    result.asiertos=`${conteoExitoso}/${conteoGlobal}}`;
    
    // Delete the file after 10 minutes
    const timpoBorrado=15;
    utils.borrarArchivoTemporal(filePath,timpoBorrado,fs);
    utils.borrarArchivoTemporal(filePath.replace("images","results")+".json",timpoBorrado,fs);


    //Try sending results and doc
    

    const transformedObject = await result.resultados.reduce((acc, { etiqueta, calificacion }) => {
      acc[etiqueta.toLowerCase()] = calificacion;
      return acc;
    }, {});
  
    // Write the docx buffer to a file
    const docxBuffer = await docController.docGenerar(transformedObject);

    response.status(200).json({ ia: result, docxBuffer: docxBuffer.toString('base64')});
  }
  else{
    console.log("Error al procesar la imagen");
    console.log(result.error);
    // Delete the file inmediatly
    utils.borrarArchivoTemporal(filePath, 0,fs);
    utils.borrarArchivoTemporal(filePath.replace("images","results")+".json", 0,fs);
    response.status(422).json(result);
  }
};


const EvaluarImagen=async (imagenURL, resultadoURL)=>{
  return new Promise((resolve, reject) => {
    console.log(`Procesando imagen ${imagenURL}`);
    const location = path.join(__dirname, "lenet5","Evaluar.py");
    const comand=`python3 "${location}" "${imagenURL}" "${resultadoURL}" False`;
    execPromise(comand)
      .then(result => {
        console.log("Procesamiento exitoso");
        resolve(JSON.parse(fs.readFileSync(resultadoURL)));
      })
      .catch(err => {
        console.error(err.stderr);
        reject(err.stderr);
      });
  });
}

const GetTempFiles = async (request, response) => {
  const uploadDirImgs = path.join(__dirname, "uploads/temp/images");
  const uploadDirResults = path.join(__dirname, "uploads/temp/results");
  const images = fs.readdirSync(uploadDirImgs);
  const results = fs.readdirSync(uploadDirResults);
  const files = [];
  images.forEach(image => {files.push({name: image, type: "image"});});
  results.forEach(result => {files.push({name: result, type: "result"});});
  response.status(200).json(files);
};

const GetPersFiles = async (request, response) => {
  const uploadDirImgs = path.join(__dirname, "uploads/pers/images");
  const uploadDirResults = path.join(__dirname, "uploads/pers/results");
  const images = fs.readdirSync(uploadDirImgs);
  const results = fs.readdirSync(uploadDirResults);
  const files = [];
  images.forEach(image => {files.push({name: image, type: "image"});});
  results.forEach(result => {files.push({name: result, type: "result"});});
  response.status(200).json(files);
};

module.exports = {
  ProcesarImagen,
  EvaluarImagen,
  GetTempFiles,
  GetPersFiles
};
