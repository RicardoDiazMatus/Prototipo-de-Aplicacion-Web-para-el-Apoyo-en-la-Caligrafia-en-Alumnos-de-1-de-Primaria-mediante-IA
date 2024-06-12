import React, { useEffect, useState } from "react";
import { StyledSelectionClass } from "./SelectionClass.styled";
import SelectionClassHeader from "./SelectionClassHeader/SelectionClassHeader";
import ClassCard from "./ClassCard/ClassCard";
import { Link } from "react-router-dom";
import Loading from "../../Utils/Loading/Loading";
import { useSelector } from "react-redux";
import { useGetAuthPayload } from "../../../utils/hooks/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { API_BASE_URL, MUESTRA_CLASES_PROF_URL }  from "../../../utils/config";

function SelectionClass() {
  const [items, setItems] = useState(null);
  const [ascendingOrder, setAscendingOrder] = useState(false);
  const [sortingOption, setSortingOption] = useState("");
  const [isANewGroupAdded, setNewGroupAdded] = useState(false);

  const state = useSelector((appState) => appState);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const requestURL = `${API_BASE_URL}${MUESTRA_CLASES_PROF_URL}`;
        const response = await fetch(requestURL, {
          method: "GET",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          setItems(responseData);
          console.log(responseData);
        } else {
          console.log("Error: ", response.status);
        }
      } catch (error) {}
    };

    getGroups();
    setNewGroupAdded(false);
  }, [isANewGroupAdded]);

  const handleAddedClass = () => {
    setNewGroupAdded(true);
  };

  useEffect(() => {
    const sortItems = () => {
      let sortedItems = [...items];

      if (sortingOption === "name") {
        if (ascendingOrder) {
          sortedItems.sort((a, b) =>
            a.nombre_grupo.localeCompare(b.nombre_grupo)
          );
        } else {
          sortedItems.sort((a, b) =>
            b.nombre_grupo.localeCompare(a.nombre_grupo)
          );
        }
      } else if (sortingOption === "students") {
        sortedItems.sort((a, b) =>
          ascendingOrder
            ? a.num_estudiantes - b.num_estudiantes
            : b.num_estudiantes - a.num_estudiantes
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
    if (items !== null) sortItems();
  }, [sortingOption, ascendingOrder]);

  const handleAscDescOption = (value) => {
    setAscendingOrder(value);
  };

  const handleSortingOption = (value) => {
    setSortingOption(value);
  };

  return (
    <StyledSelectionClass>
      <SelectionClassHeader
        handleAscDescOption={handleAscDescOption}
        handleSortingOption={handleSortingOption}
        handleAddedClass={handleAddedClass}
      />
      <AnimatePresence>
        <motion.div className="selectionclass-items">
          {items !== null ? (
            items.length === 0 ? (
              <motion.div
                className="selectionclass-items-nofiles"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div>
                  <img src="./assets/images/dibujos_lapiz_llorando.svg"></img>
                </div>
                <h2>No tienes grupos generados aún.</h2>
              </motion.div>
            ) : (
              items.map((item) => {
                return (
                  <ClassCard
                    key={item.id_grupo}
                    id={item.id_grupo}
                    groupName={item.nombre_grupo}
                    numberOfFiles={item.numero_archivos}
                    creationDate={
                      new Date(item.fecha_creacion).toISOString().split("T")[0]
                    }
                    code={item.codigo_grupo}
                    numStudents={item.num_estudiantes}
                    colourGroup={item.color_grupo}
                    isStudent={false}
                  />
                );
              })
            )
          ) : (
            <div
              style={{
                alignSelf: "center",
                width: "90%",
                margin: "0 auto",
                height: "70%",
                gridColumn: "1 / 4",
              }}
            >
              <Loading loadingInfo={<h3>Tus clases se están cargando</h3>} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </StyledSelectionClass>
  );
}

export default SelectionClass;
