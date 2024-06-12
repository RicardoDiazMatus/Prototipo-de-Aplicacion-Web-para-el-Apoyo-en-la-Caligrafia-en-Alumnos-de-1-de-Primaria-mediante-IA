const fs = require("fs");
const path = require("path");
const pool = require("../../config/dbConfig");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const generarDocDeArchivosPersistentes = async (request, response) => {
  const id_archivo = request.body.id_archivo;
  let jsonResultados = {};

  const queryPromise = new Promise((resolve, reject) => {
    pool.query(
      `--sql
        SELECT
          a.ruta_archivo
        FROM 
          archivo a
        WHERE
          a.id_archivo = $1
      `,
      [id_archivo],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });


  try {
    const results = await queryPromise;

    let nombre_archivo = results.rows[0].ruta_archivo;
    nombre_archivo = nombre_archivo.replace(/\\/g, "/");
    nombre_archivo = nombre_archivo.split("/");
    nombre_archivo = nombre_archivo[nombre_archivo.length - 1];
    const ruta = path.join(
      `./routes/ia/uploads/pers/results/${nombre_archivo}.json`
    );
    const data = fs.readFileSync(ruta, 'utf8');
    jsonResultados = JSON.parse(data);
  } catch (error) {
    console.error(error);
    response.status(404).json({ message: "Archivo no encontrado" });
    return;
  }

  const transformedObject = await jsonResultados.resultados.reduce((acc, { etiqueta, calificacion }) => {
    acc[etiqueta.toLowerCase()] = calificacion;
    return acc;
  }, {});

  // Write the docx buffer to a file
  const docxBuffer = await docGenerar(transformedObject);

  response.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  response.setHeader("Content-Disposition", "attachment; filename=output.docx");

  // Send the docx buffer as the response
  response.send(docxBuffer);
  
};


const docGenerar = async(data) => {
  const content = fs.readFileSync(
    path.resolve(__dirname, "res.docx"),
    "binary"
  );

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });


  /**
   * 
   *
   *  Data must be {
   * a: "dasd", 
   * b: "dsad", ...
   * }
   * 
  */
  doc.render(data);

  // Get the docx buffer
  const docxBuffer = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  // Write the docx buffer to a file
  fs.writeFileSync(path.resolve(__dirname, "output.docx"), docxBuffer);

  return docxBuffer;
}
// Load the template

module.exports = {
  generarDocDeArchivosPersistentes,
  docGenerar,
};
