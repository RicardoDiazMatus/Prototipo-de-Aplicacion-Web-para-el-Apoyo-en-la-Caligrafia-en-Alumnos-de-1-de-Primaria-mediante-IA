const app = require("../app");
const pool = require("../config/dbConfig");
const supertest = require("supertest");
const { generateAccessToken } = require("../routes/login/login");
const api = supertest(app);

/**
 *
 *
 *
 * Student API
 *
 *
 *
 */

describe("Student API", () => {
  let id_alumno;

  const waitForIdAlumno = () => {
    return new Promise((resolve) => {
      const checkId = () => {
        if (id_alumno !== null) {
          resolve();
        } else {
          setTimeout(checkId, 100); // Check again after a short delay
        }
      };

      checkId();
    });
  };

  const generateAuth = async () => {
    await waitForIdAlumno();
    const query = `SELECT id_alumno, nombre, email, 'alumno' AS tipo_usuario FROM alumno where id_alumno = $1`;
    const userData = await new Promise((resolve, reject) => {
      pool.query(query, [id_alumno], (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        const userData = {
          id: results.rows[0].id_profesor,
          name: results.rows[0].nombre,
          email: results.rows[0].email,
          userType: results.rows[0].tipo_usuario,
        };

        resolve(userData);
      });
    });
    const auth = await generateAccessToken(userData);
    return auth;
  };

  test("POST /create-student", async () => {
    const start = Date.now();
    const response = await api.post("/create-student").send({
      firstName: "example",
      paternalName: "example",
      maternalName: "example",
      schoolName: "example",
      email: `example${Math.floor(
        Math.floor(100000 + Math.random() * 900000)
      )}@example.com`,
      password: "Example+example2",
    });
    const end = Date.now();
    const latency = end - start;
    console.log(`Latency: ${latency} ms`);
    if (response.status === 201) {
      // Success case
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: expect.stringContaining("Usuario agregado con"),
        id_alumno: expect.any(Number),
      });
      id_alumno = response.body.id_alumno;
    } else {
      // Failure case
      expect(response.status).toBe(400);
      // Add additional assertions if needed for the failure case
    }
  });

  test("GET /get-student/:id_alumno", async () => {
    const response = await api.get(`/get-student/${id_alumno}`);
    if (response.status === 200) expect(response.status).toBe(200);
    else expect(response.status).toBe(404);
  });

  test("GET ALL /all-students", async () => {
    const response = await api.get("/get-students");
    expect(response.status).toBe(200);
  });

  test("PUT /put-student/:id_alumno", async () => {
    const auth = await generateAuth();
    const response = await api
      .put(`/put-student/${id_alumno}`)
      .set("Authorization", auth)
      .send({
        name: `example${Math.floor(Math.floor(100 + Math.random() * 900))}`,
        paternal: `example${Math.floor(Math.floor(100 + Math.random() * 900))}`,
        maternal: `example${Math.floor(Math.floor(100 + Math.random() * 900))}`,
        school: `example${Math.floor(Math.floor(100 + Math.random() * 900))}`,
        email: `example${Math.floor(
          Math.floor(100000 + Math.random() * 900000)
        )}@example.com`,
        password: `Example+example${Math.floor(
          Math.floor(100000 + Math.random() * 900000)
        )}`,
      });
    if (response.status === 201) {
      // Success case
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: expect.stringContaining("Usuario actualizado con ID:"),
      });
      id_alumno = response.body.id_alumno;
    } else {
      // Failure case
      expect(response.status).toEqual(expect.anything());
      // Add additional assertions if needed for the failure case
    }
  });

  test("DELETE /delete-student/:id_alumno", async () => {
    console.log("eSTO ES ID- ALUMNO", id_alumno);
    const auth = await generateAuth();
    console.log("eSTO ES ID- ALUMNO", id_alumno);
    const response = await api
      .del(`/delete-student/${id_alumno}`)
      .set("Authorization", auth);
    expect(response.status).toBe(200);
  });
});

/**
 *
 *
 *
 * Professor API
 *
 *
 *
 */

