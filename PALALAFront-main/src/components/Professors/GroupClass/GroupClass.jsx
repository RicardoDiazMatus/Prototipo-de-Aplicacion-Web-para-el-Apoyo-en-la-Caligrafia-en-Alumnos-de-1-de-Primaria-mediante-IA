import React, { useEffect, useState } from "react";
import { StyledGroupClass } from "./GroupClass.styled";
import { useParams } from "react-router-dom";
import GroupClassHeader from "./GroupClassHeader/GroupClassHeader";
import ClassCardFile from "./ClassCardFile/ClassCardFile";
import { AnimatePresence } from "framer-motion";
import OverlayModal from "../../Utils/OverlayModal/OverlayModal";
import DeleteModal from "../../Utils/DeleteModal/DeleteModal";
import Loading from "../../Utils/Loading/Loading";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import UserFileViewer from "../../Utils/UserFileViewer/UserFileViewer";
import { API_BASE_URL, MUESTRA_ARCHIVOS_GRUPO_URL } from "../../../utils/config";
 

function GroupClass() {
  const { classID } = useParams();
  const [modal, setModal] = useState();
  const [inmutableItems, setInmutableItems] = useState(null);
  const [items, setItems] = useState(null);
  const [ascendingOrder, setAscendingOrder] = useState(false);
  const [sortingOption, setSortingOption] = useState("");
  const [studentName, setStudentName] = useState("");
  const [isOverflow, setOverflow] = useState(false);
  const [isDeleteSubmit, setDeleteSubmit] = useState(false);
  const [file, setFile] = useState();
  const state = useSelector((appState) => appState);

  useEffect(() => {
    const fetchFilesByGroupId = async () => {
      try {
        const requestURL = `${API_BASE_URL}${MUESTRA_ARCHIVOS_GRUPO_URL}`;
        const response = await fetch(requestURL, {
          method: "POST",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_grupo: classID,
          }),
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setInmutableItems(responseData);
          setItems(responseData);
        } else {
          const responseError = await response.json();
          console.log("Error del server", responseError.message);
        }
      } catch (error) {
        console.log("Error al enviar", error);
      }
    };

    fetchFilesByGroupId();
  }, []);

  useEffect(() => {
    const filterByStudentName = () => {
      let filteredItems = [...inmutableItems];
      if (studentName !== "") {
        filteredItems = filteredItems.filter(
          (item) => item.nombre_estudiante === studentName
        );
      }
      setItems(filteredItems);
    };
    if (inmutableItems !== null) {
      filterByStudentName();
    }
  }, [studentName]);

  useEffect(() => {
    const sortItems = () => {
      let sortedItems = [...items];

      if (sortingOption === "name") {
        if (ascendingOrder) {
          sortedItems.sort((a, b) =>
            a.nombre_archivo.localeCompare(b.nombre_archivo)
          );
        } else {
          sortedItems.sort((a, b) =>
            b.nombre_archivo.localeCompare(a.nombre_archivo)
          );
        }
      } else if (sortingOption === "iaPunctuation") {
        sortedItems.sort((a, b) =>
          ascendingOrder
            ? a.puntuacion - b.puntuacion
            : b.puntuacion - a.puntuacion
        );
      } else if (sortingOption === "date") {
        sortedItems.sort((a, b) => {
          const dateA = new Date(a.fecha_creacion);
          const dateB = new Date(b.fecha_creacion);
          return ascendingOrder ? dateA - dateB : dateB - dateA;
        });
      }
      setItems(sortedItems);
    };
    if (items !== null) {
      sortItems();
    }
  }, [sortingOption, ascendingOrder]);

  const handleAscDescOption = (value) => {
    setAscendingOrder(value);
  };

  const handleStudentNameOption = (value) => {
    console.log(value);
    setStudentName(value);
  };

  const handleSortingOption = (value) => {
    setSortingOption(value);
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

  const handleDeleteSubmit = () => {
    setDeleteSubmit(true);
    setOverflow(false);
  };

  const handleCloseOverlay = () => {
    setFile();
    setOverflow(false);
  };

  const handleView = (idFile) => {
    console.log("IdFile: ", idFile);
    setModal(<UserFileViewer idFile={idFile}/>)
    setOverflow(true);
  }

  return (
    <StyledGroupClass>
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

      {items !== null ? (
        items.length === 0 ? (
          <motion.div
            className="selectionclass-items-nofiles"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              backgroundColor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              margin: "4rem auto 0 auto",
              borderRadius: "2rem",
              height: "80%",
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
                src="../../assets/images/dibujos_lapiz_llorando.svg"
                style={{ maxWidth: "60%", maxHeight: "90%" }}
                alt="Illustration of a crying pencil"
              />
            </div>
            <h3>No hay archivos en el grupo</h3>
          </motion.div>
        ) : (
          <>
            <GroupClassHeader
              handleAscDescOption={handleAscDescOption}
              handleSortingOption={handleSortingOption}
              handleStudentNameOption={handleStudentNameOption}
              studentNames={[
                ...new Set(items.map((item) => item.nombre_estudiante)),
              ]}
            />

            <motion.div
              variants={{
                hidden: { opacity: 1 },
                show: { opacity: 1, transition: { staggerChildren: 0.2 } },
              }}
              initial="hidden"
              animate="show"
              className="groupclass-items"
            >
              {items.map((item) => (
                <motion.div
                  key={item.id_archivo}
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                >
                  <ClassCardFile
                    id={item.id_archivo}
                    studentName={item.nombre_estudiante}
                    fileName={item.nombre_archivo}
                    dateFile={
                      new Date(item.fecha_creacion).toISOString().split("T")[0]
                    }
                    professorPunctuation={item.puntuacion}
                    iaPunctuation={item.puntuacion}
                    isStudent={false}
                    isEditable={false}
                    isDeletable={false}
                    handleView={() => {handleView(item.id_archivo)}}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )
      ) : (
        <div
          style={{
            width: "90%",
            height: "90%",
            alignSelf: "center",
            marginTop: "4rem",
          }}
        >
          <Loading
            loadingInfo={<h3>Se están cargando los archivos del grupo</h3>}
          />
        </div>
      )}
    </StyledGroupClass>
  );
}

export default GroupClass;
