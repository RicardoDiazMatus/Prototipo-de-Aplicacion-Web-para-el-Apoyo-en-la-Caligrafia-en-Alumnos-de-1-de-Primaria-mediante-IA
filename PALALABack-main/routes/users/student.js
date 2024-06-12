const { request, response } = require("express");
const pool = require("../../config/dbConfig");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const path = require("path");
const utils = require("../../utils/utils");
const fs = require("fs");
const ia = require("../ia/ia");
const http=require('http');
dotenv.config();
//POST: Create
const createStudent = async (request, response) => {
  const inputValues = {
    firstName: request.body.firstName,
    paternalName: request.body.paternalName,
    maternalName: request.body.maternalName,
    schoolName: request.body.schoolName,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, process.env.SALT),
  };

  const errors = await utils.validateValues(inputValues, "alumno");
  if (Object.keys(errors).length !== 0) {
    response.status(400).json(errors);
  } else {
    const query = `
  INSERT INTO alumno (nombre, apellido_paterno, apellido_materno, email, contrasena, fecha_registro, validado, grado_curso, escuela)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING id_alumno;
  `;

    const values = [
      inputValues.firstName,
      inputValues.paternalName,
      inputValues.maternalName,
      inputValues.email,
      inputValues.password,
      new Date(),
      true,
      "1ro",
      inputValues.schoolName,
    ];

    pool.query(query, values, (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .json({message: `Usuario agregado con ${results.rows[0].id_alumno}`, id_alumno: results.rows[0].id_alumno});
    });
  }
};