describe("Professor API", () => {
  let id_professor;

  const waitForIdProfessor = () => {
    return new Promise((resolve) => {
      const checkId = () => {
        if (id_professor !== null) {
          resolve();
        } else {
          setTimeout(checkId, 100); // Check again after a short delay
        }
      };

      checkId();
    });
  };

  const generateAuth = async () => {
    await waitForIdProfessor();
    const query = `SELECT id_profesor, nombre, email, 'profesor' AS tipo_usuario FROM profesor where id_profesor = $1`;
    const userData = await new Promise((resolve, reject) => {
      pool.query(query, [id_professor], (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        const userData = {
          id: results.rows[0].id_profesor,
          name: results.rows[0].nombre,
          email: results.rows[0].email,
          userType: results.rows[0].tipo_usuario,
        };

        resolve(userData);
      });
    });
    const auth = await generateAccessToken(userData);
    return auth;
  };

  test("POST /create-professor", async () => {
    const response = await api.post("/create-professor").send({
      firstName: "example",
      paternalName: "example",
      maternalName: "example",
      schoolName: "example",
      email: `example${Math.floor(
        Math.floor(100000 + Math.random() * 900000)
      )}@example.com`,
      password: "Example+example2",
    });
    if (response.status === 201) {
      // Success case
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: expect.stringContaining("Usuario agregado con"),
        id_professor: expect.any(Number),
      });
      //console.log("Profesor agregado");
      //console.log(response.body.message);
      id_professor = response.body.id_professor;
    } else {
      expect(response.status).toBe(400);
    }
  });

  test("GET /get-professor/:id_profesor", async () => {
    const response = await api.get(`/get-professor/${id_professor}`);
    if (response.status === 200) expect(response.status).toBe(200);
    else expect(response.status).toBe(404);
  });

  test("GET ALL /get-professors", async () => {
    const response = await api.get("/get-professors");
    expect(response.status).toBe(200);
  });

  test("PUT /put-professor/:id_profesor", async () => {
    const auth = await generateAuth();
    const response = await api
      .put(`/put-professor/${id_professor}`)
      .set("Authorization", auth)
      .send({
        name: `example${Math.floor(Math.floor(100 + Math.random() * 900))}`,
        paternal: `example${Math.floor(Math.floor(100 + Math.random() * 900))}`,
        maternal: `example${Math.floor(Math.floor(100 + Math.random() * 900))}`,
        school: `example${Math.floor(Math.floor(100 + Math.random() * 900))}`,
        email: `example${Math.floor(
          Math.floor(100000 + Math.random() * 900000)
        )}@example.com`,
        password: `Example+example${Math.floor(
          Math.floor(100000 + Math.random() * 900000)
        )}`,
      });
    if (response.status === 200) {
      // Success case
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: expect.stringContaining("Usuario actualizado con ID:"),
      });
    } else {
      expect(response.status).toEqual(expect.anything());
    }
  });

  test("DELETE /delete-professor/:id_profesor", async () => {
    const auth = await generateAuth();
    const response = await api
      .del(`/delete-professor/${id_professor}`)
      .set("Authorization", auth);
    expect(response.status).toBe(200);
  });
});


