-- Tabla administrador
CREATE TABLE administrador (
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido_paterno VARCHAR(50) NOT NULL,
  apellido_materno VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  contrasena VARCHAR(100) NOT NULL,
  fecha_registro DATE NOT NULL,
  validado BOOLEAN
);

-- Tabla alumno
CREATE TABLE alumno (
  id_alumno SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido_paterno VARCHAR(50) NOT NULL,
  apellido_materno VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  contrasena VARCHAR(100) NOT NULL,
  fecha_registro DATE NOT NULL,
  validado BOOLEAN NOT NULL,
  grado_curso VARCHAR(10) NOT NULL,
  escuela VARCHAR(100) NOT NULL
);

-- Tabla profesor
CREATE TABLE profesor (
  id_profesor SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido_paterno VARCHAR(50) NOT NULL,
  apellido_materno VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  contrasena VARCHAR(100) NOT NULL,
  fecha_registro DATE NOT NULL,
  validado BOOLEAN NOT NULL,
  grado_imparte VARCHAR(50) NOT NULL,
  escuela VARCHAR(100) NOT NULL
);

-- Tabla grupo
CREATE TABLE grupo (
  id_grupo SERIAL PRIMARY KEY,
  id_profesor_fk INT,
  nombre_grupo VARCHAR(30) NOT NULL,
  codigo_grupo VARCHAR(10) NOT NULL,
  fecha_grupo DATE NOT NULL,
  color_grupo VARCHAR(7) NOT NULL,
  CONSTRAINT fk_grupo_profesor FOREIGN KEY (id_profesor_fk) REFERENCES profesor (id_profesor) on update cascade on delete cascade
);

-- Tabla archivo
CREATE TABLE archivo (
  id_archivo SERIAL PRIMARY KEY,
  id_alumno_fk INT,
  nombre_archivo VARCHAR(100) NOT NULL,
  ruta_archivo TEXT,
  fecha_creacion DATE NOT NULL,
  puntuacion INT NOT NULL,
  CONSTRAINT fk_archivo_alumno FOREIGN KEY (id_alumno_fk) REFERENCES alumno (id_alumno) on update cascade on delete cascade
);

-- Tabla comentario
CREATE TABLE comentario (
  id_comentario SERIAL PRIMARY KEY,
  id_profesor_fk INT,
  id_archivo_fk INT,
  texto TEXT NOT NULL,
  fecha_publicacion DATE NOT NULL,
  CONSTRAINT fk_comentario_profesor FOREIGN KEY (id_profesor_fk) REFERENCES profesor (id_profesor) on update cascade on delete cascade,
  CONSTRAINT fk_comentario_archivo FOREIGN KEY (id_archivo_fk) REFERENCES archivo (id_archivo) on update cascade on delete cascade
);

-- Tabla multimedia
CREATE TABLE multimedia (
  id_multimedia SERIAL PRIMARY KEY,
  titulo_multimedia TEXT NOT NULL,
  url_multimedia TEXT NOT NULL
);

-- Tabla inscrito
CREATE TABLE inscrito (
  id_inscrito SERIAL PRIMARY KEY,
  id_alumno_fk INT,
  id_grupo_fk INT,
  CONSTRAINT fk_alumno_grupo FOREIGN KEY (id_alumno_fk) REFERENCES alumno (id_alumno) on update cascade on delete cascade,
  CONSTRAINT fk_grupo_alumno FOREIGN KEY (id_grupo_fk) REFERENCES grupo (id_grupo) on update cascade on delete cascade
);

-- Tabla tiene archivos
CREATE TABLE tiene_archivos (
  id_tiene_archivos SERIAL PRIMARY KEY,
  id_grupo_fk INT,
  id_archivo_fk INT,
  CONSTRAINT fk_grupo_archivo FOREIGN KEY (id_grupo_fk) REFERENCES grupo (id_grupo) on update cascade on delete cascade,
  CONSTRAINT fk_archivo_grupo FOREIGN KEY (id_archivo_fk) REFERENCES archivo (id_archivo) on update cascade on delete cascade
);

-- Tabla fotos entrenamiento
CREATE TABLE fotos_entrenamiento (
  id_FE SERIAL PRIMARY KEY,
  letra CHAR(1) NOT NULL,
  ruta TEXT NOT NULL,
  ruido TEXT NOT NULL
);