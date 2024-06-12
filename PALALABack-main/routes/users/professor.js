const { request, response } = require("express");
const pool = require("../../config/dbConfig");
const utils = require("../../utils/utils");
const genClassCode = require("../../utils/utils").generateClassCode;
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
//POST: Create
const createProfessor = async (request, response) => {
  const inputValues = {
    firstName: request.body.firstName,
    paternalName: request.body.paternalName,
    maternalName: request.body.maternalName,
    schoolName: request.body.schoolName,
    email: request.body.email,
    password: request.body.password,
  };

  const errors = await utils.validateValues(inputValues, "profesor");
  //console.log("Longitud de errores: " + Object.keys(errors).length);
  if (Object.keys(errors).length !== 0) {
    response.status(400).json(errors);
  } else {
    const query = `
  INSERT INTO profesor (nombre, apellido_paterno, apellido_materno, email, contrasena, fecha_registro, validado, grado_imparte, escuela)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING id_profesor;
`;

    const values = [
      inputValues.firstName,
      inputValues.paternalName,
      inputValues.maternalName,
      inputValues.email,
      bcrypt.hashSync(inputValues.password, process.env.SALT),
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
        .json({
          id_professor: results.rows[0].id_profesor,
          message: `Usuario agregado con ${results.rows[0].id_profesor}`,
        });
    });
  }
};