//GET: Read by ID
const getStudentById = (request, response) => {
  const id = parseInt(request.params.id_alumno);
  pool.query(
    "SELECT * FROM alumno WHERE id_alumno = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//Read All
const getAllStudents = (request, response) => {
  pool.query(
    "SELECT * FROM alumno ORDER BY id_alumno ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//PUT: Update
const updateStudent = (request, response) => {
  const id = parseInt(request.params.id_alumno);
  const inputValues = {
    nombre: request.body.name,
    apellido_paterno: request.body.paternal,
    apellido_materno: request.body.maternal,
    email: request.body.email,
    escuela: request.body.school,
    contrasena: request.body.password
      ? bcrypt.hashSync(request.body.password, process.env.SALT)
      : "",
  };

  // Define the query and the parameters array
  let query =
    "UPDATE alumno SET nombre = $1, apellido_paterno = $2, apellido_materno = $3, email = $4";
  const parameters = [
    inputValues.nombre,
    inputValues.apellido_paterno,
    inputValues.apellido_materno,
    inputValues.email,
  ];

  // Conditionally add 'contrasena' to the query and parameters
  if (inputValues.contrasena !== null && inputValues.contrasena !== "") {
    query += ", contrasena = $" + (parameters.length + 1);
    parameters.push(inputValues.contrasena);
  }

  // Add the rest of the fields to the query and parameters
  query += ", escuela = $" + (parameters.length + 1);
  query += " WHERE id_alumno = $" + (parameters.length + 2);
  parameters.push(inputValues.escuela, id);

  pool.query(query, parameters, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json({ message: `Usuario actualizado con ID: ${id}` });
  });
};

//DELETE: Delete
const deleteStudent = (request, response) => {
  const id = parseInt(request.params.id_alumno);

  pool.query(
    "DELETE FROM alumno WHERE id_alumno = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

const muestraArchivos = (request, response) => {
  const userData = request.userData;
  const id = userData.id;
  pool.query(
    `
    SELECT 
      a.id_archivo, 
      a.nombre_archivo,
      a.fecha_creacion,
      a.puntuacion as puntuacion_ia,
      a.ruta_archivo,
      g.id_grupo,
      g.nombre_grupo
    FROM 
      archivo a
    inner join
      tiene_archivos ta on a.id_archivo = ta.id_archivo_fk
    inner join
      grupo g on ta.id_grupo_fk = g.id_grupo
    WHERE 
      a.id_alumno_fk = $1
    Order by a.fecha_creacion desc
    `,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      formated_results = {};
      for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows[i];
        if (formated_results[row.id_archivo] === undefined) {
          formated_results[row.id_archivo] = {
            id_archivo: row.id_archivo,
            nombre_archivo: row.nombre_archivo,
            fecha_creacion: row.fecha_creacion,
            puntuacion_ia: row.puntuacion_ia,
            rutaArchivo: row.ruta_archivo,
            grupos: [{ value: row.id_grupo, label: row.nombre_grupo }],
          };
        } else {
          formated_results[row.id_archivo].grupos.push({
            value: row.id_grupo,
            label: row.nombre_grupo,
          });
        }
      }

      actual_results = [];
      for (const key in formated_results) 
        actual_results.push(formated_results[key]);

      /*
        [
          {
            idArchivo: id
            nombreArchivo: nombre_archivo,
            fechaCreacion: fecha_creacion,
            puntuacion: puntuacion_ia,
            rutaArchivo: ruta_archivo,
            grupos: [{value: id_grupo, label: nombre_grupo},{},]
          },
          {
            idArchivo: id
            nombreArchivo: nombre_archivo,
            fechaCreacion: fecha_creacion,
            puntuacion: puntuacion_ia,
            rutaArchivo: ruta_archivo,
            grupos: [{value: id_grupo, label: nombre_grupo},{},]
          },
          ...
        ]
      */

      response.status(200).json(actual_results);
    }
  );
};

const obtenerImagen = (request, response) => {
  const userData = request.userData;
  const id_archivo = request.body.id_archivo;
  const query = `
    SELECT ruta_archivo from archivo where
    id_archivo = $1
  `;
  pool.query(
    query,
    [id_archivo],

    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows[0] === undefined) {
        response.status(404).json({ message: "File not Found" });
        return;
      }
      const ruta = results.rows[0].ruta_archivo;

      // Read the image file
      const image = fs.readFileSync(ruta);

      // Get the file extension
      const ext = ruta.split(".")[ruta.split(".").length - 1];

      // Set the appropriate content type
      response.header("Content-Type", "image/" + ext);

      // Send the image content in the response
      response.status(200).send(image);
    }
  );
};


/*
const obtenerImagen = (request, response) => {
  const userData = request.userData;
  const id_archivo = request.body.id_archivo;
  const query = `
  SELECT ruta_archivo from archivo where
  id_archivo = $1
  `;
  pool.query(
    query,
    [id_archivo],

    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows[0] === undefined) {
        response.status(404).json({ message: "File not Found" });
        return;
      }
      const ruta = results.rows[0].ruta_archivo;
      // const image=fs.readFileSync(ruta);
      // const ext = ruta.split(".")[ruta.split(".").length - 1];
      // //convertir a blob y enviar
      // const blob = Buffer.from(image).toString("utf-8");

      // response.header("Content-Type", "image/" + ext);
      // response.status(200).send(blob);

      //modificamos la ruta para que esté adaptada a al dominio del servidor
      const dominio=process.env.domain;
      let nombre_archivo = ruta.replace(/\\/g, "/");
      nombre_archivo = nombre_archivo.split("/");
      nombre_archivo = nombre_archivo[nombre_archivo.length-1];
      const urlFinal = `${dominio}/images/${nombre_archivo}`;
      response.status(200).json({ ruta: urlFinal });

    }
  );
};
*/

const eliminarArchivo = (request, response) => {
  const id_archivo = request.body.id_archivo;
  const query = `
  SELECT ruta_archivo from archivo where
  id_archivo = $1
  `;

  pool.query(query, [id_archivo], 
    (error, results) => {
      if(error){
        throw error;
      }

      const rutaEliminar = results.rows[0].ruta_archivo;

      pool.query(
        `
          delete from archivo where id_archivo=$1 
        `,
        [id_archivo],
        (error, results) => {
          if (error) {
            throw error;
          }
          utils.borrarArchivoTemporal(rutaEliminar, 0, fs);
          response.status(200).json({ message: "Archivo eliminado"});
        }
      );
    });
  
};

const muestraClasesInscritas = (request, response) => {
  const userData = request.userData;
  pool.query(
    `SELECT
        i.id_inscrito,
        i.id_alumno_fk AS id_alumno,
        i.id_grupo_fk AS id_grupo,
        g.nombre_grupo AS nombre_grupo,
        g.fecha_grupo AS fecha_grupo,
        g.codigo_grupo AS codigo_grupo,
        p.nombre AS nombre_profesor,
        p.apellido_paterno AS apellido_paterno_profesor,
        p.apellido_materno AS apellido_materno_profesor
    FROM
        inscrito i
    JOIN
        grupo g ON i.id_grupo_fk = g.id_grupo
    JOIN
        profesor p ON g.id_profesor_fk = p.id_profesor
    WHERE
        i.id_alumno_fk = $1;`,
    [userData.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const muestraClasesAlum = (request, response) => {
  const userData = request.userData;
  let clases = [];
  pool.query(
    `SELECT id_grupo_fk
    FROM inscrito WHERE id_alumno_fk = $1`,
    [userData.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      results.rows.forEach((row) => {
        const id_grupo = row.id_grupo_fk;
        pool.query(
          "SELECT id_profesor_fk, nombre_grupo, fecha_grupo FROM grupo WHERE id_grupo = $1",
          [id_grupo],
          (error, results_) => {
            if (error) {
              throw error;
            }
            const id_profesor = results_.rows[0].id_profesor_fk;
            pool.query(
              "SELECT nombre, apellido_paterno, apellido_materno FROM profesor WHERE id_profesor = $1",
              [id_profesor],
              (error, results__) => {
                if (error) {
                  throw error;
                }
                const nombre_profesor =
                  results__.rows[0].nombre +
                  " " +
                  results__.rows[0].apellido_paterno +
                  " " +
                  results__.rows[0].apellido_materno;
                clases.push({
                  id_grupo: id_grupo,
                  nombre_grupo: results_.rows[0].nombre_grupo,
                  fecha_grupo: results_.rows[0].fecha_grupo,
                  nombre_profesor: nombre_profesor,
                });
                if (clases.length == results.rows.length) {
                  response.status(200).json(clases);
                }
              }
            );
          }
        );
      });
    }
  );
};

const salirGrupo = (request, response) => {
  const userData = request.userData;
  const id_alumno = userData.id;
  const id_grupo = request.body.id_grupo;
  console.log("Idgroup: ", id_grupo);
  pool.query(
    `DELETE FROM inscrito WHERE id_alumno_fk = $1 AND id_grupo_fk = $2`,
    [id_alumno, id_grupo],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json("Saliste del grupo");
    }
  );
};

const guardarArchivo = (request, response) => {
  const image = request.file.buffer;
  const { nombre_original, nombre_archivo, id_grupos, puntuacion } = JSON.parse(
    request.body.dataJSON
  );
  const userData = request.userData;
  const id_alumno = userData.id;
  /*const nombre_original = request.body.nombre_original;
  const nombre_archivo = request.body.nombre_archivo;
  const id_grupos = request.body.id_grupos;
  const puntuacion = request.body.puntuacion;*/
  const dirGuardado_imagen = path.join("./routes/ia/uploads/pers/images");
  const datosImagen = utils.guardarImagen(image, nombre_original, dirGuardado_imagen);
  const dirGuardado_json = path.join(`./routes/ia/uploads/pers/results/${nombre_original}.json`);
  // ia.EvaluarImagen(`${dirGuardado_imagen}/${nombre_original}`, dirGuardado_json);

  // const datosJson = utils.guardarJson(
  if (!datosImagen.estado) {
    response.status(500).json({ message: "Error del Servidor" });
    return;
  }

  const query = `
    INSERT INTO archivo (id_alumno_fk, nombre_archivo, ruta_archivo, fecha_creacion, puntuacion)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id_archivo;
  `;
  const puntuacion_aux= puntuacion ? puntuacion : 0;
  pool.query(
    query,
    [
      id_alumno,
      nombre_archivo,
      datosImagen.rutaAbsoluta,
      utils.obtenerFecha(),
      puntuacion_aux
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      const id_archivo = results.rows[0].id_archivo;
      if (id_grupos.length !== 0) {
        id_grupos.forEach((id) => {
          const groupQuery = `
            INSERT INTO tiene_archivos (id_grupo_fk, id_archivo_fk)
            VALUES ($1, $2)
            RETURNING id_tiene_archivos;
          `;

          pool.query(groupQuery, [id, id_archivo], (error, groupResults) => {
            if (error) {
              throw error;
            }
            return;
          });
        });
      }

      response.status(200).json({ message: "Archivo Guardado" });
    }
  );
};

const unirseGrupo = (request, response) => {
  const userData = request.userData;
  const id_alumno = userData.id;
  //const id_alumno = jwt.decode(request.headers.authorization.split(" ")[1]).id;
  const codigo = request.body.codigo_grupo;
  console.log("Codigo: ", codigo);
  pool.query(`
    SELECT 
      *
    FROM
      alumno a
    INNER JOIN
      inscrito i ON a.id_alumno = i.id_alumno_fk
    INNER JOIN
      grupo g ON i.id_grupo_fk = g.id_grupo
    WHERE
      g.codigo_grupo = $1
      and a.id_alumno = $2
    `, [codigo,id_alumno], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length == 1) {
        response.status(400).json({ message: `Grupo ya incrito.` });
        return;
      } else {
        pool.query(
          `
          SELECT id_grupo FROM grupo WHERE codigo_grupo = $1
          `,
          [codigo],
          (error, results) => {
            if (error) {
              throw error;
            }
            if (results.rows.length == 0) {
              response.status(400).json({ message: "El código no existe" });
            } else {
              const id_grupo = results.rows[0].id_grupo;
              pool.query(
                `
                INSERT INTO inscrito (id_alumno_fk,id_grupo_fk) VALUES ($1,$2)
                `,
                [id_alumno, id_grupo],
                (error, results) => {
                  if (error) {
                    throw error;
                  }
                  response.status(200).json({ message: "Te uniste al grupo" });
                }
              );
            }
          }
        );
      }
    }
  )
};
/*  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  
  */

  const estadisticasAlumno = (request, response) => {
    const id_alumno = request.userData.id;
    
    const query = `
        SELECT 
            a.id_archivo,
            a.nombre_archivo,
            a.fecha_creacion,
            a.puntuacion as puntuacion_ia,
            a.ruta_archivo,
            c.texto as comentario,
            (p.nombre || ' ' || p.apellido_paterno) as profesor
        FROM 
            archivo a
        LEFT JOIN 
            comentario c ON a.id_archivo = c.id_archivo_fk
        LEFT JOIN 
            profesor p ON c.id_profesor_fk = p.id_profesor
        WHERE 
            a.id_alumno_fk = $1
        ORDER BY 
            a.fecha_creacion DESC
        LIMIT 10;
    `;
    
    pool.query(query, [id_alumno], (error, results) => {
        if (error) {
            throw error;
        }

        const estadisticas = {
            grafica: [],
            comentario: [],
        };

        results.rows.forEach(row => {
            estadisticas.grafica.push({
                name: row.nombre_archivo,
                punctuation: row.puntuacion_ia,
                date: row.fecha_creacion,
            });

            if (row.comentario) {
                estadisticas.comentario.push({
                    comment: `${row.comentario} - ${row.profesor}`,
                    name: row.nombre_archivo,
                });
            }
        });

        response.json({ estadisticas });
    });
};

const progresoPersonal = (request, response) => {
  const id_alumno = request.userData.id;
  let progreso = {};
  pool.query(
    `Select id_archivo,fecha_creacion,puntuacion as puntuacion_ia,ruta_archivo
    FROM archivo WHERE id_alumno_fk = $1
    ORDER BY fecha_creacion DESC
    `,
    [id_alumno],
    (error, results) => {
      if (error) {
        throw error;
      }
      puntuaciones = [];
      results.rows.forEach((row) => {
        puntuaciones.push(row.puntuacion_ia);
      });
      progreso.puntuaciones = {
        max: Math.max(...puntuaciones),
        min: Math.min(...puntuaciones),
        avg: puntuaciones.reduce((a, b) => a + b, 0) / puntuaciones.length,
        puntuaciones: puntuaciones,
      };
      progreso.ultimo_trabajo = results.rows[0];
      results.rows.forEach((row) => {
        if (row.puntuacion_ia == progreso.puntuaciones.max) {
          progreso.mejor_trabajo = row;
        }
      });
      response.status(200).json(progreso);
    }
  );
};

//---------------

const editarArchivo = (request, response) => {
  const nombre_archivo = request.body.nombre_archivo;
  const id_grupos = request.body.id_grupos;
  const id_archivo = request.body.id_archivo;
  pool.query(
    `--sql
      UPDATE 
        archivo
      SET
        nombre_archivo = $1
      WHERE
        id_archivo = $2
    `,
    [nombre_archivo, id_archivo],
    (error, results) => {
      if (error) {
        throw error;
      }
      pool.query(
        `--sql
          DELETE FROM
            tiene_archivos
          WHERE
            id_archivo_fk = $1
        `,
        [id_archivo],
        (error, results) => {
          if (error) {
            throw error;
          }
          id_grupos.forEach((id_g) => {
            pool.query(
              `--sql
                INSERT INTO
                  tiene_archivos (id_grupo_fk, id_archivo_fk)
                VALUES
                  ($1, $2)
              `,
              [id_g, id_archivo],
              (error, results) => {
                if (error) {
                  throw error;
                }
              }
            );
          });
          response.status(200).json({ message: "Archivo editado" });
        }
      );
    }
  );
};

const muestraResultados = (request, response) => {
  const id_archivo = request.body.id_archivo;
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
        throw error;
      }
      try {
        let nombre_archivo= results.rows[0].ruta_archivo;
        nombre_archivo = nombre_archivo.replace(/\\/g, "/");
        nombre_archivo = nombre_archivo.split("/");
        nombre_archivo = nombre_archivo[nombre_archivo.length-1];
        const ruta = path.join(`./routes/ia/uploads/pers/results/${nombre_archivo}.json`);
        const data = fs.readFileSync(ruta, 'utf8');
        response.status(200).json(JSON.parse(data));
      }
      catch (err) {
        console.error(err)
        response.status(404).json({message: "Archivo no encontrado"});
      }
    }
  );
};

