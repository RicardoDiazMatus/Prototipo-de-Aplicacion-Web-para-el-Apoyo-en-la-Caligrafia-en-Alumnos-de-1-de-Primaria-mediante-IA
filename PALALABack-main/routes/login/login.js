const pool = require("../../config/dbConfig");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const lookLogin = (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  const query = `
    SELECT
      'administrador' AS tipo_usuario, id_usuario AS id, nombre, email, contrasena
    FROM
      administrador
    WHERE
      email = $1
    UNION
    SELECT
      'alumno' AS tipo_usuario, id_alumno AS id, nombre, email, contrasena
    FROM
      alumno
    WHERE
      email = $1
    UNION
    SELECT
      'profesor' AS tipo_usuario, id_profesor AS id, nombre, email, contrasena
    FROM
      Profesor
    WHERE
      email = $1;
  `;

  pool.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error al buscar el email:", error);
      response.status(500).json({ message: "Error interno del servidor" });
      throw error;
    }
    if (results.rows.length === 0) {
      return response.status(401).json({ message: "Email no encontrado" });
    } else {
      const hashedPassword = bcrypt.hashSync(password, process.env.SALT);
      if (hashedPassword === results.rows[0].contrasena) {
        const userData = {
          id: results.rows[0].id,
          name: results.rows[0].nombre,
          email: results.rows[0].email,
          userType: results.rows[0].tipo_usuario,
        };
        const accessToken = generateAccessToken(userData);
        return response.status(200).json({ accessToken });
      } else {
        return response.status(401).json({ message: "Contraseña no valida" });
      }
    }
  });
};

const generateAccessToken = (userData) => {
  return jwt.sign(userData, process.env.TOKEN_SECRET);
};

const authenticateToken = (request, response, next) => {
  const token = request.header("Authorization");
  if (!token || token === ""){
    return response.status(401).json({ message: "No token sent" });
  }
  
  jwt.verify(token, process.env.TOKEN_SECRET, (error, userData) => {
    if (error) {
      console.log(error);
      return response.status(403).json({ message: "Invalid token" });
    }
    
    request.userData = userData;
    next();
  });
};

module.exports = {
  lookLogin,
  generateAccessToken,
  authenticateToken,
};
