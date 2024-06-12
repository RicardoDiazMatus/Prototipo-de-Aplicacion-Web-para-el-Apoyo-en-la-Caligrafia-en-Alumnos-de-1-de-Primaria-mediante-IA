import React, { useEffect, useState } from "react";
import {
  StyledGroupStudentSettings,
  THEME,
} from "./GroupStudentSettings.styled";
import Select from "react-select";
import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from "@table-library/react-table-library";
import {
  useSort,
  HeaderCellSort,
} from "@table-library/react-table-library/sort";
import { useTheme } from "@table-library/react-table-library/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonSubmit from "../../../Utils/ButtonSubmit/ButtonSubmit";
import {
  faChalkboardTeacher,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import OverlayModal from "../../../Utils/OverlayModal/OverlayModal";
import { AnimatePresence } from "framer-motion";
import DeleteModal from "../../../Utils/DeleteModal/DeleteModal";
import Loading from "../../../Utils/Loading/Loading";
import { useGetAuthPayload } from "../../../../utils/hooks/hooks";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import styled from "styled-components";
import AddGroupStudent from "./AddGroupStudent/AddGroupStudent";
import OkModal from "../../../Utils/OkModal/OkModal";
import { API_BASE_URL, MUESTRA_CLASES_ALUM_URL, SALIR_CLASE_URL } from "../../../../utils/config";

function GroupStudentSettings() {
  const [isOverflow, setOverflow] = useState(false);
  const [modal, setModal] = useState();
  const [items, setItems] = useState({ nodes: [] });
  const [visibleItems, setVisibleItems] = useState({ nodes: [] });
  const [isItemsReady, setItemsReady] = useState(false);
  const [rechargeItems, setRechargeItems] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");
  const [options, setOptions] = useState([
    { value: "nombre_grupo", label: "Nombre" },
    { value: "profesor_grupo", label: "Profesor" },
  ]);

  const [selectedGroup, setSelectedGroup] = useState();
  const [isDeleteSubmit, setDeleteSubmit] = useState(false);

  const authPayload = useGetAuthPayload();
  const state = useSelector((appState) => appState);
  useEffect(() => {
    const fetchStudentGroups = async () => {
      try {
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
          setItems({ nodes: responseData });
          setItemsReady(true);
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
          console.log("Server says: " + responseData.message);
        }
      } catch (error) {
        console.log("Error while sending data: ", error);
      }
    };
    if(rechargeItems){
      setRechargeItems(false);
    }
    fetchStudentGroups();
  }, [rechargeItems]);

  useEffect(() => {
    const fetchDeleteGroup = async () => {
      try {
        const requestURL = `${API_BASE_URL}${SALIR_CLASE_URL}`;
        const response = await fetch(requestURL, {
          method: "DELETE",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_grupo: selectedGroup,
          }),
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log("Server says: ", responseData);
          setRechargeItems(true);
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
          console.log("Server says: " + responseData);
        }
      } catch (error) {
        console.log("Error while sending data: ", error);
      }
    };
    if (isDeleteSubmit === true) {
      fetchDeleteGroup();
      setDeleteSubmit(false);
      setSelectedGroup();
    }
  }, [isDeleteSubmit]);

  
  useEffect(() => {
    let filteredNodes = [];
    if (categorySearch === "profesor_grupo")
      filteredNodes = items.nodes.filter((item) =>
        item.fecha_grupo.toLowerCase().includes(groupSearch.toLowerCase())
      );
    else {
      filteredNodes = items.nodes.filter((item) =>
        item.nombre_grupo.toLowerCase().includes(groupSearch.toLowerCase())
      );
    }
    setVisibleItems({ nodes: filteredNodes });
  }, [categorySearch, groupSearch, items]);

  const sort = useSort(
    visibleItems,
    {},
    {
      sortFns: {
        NOMBRE_GRUPO: (array) =>
          array.sort((a, b) => a.nombre_grupo.localeCompare(b.nombre_grupo)),
        NOMBRE_PROFESOR: (array) =>
          array.sort((a, b) => a.nombre_grupo.localeCompare(b.nombre_grupo)),
      },
    }
  );

  const theme = useTheme(THEME);

    const handleAddResult = (resultValue) => {
      if(resultValue){
        setModal(<OkModal handleNext={handleCloseOverlay}/>)
        setRechargeItems(true);
      }
    }

  const handleAddGroup = () => {
    setModal(<AddGroupStudent handleCancel={handleCloseOverlay} handleResult={handleAddResult} />);
    setOverflow(true);
  };

  const handleGroupSearch = (event) => {
    setGroupSearch(event.target.value);
  };

  const handleCategorySearch = (value) => {
    setCategorySearch(value);
  };

  const handleExitGroupButton = (value) => {
    setModal(
      <DeleteModal
        handleCancel={handleCloseOverlay}
        handleOperation={handleDeleteSubmit}
      />
    );
    setSelectedGroup(value);
    setOverflow(true);
  };

  const handleCloseOverlay = () => {
    setModal();
    setSelectedGroup();
    setOverflow(false);
  };

  const handleDeleteSubmit = () => {
    setDeleteSubmit(true);
    setOverflow(false);
  };
  return (
    <StyledGroupStudentSettings>
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
      <div className="settings-student-container">
        <div className="settings-table-title">
          <h2>Grupo Inscritos</h2>
        </div>
        <div className="group-container">
          <div className="group-options">
            <div>
              <h3>¿Qué es lo que buscas?</h3>
              <input
                type="text"
                className="group-input"
                onChange={handleGroupSearch}
              />
            </div>
            <div>
              <h3>¿En qué categoría?</h3>
              <Select
                options={options}
                className="group-select"
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
                  }),
                  dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isFocused ? "#db270d" : "#fe5d41",
                    color: "#ffffff",
                  }),

                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "#ffbe0a" : "#fe5d41",
                  }),
                }}
                noOptionsMessage={() => "No existe categoría"}
                placeholder="Categoría"
                defaultValue={options[0]}
                isClearable={false}
                onChange={(selectedOption) =>
                  handleCategorySearch(selectedOption.value)
                }
              />
            </div>
            <div>
              <ButtonSubmit
                label={"Agregar Grupo"}
                styles={{ borderRadius: "1rem", width: "32rem" }}
                onClick={handleAddGroup}
              />
            </div>
          </div>
          <div className="group-table">
            {!isItemsReady ? (
              <Loading loadingInfo={<p>Cargando Grupos</p>} />
            ) : items.nodes.length === 0 ? (
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
                  margin: "0 auto",
                  height: "80%"
                }}
              >
                <div style={{width: "30rem", display: "flex", justifyContent: "center"}}>
                  <img src="../assets/images/dibujos_lapiz_llorando.svg"
                    style={{maxWidth: "60%", maxHeight: "90%"}}
                  ></img>
                </div>
                <h3>No estás inscritos en algún grupo</h3>
              </motion.div>
            ) : (
              <Table
                data={visibleItems}
                sort={sort}
                theme={theme}
                layout={{ fixedHeader: true }}
              >
                {(tableList) => (
                  <>
                    <Header>
                      <HeaderRow>
                        <HeaderCellSort sortKey="NOMBRE_GRUPO">
                          Nombre
                        </HeaderCellSort>
                        <HeaderCellSort sortKey="NOMBRE_PROFESOR">
                          Profesor
                        </HeaderCellSort>
                        <HeaderCell></HeaderCell>
                      </HeaderRow>
                    </Header>
                    <Body>
                      {tableList.map((item) => (
                        <>
                          <Row key={item.id_grupo} item={item}>
                            <Cell>{item.nombre_grupo}</Cell>
                            <Cell>{`${item.nombre_profesor} ${item.apellido_paterno_profesor} ${item.apellido_materno_profesor}`}</Cell>
                            <Cell style={{ textAlign: "center" }}>
                              <ButtonSubmit
                                label={<FontAwesomeIcon icon={faDoorOpen} />}
                                styles={{
                                  width: "3rem",
                                  height: "3rem",
                                  borderRadius: "0.5rem",
                                }}
                                onClick={() => handleExitGroupButton(item.id_grupo)}
                              />
                            </Cell>
                          </Row>
                        </>
                      ))}
                    </Body>
                  </>
                )}
              </Table>
            )}
          </div>
        </div>
      </div>
    </StyledGroupStudentSettings>
  );
}

export default GroupStudentSettings;