const muestraComentarios= ( request, response ) => { 
  const id_archivo = request.body.id_archivo;
  try{
    pool.query(
      `--sql
      SELECT 
        c.texto comentario,
        (p.nombre || ' ' || p.apellido_paterno) as profesor
      FROM 
        comentario c
      INNER JOIN
        profesor p ON c.id_profesor_fk = p.id_profesor
      WHERE 
        c.id_archivo_fk = $1
      ORDER BY c.fecha_publicacion DESC
      `,
      [id_archivo],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  }
  catch (err) {
    console.error(err)
    response.status(404).json({message: "Archivo no encontrado"});
  }
};

const getPDFDocument= (request, response) => {
  const Docxtemplater = require("docxtemplater");
  const PizZip = require("pizzip");

  const fs = require("fs");
  const path = require("path");
  // Load the template

  const content = fs.readFileSync(
      path.resolve(__dirname, "res.docx"),
      "binary"
  )

  const zip = new PizZip(content);
  zxzs
  const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
  })

doc.render({
    a: "John",
    b: "Doe",
    c: "0652455478",
    d: "New Website",
});

// Get the zip document and generate it as a nodebuffer
const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
});

// buf is a nodejs Buffer, you can either write it to a
// file or res.send it with express for example.
fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  guardarArchivo,
  muestraArchivos,
  eliminarArchivo,
  muestraClasesInscritas,
  muestraClasesAlum,
  obtenerImagen,
  salirGrupo,
  unirseGrupo,
  estadisticasAlumno,
  progresoPersonal,
  editarArchivo,
  muestraResultados,
  muestraComentarios,
  getPDFDocument
};
