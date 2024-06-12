const express = require("express");
const router = express.Router();
const userController = require('./users/users')
const iaController = require("./ia/ia")
const docController = require("./doc/docx");
const pool = require('../config/dbConfig');
const loginController = require("./login/login");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// Login
router.post("/login", loginController.lookLogin);

// Users CRUD
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

/*
*
students
create-student
get-student
update-student
delete-student

Professor
create-professor
get-professor
update-professor
delete-professor

Archivo
create-archivo
muestra-archivos
update-archivos
delete-archivos

sendia

*/
   
// Student -------------------------------
router.post('/create-student', userController.createStudent);
router.get('/get-students', userController.getAllStudents);
router.get('/get-student/:id_alumno', userController.getStudentById);
router.get('/muestra-archivos', loginController.authenticateToken, userController.muestraArchivos);
router.post('/muestra-comentarios', loginController.authenticateToken, userController.muestraComentarios);
router.post('/muestra-resultados', loginController.authenticateToken, userController.muestraResultados);
router.put('/put-student/:id_alumno', loginController.authenticateToken, userController.updateStudent);
router.delete('/delete-student/:id_alumno', loginController.authenticateToken, userController.deleteStudent);
router.delete('/eliminar-archivo', loginController.authenticateToken, userController.eliminarArchivo);
router.get('/muestra-clases-alum/:id_alumno', loginController.authenticateToken, userController.muestraClasesInscritas)
router.delete('/salir-clase', loginController.authenticateToken, userController.salirGrupo);
router.post('/inscribir-clase',loginController.authenticateToken ,userController.unirseGrupo);
router.get('/progreso-personal',loginController.authenticateToken,userController.estadisticasAlumno);
router.post("/obtener-imagen", loginController.authenticateToken, userController.obtenerImagen)
router.post('/guardar-archivo', upload.single('image'), loginController.authenticateToken, userController.guardarArchivo);
router.put("/actualizar-archivo", loginController.authenticateToken, userController.editarArchivo);
// Professor -------------------------------
router.post('/create-professor', userController.createProfessor);
router.get('/get-professors', userController.getAllProfessors);
router.get('/get-professor/:id_profesor', userController.getProfessorById);
router.put('/put-professor/:id_profesor',loginController.authenticateToken , userController.updateProfessor);
router.delete('/delete-professor/:id_profesor',loginController.authenticateToken, userController.deleteProfessor);
router.post('/muestra-archivos-grupo', loginController.authenticateToken,userController.muestraArchivosGrupo);
router.delete('/eliminar-archivo-grupo', loginController.authenticateToken,userController.eliminarArchivoGrupo);
router.put('/actualizar-nombre-grupo', loginController.authenticateToken,userController.actualizarNombreGrupo);
router.delete('/eliminar-grupo', loginController.authenticateToken,userController.eliminarGrupo);
router.delete('/eliminar-estudiante-grupo', loginController.authenticateToken,userController.eliminarEstudianteGrupo);
router.get('/muestra-clases-prof', loginController.authenticateToken, userController.muestraClasesProf);
router.post('/creacion-clase', loginController.authenticateToken, userController.creacionClase);
router.get('/muestra-estudiantes', userController.muestraEstudiantes);
router.post("/escribir-comentario", loginController.authenticateToken, userController.escribirComentario);

// Administrator -------------------------------
router.post('/create-admin', userController.createAdmin);
router.get('/get-admins', userController.getAllAdmins);
router.get('/get-admin/:id_admin', userController.getAdminById);
router.put('/put-admin/:id_admin', loginController.authenticateToken, userController.updateAdmin);
router.delete('/delete-admin/:id_admin', loginController.authenticateToken, userController.deleteAdmin);

//IA
router.post("/sendia", upload.single('image'), iaController.ProcesarImagen)

router.post("/muestra-doc", docController.generarDocDeArchivosPersistentes);

//Connection test
router.post("/uokpost",(request, response) => {response.status(200).json({message:"Trabajando duro o durando en el trabajo"});;});
router.get("/uokget",(request, response) => {response.status(200).json({message:"Trabajando duro o durando en el trabajo"});;});

//Servicios administrativos
router.post("/temp-files",iaController.GetTempFiles)
router.post("/pers-files",iaController.GetPersFiles)

module.exports = router;