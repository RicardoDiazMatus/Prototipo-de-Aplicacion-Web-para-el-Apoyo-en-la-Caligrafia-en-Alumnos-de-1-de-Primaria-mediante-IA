import React, { useEffect, useState } from "react";
import { StyledStudentFiles } from "./StudentFiles.styled";
import ClassCard from "../../Professors/SelectionClass/ClassCard/ClassCard";
import ClassCardFile from "../../Professors/GroupClass/ClassCardFile/ClassCardFile";
import OverlayModal from "../../Utils/OverlayModal/OverlayModal";
import DeleteModal from "../../Utils/DeleteModal/DeleteModal";
import { AnimatePresence } from "framer-motion";
import EditModal from "../../Utils/EditModal/EditModal";
import { motion } from "framer-motion";
import Loading from "../../Utils/Loading/Loading";
import { useSelector } from "react-redux";
import OkModal from "../../Utils/OkModal/OkModal";
import Select from "react-select";
import { useGetAuthPayload } from "../../../utils/hooks/hooks";
import UserFileViewer from "../../Utils/UserFileViewer/UserFileViewer";
import {
  ACTUALIZAR_ARCHIVO_URL,
  API_BASE_URL,
  ELIMINAR_ARCHIVO_URL,
  MUESTRA_ARCHIVOS_URL,
  MUESTRA_CLASES_ALUM_URL,
} from "../../../utils/config";
function StudentFiles() {
  const [modal, setModal] = useState();
  const [animateIndex, setAnimateIndex] = useState(0);
  const [studentFiles, setStudentFiles] = useState(null);
  const [isOverflow, setOverflow] = useState(false);
  const [isDeleteSubmit, setDeleteSubmit] = useState(false);
  const [file, setFile] = useState();
  const [isEditable, setEditable] = useState(false);
  const [isEditSubmit, setEditSubmit] = useState(false);
  const [fileInputs, setFileInputs] = useState({
    idFile: "",
    fileName: "",
    dateFile: "",
    iaPunctuation: "",
  });
  const [refresh, setRefresh] = useState(false);
  const [options, setOptions] = useState([{}]);
  const [selectedGroups, setSelectedGroups] = useState([{}]);
  const authPayload = useGetAuthPayload();
  const state = useSelector((appState) => appState);

  useEffect(() => {
    const fetchStudentFiles = async () => {
      try {
        const requestURL = `${API_BASE_URL}${MUESTRA_ARCHIVOS_URL}`; //`https://api.jsonserver.io/palala/student/1/getFiles`;
        const response = await fetch(requestURL, {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
            //"X-Jsio-Token": "4fc7f1d12d85bc37cf4d64295cda3e6a",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setStudentFiles(responseData);
          // id_archivo, nombre, fecha, grupos, id_archivo, puntuacion_ia, rutaArchivo
        } else {
          // Handle error
          console.error("Failed to fetch data");
        }
      } catch (error) {
        // Handle any other errors that might occur during the fetch
        console.error("An error occurred:", error);
      }
    };
    if (refresh) setRefresh(false);
    fetchStudentFiles();
  }, [refresh]);

  useEffect(() => {
    const fetchStudentGroups = async () => {
      const requestURL = `${API_BASE_URL}${MUESTRA_CLASES_ALUM_URL}/${authPayload.id}`;
      const response = await fetch(requestURL, {
        method: "GET",
        headers: {
          Authorization: state.authToken,
          "Content-Type": "application/json",
          //"X-Jsio-Token": "4fc7f1d12d85bc37cf4d64295cda3e6a",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        const options = responseData.map((item) => ({
          value: item.id_grupo,
          label: item.nombre_grupo,
        }));
        setOptions(options);
      } else {
        console.log("Error sending form data: ", response.status);
        const responseData = await response.json();
        console.log("Server says: " + responseData.message);
      }
    };

    fetchStudentGroups();
  }, []);

  useEffect(() => {
    if (isEditable === true) {
      setModal(
        <EditModal
          handleCancel={handleCloseOverlay}
          handleOperation={handleEditSubmit}
        >
          <div style={{ width: "30rem", margin: "2rem auto" }}>
            <div>
              <h3>Editar Nombre Archivo</h3>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
                fontSize: "1.3rem",
              }}
            >
              <label
                htmlFor="fileName"
                style={{ fontWeight: "bold", alignSelf: "flex-start" }}
              >
                Nombre de Archivo
              </label>
              <input
                type="text"
                name="fileName"
                placeholder="Nombre de Archivo"
                defaultValue={fileInputs.fileName}
                onChange={handleInputChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
                fontSize: "1.3rem",
              }}
            >
              <label
                htmlFor="fileName"
                style={{ fontWeight: "bold", alignSelf: "flex-start" }}
              >
                Grupos
              </label>
              <Select
                styles={{
                  menuList: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isFocused ? "#ffbe0a" : "white",
                  }),

                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isFocused ? "#ffbe0a" : "white",
                    color: state.isFocused ? "#000000" : "#000000",
                    backgroundColor: state.isSelected ? "#ffbe0a" : "white",
                    "&:hover": {
                      backgroundColor: "#ffbe0a",
                    },
                  }),
                  dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isFocused ? "#db270d" : "#fe5d41",
                    color: state.isFocused ? "#ffffff" : "#ffffff",
                  }),

                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    "&:hover": {
                      cursor: "pointer",
                    },
                    borderColor: state.isFocused ? "#ffbe0a" : "#fe5d41",
                  }),
                }}
                isMulti
                noOptionsMessage={() => "No existen grupos"}
                placeholder="Selecciona tus grupos..."
                isClearable={true}
                options={options}
                onChange={handleSelectChange}
                defaultValue={selectedGroups}
              />
            </div>
          </div>
        </EditModal>
      );
      setOverflow(true);
    }
  }, [isEditable]);

  useEffect(() => {
    const editFile = async () => {
      try {
        const requestURL = `${API_BASE_URL}${ACTUALIZAR_ARCHIVO_URL}`;
        const response = await fetch(requestURL, {
          method: "PUT",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_archivo: fileInputs.idFile,
            nombre_archivo: fileInputs.fileName,
            fecha_creacion: fileInputs.dateFile,
            puntuacion: fileInputs.iaPunctuation,
            id_grupos: selectedGroups.map((group) => group.value),
          }),
        });
        if (response.ok) {
          setModal(<OkModal handleNext={handleCloseOverlay} />);
          setRefresh(true);
        } else {
          console.error("Error del Servidor");
        }
      } catch (error) {
        console.error("Error al enviar al servidor: ", error);
      }
    };

    if (isEditSubmit) {
      editFile();
      setEditSubmit(false);
    }
  }, [isEditSubmit]);

  useEffect(() => {
    const deleteFile = async () => {
      try {
        const requestURL = `${API_BASE_URL}${ELIMINAR_ARCHIVO_URL}`;
        const response = await fetch(requestURL, {
          method: "DELETE",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_archivo: file,
          }),
        });
        if (response.ok) {
          setModal(<OkModal handleNext={handleCloseOverlay} />);
          setRefresh(true);
        } else {
          console.log("Error del Servidor");
        }
      } catch (error) {
        console.log("Error al enviar al servidor");
      }
    };
    if (isDeleteSubmit) deleteFile();
  }, [isDeleteSubmit]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedGroups(selectedOptions);
  };

  const handleFileDelete = (value) => {
    setModal(
      <DeleteModal
        handleCancel={handleCloseOverlay}
        handleOperation={handleDeleteSubmit}
      />
    );
    setFile(value);
    setOverflow(true);
  };

  const handleFileView = (idFile) => {
    setModal(<UserFileViewer idFile={idFile} />);
    setOverflow(true);
  };

  const handleFileEdit = (value, selectedGroups) => {
    setFile(studentFiles[value].id_archivo);
    setFileInputs({
      ...fileInputs,
      idFile: studentFiles[value].id_archivo,
      fileName: studentFiles[value].nombre_archivo,
      dateFile: studentFiles[value].fecha_creacion,
      iaPunctuation: studentFiles[value].puntuacion_ia,
    });
    setSelectedGroups(selectedGroups);
    setEditable(true);
  };

  const handleDeleteSubmit = () => {
    setDeleteSubmit(true);
    setOverflow(false);
  };

  const handleEditSubmit = () => {
    setEditSubmit(true);
    setEditable(false);
    setOverflow(false);
  };

  const handleCloseOverlay = () => {
    setFile();
    setEditable(false);
    setFileInputs({
      idFile: "",
      fileName: "",
      dateFile: "",
      iaPunctuation: "",
    });
    setOverflow(false);
  };

  const handleInputChange = (evt) => {
    setFileInputs((prevFileInputs) => ({
      ...prevFileInputs,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleAnimateNext = () => {
    if (animateIndex < studentFiles.length - 1) {
      setAnimateIndex(animateIndex + 1);
    }
  };
  return (
    <StyledStudentFiles>
      <AnimatePresence>
        {isOverflow && (
          <OverlayModal
            handleClose={handleCloseOverlay}
            topposition={window.scrollY}
          >
            {modal}
          </OverlayModal>
        )}
      </AnimatePresence>
      <div className="student-files-title">
        <AnimatePresence>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <h2>Tus Archivos</h2>
            <p>Estos son tus archivos</p>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <lord-icon
              src="https://cdn.lordicon.com/ckatldkn.json"
              trigger="loop"
              delay="5000"
              colors="primary:#646e78,secondary:#e8e230,tertiary:#ebe6ef"
              style={{ width: "10rem", height: "8rem" }}
            ></lord-icon>
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {studentFiles === null ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="student-loading-files"
          >
            <Loading loadingInfo={<p>Tus archivos se están cargando</p>} />
          </motion.div>
        ) : studentFiles.length === 0 ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              backgroundColor: "#EEEEEE",
              borderRadius: "3rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              margin: "0 auto",
              height: "70vh",
            }}
          >
            <div
              style={{
                width: "30rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="../assets/images/dibujos_lapiz_llorando.svg"
                style={{ maxWidth: "60%", maxHeight: "90%" }}
              ></img>
            </div>
            <h3>No tienes archivos guardados</h3>
          </motion.div>
        ) : (
          <motion.div className="student-files-list">
            <AnimatePresence>
              {studentFiles.map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={index <= animateIndex ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.05 }}
                    onAnimationComplete={handleAnimateNext}
                  >
                    <ClassCardFile
                      fileName={item.nombre_archivo}
                      dateFile={
                        new Date(item.fecha_creacion)
                          .toISOString()
                          .split("T")[0]
                      }
                      iaPunctuation={item.puntuacion_ia}
                      isEditable={true}
                      isDeletable={true}
                      isStudent={true}
                      handleDelete={() => handleFileDelete(item.id_archivo)}
                      handleEdit={() => handleFileEdit(index, item.grupos)}
                      handleView={() => handleFileView(item.id_archivo)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledStudentFiles>
  );
}

export default StudentFiles;