//GET: Read by ID
const getProfessorById = (request, response) => {
  const id = parseInt(request.params.id_profesor);
  pool.query(
    "SELECT * FROM profesor WHERE id_profesor = $1",
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
const getAllProfessors = (request, response) => {
  pool.query(
    "SELECT * FROM profesor ORDER BY id_profesor ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//PUT: Update
const updateProfessor = (request, response) => {
  const id = parseInt(request.params.id_profesor);
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
    "UPDATE profesor SET nombre = $1, apellido_paterno = $2, apellido_materno = $3, email = $4";
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
  query += " WHERE id_profesor = $" + (parameters.length + 2);
  
  parameters.push(inputValues.escuela, id);
  
  pool.query(query, parameters, (error, results) => {
    if (error) {
      throw error;
    }
    
    response.status(200).json({ message: `Usuario actualizado con ID: ${id}` });
  });
};

//DELETE: Delete
const deleteProfessor = (request, response) => {
  const id = parseInt(request.params.id_profesor);

  pool.query(
    "DELETE FROM profesor WHERE id_profesor = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

const muestraClasesProf = (request, response) => {
  const userData = request.userData;
  const id = userData.id;
  let clases = [];
  pool.query(
    "SELECT id_grupo,codigo_grupo,nombre_grupo,fecha_grupo,color_grupo FROM grupo WHERE id_profesor_fk = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      results.rows.forEach((row) => {
        const id_grupo = row.id_grupo;
        pool.query(
          "SELECT COUNT(*) FROM tiene_archivos WHERE id_grupo_fk = $1",
          [id_grupo],
          (error, results_) => {
            if (error) {
              throw error;
            }
            const numeroArchivos = results_.rows[0].count;
            pool.query(
              "SELECT COUNT(*) FROM inscrito WHERE id_grupo_fk = $1",
              [id_grupo],
              (error, results__) => {
                if (error) {
                  throw error;
                }
                const numEstudiantes = results__.rows[0].count;
                clases.push({
                  id_grupo: id_grupo,
                  codigo_grupo: row.codigo_grupo,
                  nombre_grupo: row.nombre_grupo,
                  fecha_creacion: row.fecha_grupo,
                  numero_archivos: numeroArchivos,
                  num_estudiantes: numEstudiantes,
                  color_grupo: row.color_grupo,
                  nodes: [],
                });
                if (clases.length === results.rows.length) {
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

const creacionClase = (request, response) => {
  const userData = request.userData;
  const inputValues = {
    nombre_grupo: request.body.groupName,
    fecha_creacion: request.body.groupDate,
    color_grupo: request.body.color,
  };

  pool.query(
    `INSERT into grupo (id_profesor_fk,codigo_grupo,nombre_grupo,fecha_grupo,color_grupo) 
    VALUES ($1,$2,$3,$4,$5)
    RETURNING id_grupo`,
    [
      userData.id,
      "default",
      inputValues.nombre_grupo,
      inputValues.fecha_creacion,
      inputValues.color_grupo,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      const id_grupo = results.rows[0].id_grupo;
      const codigo_grupo = genClassCode(id_grupo);
      
      
      pool.query(
        `UPDATE grupo SET codigo_grupo=$1 WHERE id_grupo=$2
        RETURNING id_grupo`,
        [codigo_grupo, id_grupo],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(201).json({
            message: `Grupo creado con ${results.rows[0].id_grupo} y codigo ${codigo_grupo}`,
            id_grupo: id_grupo,
          });
        }
      );
    }
  );
};

const muestraArchivosGrupo = (request, response) => {
  const id_grupo = request.body.id_grupo;
  pool.query(
    `
  SELECT 
    archivo.id_archivo,
    archivo.nombre_archivo, 
    archivo.fecha_creacion, 
    archivo.puntuacion, 
    archivo.ruta_archivo,
    CONCAT(alumno.nombre, ' ', alumno.apellido_paterno, ' ', alumno.apellido_materno) AS nombre_estudiante
FROM 
    tiene_archivos 
INNER JOIN 
    archivo 
    ON id_archivo = id_archivo_fk 
INNER JOIN
    alumno
    ON id_alumno_fk = id_alumno
WHERE 
    id_grupo_fk = $1;  
    `,
    [id_grupo],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const eliminarArchivoGrupo = (request, response) => {
  const { id_archivo } = request.body;
  pool.query(
    `
    DELETE FROM
      tiene_archivos
    WHERE
      id_archivo_fk=$1
    `,
    [id_archivo],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json("Archivo eliminado del grupo");
    }
  );
};

const actualizarNombreGrupo = (request, response) => {
  const { id_grupo, nombre_grupo } = request.body;
  pool.query(
    `
    UPDATE
      grupo
    SET
      nombre_grupo=$1
    WHERE
      id_grupo=$2
    `,
    [nombre_grupo, id_grupo],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json("Nombre del grupo actualizado");
    }
  );
};

const eliminarGrupo = (request, response) => {
  const { id_grupo } = request.body;
  pool.query(
    `
    DELETE FROM
      grupo
    WHERE
      id_grupo=$1
    `,
    [id_grupo],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json("Grupo eliminado");
    }
  );
};

const muestraEstudiantes = (request, response) => {
  const { id_grupo } = request.body;
  pool.query(
    `
    SELECT
      alumno.id_alumno as id_alumno,
      concat(
        alumno.nombre,' ',
        alumno.apellido_paterno,' ',
        alumno.apellido_materno
      ) as nombre_estudiante
    FROM
      alumno
    INNER JOIN
      inscrito
    ON
      inscrito.id_alumno_fk=alumno.id_alumno
    WHERE
      inscrito.id_grupo_fk=$1
    `,
    [id_grupo],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const eliminarEstudianteGrupo = (request, response) => {
  const { id_alumno, id_grupo } = request.body;
  pool.query(
    `
    DELETE FROM
      inscrito
    WHERE
      id_alumno_fk=$1 AND
      id_grupo_fk=$2
    `,
    [id_alumno, id_grupo],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json("Estudiante eliminado del grupo");
    }
  );
};

const escribirComentario = (request, response) => {
  const userData = request.userData;
  const id_profesor = userData.id;
  const id_archivo = request.body.id_archivo;
  const texto = request.body.texto;
  const query = `--sql
    INSERT INTO comentario
      (id_profesor_fk,
      id_archivo_fk,
      texto,
      fecha_publicacion)
    VALUES
    (
      $1, $2, $3,now()
    )
    RETURNING id_comentario 
  `;
  pool.query(query, [id_profesor, id_archivo, texto], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(201).json({
      message: `Comentario creado con ${result.rows[0].id_comentario}`,
    });
  });
};

/*
-Descargar PDF con calificaciones incrustradas

Global:
 -Modificación de Imágenes
 -Modificación de links
 -Animaciones en general
*/

module.exports = {
  createProfessor,
  getAllProfessors,
  getProfessorById,
  updateProfessor,
  deleteProfessor,
  muestraClasesProf,
  creacionClase,
  muestraArchivosGrupo,
  eliminarArchivoGrupo,
  actualizarNombreGrupo,
  eliminarGrupo,
  muestraEstudiantes,
  eliminarEstudianteGrupo,
  escribirComentario,
};