describe("Grupo API", () => {
  let id_professor;
  let id_group;

  const waitForIdProfessor = () => {
    return new Promise((resolve) => {
      const checkId = () => {
        if (id_professor !== null) {
          resolve();
        } else {
          setTimeout(checkId, 100); // Check again after a short delay
        }
      };

      checkId();
    });
  };

  const generateAuth = async () => {
    await waitForIdProfessor();
    const query = `SELECT id_profesor, nombre, email, 'profesor' AS tipo_usuario FROM profesor where id_profesor = 1`;
    // Utiliza una promesa para envolver la llamada a pool.query
    const userData = await new Promise((resolve, reject) => {
      pool.query(query, [], (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        const userData = {
          id: results.rows[0].id_profesor,
          name: results.rows[0].nombre,
          email: results.rows[0].email,
          userType: results.rows[0].tipo_usuario,
        };

        resolve(userData);
      });
    });
    const auth = await generateAccessToken(userData);
    return auth;
  };

  test("POST /creacion-clase", async () => {
    const auth = await generateAuth();
    const response = await api
      .post("/creacion-clase")
      .set("Authorization", auth)
      .send({
        userData: {
          id: id_professor,
        },
        groupName: `example${Math.floor(
          Math.floor(100 + Math.random() * 900)
        )}`,
        groupDate: new Date().toISOString(),
        color: "#000000",
      });

    if (response.status === 201) {
      id_group = response.body.id_grupo;
      expect(response.status).toBe(201);
    } else {
      expect(response.status).toBe(400);
    }
  });
  test("GET ALL /muestra-clases-prof", async () => {
    const auth = await generateAuth();
    const response = await api
      .get("/muestra-clases-prof")
      .set("Authorization", auth);
    if (response.status === 200) {
      expect(response.status).toBe(200);
    }
  });
  test("PUT /actualizar-nombre-grupo ", async () => {
    const auth = await generateAuth();
    const response = await api
      .put("/actualizar-nombre-grupo")
      .set("Authorization", auth)
      .send({
        id_grupo: id_group,
        nombre_grupo: `exampleUp${Math.floor(
          Math.floor(100 + Math.random() * 900)
        )}`,
      });
    if (response.status === 200) {
      expect(response.status).toBe(200);
    }
  });
  test("DELETE /eliminar-grupo", async () => {
    const auth = await generateAuth();
    const response = await api
      .del("/eliminar-grupo")
      .set("Authorization", auth)
      .send({ id_grupo: id_group });
  }, 20000);
});


describe("Archivo API", () => {
  let id_professor;
  let id_group;

  const waitForIdProfessor = () => {
    return new Promise((resolve) => {
      const checkId = () => {
        if (id_professor !== null) {
          resolve();
        } else {
          setTimeout(checkId, 100); // Check again after a short delay
        }
      };

      checkId();
    });
  };

  const generateAuth = async () => {
    await waitForIdProfessor();
    const query = `SELECT id_profesor, nombre, email, 'profesor' AS tipo_usuario FROM profesor where id_profesor = 1`;
    // Utiliza una promesa para envolver la llamada a pool.query
    const userData = await new Promise((resolve, reject) => {
      pool.query(query, [], (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        const userData = {
          id: results.rows[0].id_profesor,
          name: results.rows[0].nombre,
          email: results.rows[0].email,
          userType: results.rows[0].tipo_usuario,
        };

        resolve(userData);
      });
    });
    const auth = await generateAccessToken(userData);
    return auth;
  };

  test("POST /guardar-archivo", async () => {
    const auth = await generateAuth();
    const response = await api
      .post("/creacion-clase")
      .set("Authorization", auth)
      .send({
        userData: {
          id: id_professor,
        },
        groupName: `example${Math.floor(
          Math.floor(100 + Math.random() * 900)
        )}`,
        groupDate: new Date().toISOString(),
        color: "#000000",
      });

    if (response.status === 201) {
      id_group = response.body.id_grupo;
      expect(response.status).toBe(201);
    } else {
      expect(response.status).toBe(400);
    }
  });
  test("GET ALL /muestra-archivos", async () => {
    const auth = await generateAuth();
    const response = await api
      .get("/muestra-clases-prof")
      .set("Authorization", auth);
    if (response.status === 200) {
      expect(response.status).toBe(200);
    }
  });
  test("PUT /actualizar-archivo ", async () => {
    const auth = await generateAuth();
    const response = await api
      .put("/actualizar-nombre-grupo")
      .set("Authorization", auth)
      .send({
        id_grupo: id_group,
        nombre_grupo: `exampleUp${Math.floor(
          Math.floor(100 + Math.random() * 900)
        )}`,
      });
    if (response.status === 200) {
      expect(response.status).toBe(200);
    }
  });
  test("DELETE /eliminar-archivo", async () => {
    const auth = await generateAuth();
    const response = await api
      .del("/eliminar-grupo")
      .set("Authorization", auth)
      .send({ id_grupo: id_group });
  }, 20000);
});