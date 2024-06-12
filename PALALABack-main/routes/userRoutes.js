const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/check-db-connection", async (req, res) => {
  try {
    const client = await pool.connect();
    const queryDatabaseCurrent = await client.query('SELECT current_database() as database_name');
    const databaseName = queryDatabaseCurrent.rows[0].database_name;
    client.release(); // Release the client back to the pool immediately
    res.status(200).json({ status: `Database connection is OK and connected to ${databaseName}` });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ status: "Database connection error" });
  }
});

router.post("/create-alumno", async (req, res) => {
  try {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      contraseña,
      fecha_registro,
      validado,
      grado_curso,
      escuela,
    } = req.body;

    const query = `
        INSERT INTO alumno (nombre, apellido_paterno, apellido_materno, email, contraseña, fecha_registro, validado, grado_curso, escuela)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id_alumno;
      `;

    const values = [
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      contraseña,
      fecha_registro,
      validado,
      grado_curso,
      escuela,
    ];

    const result = await pool.query(query, values);

    res.status(201).json({ id: result.rows[0].id_alumno });
  } catch (error) {
    console.error('Error inserting data into "alumno" table:', error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM alumno");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Moda" });
  }
});

// More routes for updating and deleting users

module.exports = router;
