export const API_BASE_URL = "https://palala-back.onrender.com";
//export const API_BASE_URL = "http://localhost:9000";

// apiEndpoints.js

export const LOGIN_URL = "/login"; 

// User Endpoints
export const CREATE_STUDENT_URL = "/create-student";
export const GET_STUDENTS_URL = "/get-students";
export const GET_STUDENT_BY_ID_URL = "/get-student"; //:id_alumno
export const MUESTRA_ARCHIVOS_URL = "/muestra-archivos";
export const MUESTRA_COMENTARIOS_URL = "/muestra-comentarios";
export const MUESTRA_RESULTADOS_URL = "/muestra-resultados";
export const UPDATE_STUDENT_URL = "/put-student"; //:id_alumno
export const DELETE_STUDENT_URL = "/delete-student"; //:id_alumno
export const ELIMINAR_ARCHIVO_URL = "/eliminar-archivo";
export const MUESTRA_CLASES_ALUM_URL = "/muestra-clases-alum"; //:id_alumno
export const SALIR_CLASE_URL = "/salir-clase";
export const INSCRIBIR_CLASE_URL = "/inscribir-clase";
export const PROGRESO_PERSONAL_URL = "/progreso-personal";
export const OBTENER_IMAGEN_URL = "/obtener-imagen";
export const ACTUALIZAR_ARCHIVO_URL = "/actualizar-archivo";
export const MUESTRA_DOC_URL = "/muestra-doc";

// Professor Endpoints
export const CREATE_PROFESSOR_URL = "/create-professor";
export const GET_PROFESSORS_URL = "/get-professors";
export const GET_PROFESSOR_BY_ID_URL = "/get-professor"; // /:id_profesor
export const UPDATE_PROFESSOR_URL = "/put-professor"; // /:id_profesor
export const DELETE_PROFESSOR_URL = "/delete-professor"; // /:id_profesor
export const MUESTRA_ARCHIVOS_GRUPO_URL = "/muestra-archivos-grupo";
export const ELIMINAR_ARCHIVO_GRUPO_URL = "/eliminar-archivo-grupo";
export const ACTUALIZAR_NOMBRE_GRUPO_URL = "/actualizar-nombre-grupo";
export const ELIMINAR_GRUPO_URL = "/eliminar-grupo";
export const ELIMINAR_ESTUDIANTE_GRUPO_URL = "/eliminar-estudiante-grupo";
export const MUESTRA_CLASES_PROF_URL = "/muestra-clases-prof";
export const CREACION_CLASE_URL = "/creacion-clase";
export const MUESTRA_ESTUDIANTES_URL = "/muestra-estudiantes";
export const GUARDAR_ARCHIVO_URL = "/guardar-archivo";
export const ESCRIBIR_COMENTARIO_URL = "/escribir-comentario";

// Administrator Endpoints
export const CREATE_ADMIN_URL = "/create-admin";
export const GET_ADMINS_URL = "/get-admins";
export const GET_ADMIN_BY_ID_URL = "/get-admin"; ///:id_admin
export const UPDATE_ADMIN_URL = "/put-admin"; ///:id_admin
export const DELETE_ADMIN_URL = "/delete-admin"; ///:id_admin

// IA Endpoint
export const SEND_IA_URL = "/sendia";
