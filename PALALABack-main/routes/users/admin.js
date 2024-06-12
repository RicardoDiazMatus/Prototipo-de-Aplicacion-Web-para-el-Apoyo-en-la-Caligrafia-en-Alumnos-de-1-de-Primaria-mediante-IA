const pool = require("../../config/dbConfig");

//POST: Create
const createAdmin = (request, response) => {
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    email,
    contrasena,
    fecha_registro,
    validado,   
  } = request.body;

  const query = `
  INSERT INTO administrador (nombre, apellido_paterno, apellido_materno, email, contrasena, fecha_registro, validado)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING id_administrador;
`;

  const values = [
    nombre,
    apellido_paterno,
    apellido_materno,
    email,
    contrasena,
    fecha_registro,
    validado,
  ];

  pool.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    response
      .status(201)
      .json(`Usuario Administrador agregado con ${results.rows[0].id_administrador}`);
  });
};

//GET: Read by ID
const getAdminById = (request, response) => {
  const id = parseInt(request.params.id_administrador);

  pool.query(
    "SELECT * FROM administrador WHERE id_administrador = $1",
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
const getAllAdmins = (request, response) => {
  pool.query(
    "SELECT * FROM administrador ORDER BY id_administrador ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//PUT: Update
const updateAdmin = (request, response) => {
  const id = parseInt(request.params.id_administrador);
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    email,
    contrasena,
    fecha_registro,
    validado,   
  } = request.body;

  pool.query(
    "UPDATE administrador SET nombre = $1, apellido_paterno = $2, apellido_materno = $3, email = $4, contrasena = $5, fecha_registro = $6, validado = $7 WHERE id_administrador = $8;",
    [
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      contrasena,
      fecha_registro,
      validado,
      id,
    ],
    (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).send(`Usuario Administrador actualizado con ID: ${id}`)
    }
  );
};

//DELETE: Delete
const deleteAdmin = (request, response) => {
    const id = parseInt(request.params.id_administrador);

    pool.query("DELETE FROM administrador WHERE id_administrador = $1",
    [id],
    (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).send(`User Admin deleted with ID: ${id}`)
    }
    )
}

module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
}