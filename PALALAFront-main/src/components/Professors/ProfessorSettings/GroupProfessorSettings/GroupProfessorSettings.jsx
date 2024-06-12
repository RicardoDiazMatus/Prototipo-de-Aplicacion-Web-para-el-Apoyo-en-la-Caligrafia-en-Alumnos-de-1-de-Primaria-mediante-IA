import React, { useEffect, useState } from "react";
import {
  StyledGroupProfessorSettings,
  THEME,
} from "./GroupProfessorSettings.styled";
import ButtonSubmit from "../../../Utils/ButtonSubmit/ButtonSubmit";
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
import Select from "react-select";
import { AnimatePresence, motion } from "framer-motion";

import {
  useRowSelect,
  SelectTypes,
} from "@table-library/react-table-library/select";
import OverlayModal from "../../../Utils/OverlayModal/OverlayModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../Utils/Loading/Loading";
import { useSelector } from "react-redux";
import { ACTUALIZAR_NOMBRE_GRUPO_URL, API_BASE_URL, ELIMINAR_GRUPO_URL, MUESTRA_CLASES_PROF_URL } from "../../../../utils/config";
 

function GroupProfessorSettings() {
  const [groupData, setGroupData] = useState({ nodes: [] }); // Initialize as an empty array
  const [displayGroupData, setDisplayGroupData] = useState({ nodes: [] });
  const [options, setOptions] = useState([
    { value: "nombre_grupo", label: "Nombre" },
    { value: "fecha_grupo", label: "Fecha" },
    { value: "codigo_grupo", label: "Código" },
  ]);
  const [groupSearch, setGroupSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [isOverflow, setOverflow] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("");
  const [studentData, setStudentData] = useState({ nodes: [] });
  const [displayStudentData, setDisplayStudentData] = useState({ nodes: [] });
  const [rechargeGroups, setRechargeGroups] = useState(false);
  const [isPetitionInProcess, setPetitionInProcess] = useState(true);
  const state = useSelector((appState) => appState);

  console.log(inputValues);

  //Fetch
  //GET Groups
  useEffect(() => {
    const fetchGroupFromProfessor = async () => {
      try {
        const requestURL = `${API_BASE_URL}${MUESTRA_CLASES_PROF_URL}`;
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
          console.log(responseData);
          const newFormattedResponseData = responseData.map((item) => {
            return {
              ...item,
              id: item.id_grupo,
            };
          });
          setGroupData({ nodes: newFormattedResponseData });
          setPetitionInProcess(false)
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
          console.log("Server says: " + responseData);
        }
      } catch (error) {
        console.log("Error while sending data: ", error);
      }
    };
    if (rechargeGroups) {
      setRechargeGroups(false);
    }

    fetchGroupFromProfessor();
  }, [rechargeGroups]);

  //DELETE Group
  const handleDeleteGroup = (idGroup) => {
    setPetitionInProcess(true);
    const fetchDeleteGroup = async () => {
      try {
        const requestURL = `${API_BASE_URL}${ELIMINAR_GRUPO_URL}`;
        const response = await fetch(requestURL, {
          method: "DELETE",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_grupo: idGroup,
          }),
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setRechargeGroups(true);
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
          console.log("Server says: " + responseData);
        }
      } catch (error) {
        console.log("Error al enviar: " + error);
      }
    };

    fetchDeleteGroup();
  };

  const handleEditPetition = (idGroup, nameGroup) => {
    setPetitionInProcess(true);
    const fetchEditGroup = async () => {
      try {
        const requestURL =
          `${API_BASE_URL}${ACTUALIZAR_NOMBRE_GRUPO_URL}`;
        const response = await fetch(requestURL, {
          method: "PUT",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_grupo: idGroup,
            nombre_grupo: nameGroup,
          }),
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setRechargeGroups(true);
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
          console.log("Server says: " + responseData);
        }
      } catch (error) {
        console.log("Error al enviar: " + error);
      }
    };

    fetchEditGroup();
  };

  useEffect(() => {
    const filteredNodes = studentData.nodes.filter((item) =>
      item.nombre_estudiante.toLowerCase().includes(studentSearch.toLowerCase())
    );

    setDisplayStudentData({ nodes: filteredNodes });
  }, [studentSearch, studentData]);

  useEffect(() => {
    let filteredNodes = [];
    if (categorySearch === "fecha_grupo")
      filteredNodes = groupData.nodes.filter((item) =>
        item.fecha_grupo.toLowerCase().includes(groupSearch.toLowerCase())
      );
    else if (categorySearch === "codigo_grupo")
      filteredNodes = groupData.nodes.filter((item) =>
        item.codigo_grupo.toLowerCase().includes(groupSearch.toLowerCase())
      );
    else {
      filteredNodes = groupData.nodes.filter((item) =>
        item.nombre_grupo.toLowerCase().includes(groupSearch.toLowerCase())
      );
    }
    setDisplayGroupData({ nodes: filteredNodes });
  }, [groupSearch, groupData, categorySearch]);

  useEffect(() => {
    if (activeGroup === "") {
      return;
    }
    const fetchStudents = async () => {
      try {
        const requestURL = `https://api.jsonserver.io/palala/group/${activeGroup}/getstudents`;
        const response = await fetch(requestURL, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "X-Jsio-Token": "4fc7f1d12d85bc37cf4d64295cda3e6a",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setStudentData({ nodes: responseData });
          // Do something with the data, e.g., update state
        } else {
          // Handle error
          console.error("Failed to fetch data");
        }
      } catch (error) {
        // Handle any other errors that might occur during the fetch
        console.error("An error occurred:", error);
      }
    };

    fetchStudents();
  }, [activeGroup]);

  const InputVariablesAnimation = {
    notEditable: {
      opacity: 1, // Include opacity property here
      backgroundColor: "#ffffff",

      borderRadius: "0rem",
    },
    editable: {
      opacity: 1, // Include opacity property here as well
      backgroundColor: "#ffefec",
      borderRadius: "0.6rem",
    },
  };

  const StylesButtonEditable = {
    borderRadius: "0.5rem",
    fontSize: "1.2rem",
    width: "8rem",
    height: "3.5rem",
    backgroundColor: "#c1e1d8",
    color: "#033d2e",
    border: "#033d2e solid 0.1rem",
    hoverColor: "#ffffff",
    hoverBackgroundColor: "#033d2e",
  };

  const StylesButtonStudents = {
    borderRadius: "0.5rem",
    fontSize: "1.2rem",
    width: "8rem",
    height: "3.5rem",
    backgroundColor: "#ffefec",
    color: "#fe5d41",
    border: "#fe5d41 solid 0.1rem",
    hoverColor: "#ffffff",
    hoverBackgroundColor: "#fe5d41",
  };

  const StylesButtonReady = {
    borderRadius: "0.5rem",
    fontSize: "1.2rem",
    width: "8rem",
    height: "3.5rem",
    backgroundColor: "#bdd6fe",
    color: "#0243ac",
    border: "#0243ac solid 0.1rem",
    hoverColor: "#ffffff",
    hoverBackgroundColor: "#0243ac",
  };

  const StylesButtonCancel = {
    borderRadius: "0.5rem",
    fontSize: "1.2rem",
    width: "8rem",
    height: "3.5rem",
    backgroundColor: "#fce7f3",
    color: "#970a58",
    border: "#970a58 solid 0.1rem",
    hoverColor: "#ffffff",
    hoverBackgroundColor: "#970a58",
  };

  const sort = useSort(
    displayGroupData,
    {},
    {
      sortFns: {
        NOMBRE_GRUPO: (array) =>
          array.sort((a, b) => a.nombre_grupo.localeCompare(b.nombre_grupo)),
        DATE: (array) => array.sort((a, b) => a.fecha_grupo - b.fecha_grupo),
      },
    }
  );

  const studentSort = useSort(
    displayStudentData,
    {},
    {
      sortFns: {
        NOMBRE_ESTUDIANTE: (array) =>
          array.sort((a, b) =>
            a.nombre_estudiante.localeCompare(b.nombre_estudiante)
          ),
      },
    }
  );

  const theme = useTheme(THEME);

  const select = useRowSelect(
    displayGroupData,
    {
      selectType: SelectTypes.SINGLE,
    },
    {}
  );

  const handleResetInput = (id) => {
    // Reset the input value to its original value
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: groupData.nodes.find((item) => item.id === id).nombre_grupo,
    }));
  };

  const handleInputChange = (e, id) => {
    // Update the input values in the state
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: e.target.value,
    }));
  };

  const handleGroupSearch = (event) => {
    setGroupSearch(event.target.value);
  };

  const handleStudentSearch = (event) => {
    setStudentSearch(event.target.value);
  };

  const handleCategorySearch = (value) => {
    setCategorySearch(value);
  };

  const handleEditable = (value) => {
    setIsEditable(value);
  };

  const handleVisualizeStudents = (value) => {
    setActiveGroup(value);
  };

  return (
    <StyledGroupProfessorSettings>
      <AnimatePresence>
        {isOverflow && <OverlayModal></OverlayModal>}
      </AnimatePresence>

      <div className="settings-professor-container">
        <div className="element-professor-container">
          <div className="settings-table-title">
            <h2>Grupos</h2>
          </div>
          <div className="group-container">
            <div className="table-options">
              <div>
                <h3>¿Qué es lo que buscas?</h3>
                <input
                  type="text"
                  className="group-table-input"
                  onChange={handleGroupSearch}
                />
              </div>
              <div>
                <h3>¿En qué categoría?</h3>
                <Select
                  options={options}
                  className="group-table-select"
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
            </div>
            <div className="group-table">
              {isPetitionInProcess ? (
                <Loading loadingInfo={<p>{groupData.nodes.length === 0 ? ("Cargando Grupos") : ("Procesando Petición")}</p>} />
              ) : (
                <Table
                  data={displayGroupData}
                  select={select}
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
                          <HeaderCellSort sortKey="DATE">Fecha</HeaderCellSort>
                          <HeaderCell>Código</HeaderCell>
                        </HeaderRow>
                      </Header>
                      <Body>
                        {tableList.map((item) => (
                          <>
                            <Row key={item.id} item={item}>
                              <Cell>{item.nombre_grupo}</Cell>
                              <Cell>
                                {
                                  new Date(item.fecha_creacion)
                                    .toISOString()
                                    .split("T")[0]
                                }
                              </Cell>
                              <Cell>{item.codigo_grupo}</Cell>
                            </Row>
                            <AnimatePresence>
                              {select.state.id === item.id && (
                                <motion.div
                                  className="group-table-expanded"
                                  initial={{ height: 0, x: 0, y: -10 }}
                                  animate={{
                                    height: "auto",
                                    padding: "2rem",
                                    x: 0,
                                    y: 0,
                                  }}
                                  key={item.id}
                                  exit={{
                                    opacity: 0,
                                    height: 0,
                                    padding: "0rem",
                                  }}
                                >
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <p>Nombre:</p>

                                    <motion.input
                                      animate={
                                        isEditable ? "editable" : "notEditable"
                                      }
                                      variants={InputVariablesAnimation}
                                      style={{
                                        boxShadow: isEditable
                                          ? "inset 0px 0px 10px -5px rgba(0, 0, 0, 0.5)"
                                          : "none",
                                        border: isEditable
                                          ? "0.1rem solid rgba(254, 93, 65, 1)"
                                          : "none",
                                        borderBottom: isEditable
                                          ? "0.1rem solid rgba(254, 93, 65, 1)"
                                          : "0.3rem solid #fe5d41",
                                      }}
                                      //whileTap={{ scale: 1.1 }}
                                      type="text"
                                      name="name"
                                      id="name"
                                      value={
                                        inputValues[item.id] === null ||
                                        inputValues[item.id] === undefined
                                          ? item.nombre_grupo
                                          : inputValues[item.id]
                                      }
                                      onChange={(e) =>
                                        handleInputChange(e, item.id)
                                      }
                                      disabled={!isEditable}
                                    />
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <p>Fecha Creación:</p>
                                    <span>
                                      {
                                        new Date(item.fecha_creacion)
                                          .toISOString()
                                          .split("T")[0]
                                      }
                                    </span>
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <p>Código:</p>
                                    <span>{item.codigo_grupo}</span>
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <p>Estudiantes:</p>
                                    <span>{item.num_estudiantes}</span>
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <p>Archivos:</p>
                                    <span>{item.numero_archivos}</span>
                                  </motion.div>
                                  <motion.div
                                    className="group-table-expanded-buttons"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <AnimatePresence>
                                      {!isEditable && (
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1, rotateY: 360 }}
                                          exit={{ opacity: 0 }}
                                        >
                                          <ButtonSubmit
                                            label={"Eliminar"}
                                            styles={StylesButtonStudents}
                                            onClick={() =>
                                              handleDeleteGroup(item.id)
                                            }
                                          />
                                          <ButtonSubmit
                                            label={"Editar"}
                                            styles={StylesButtonEditable}
                                            onClick={() => handleEditable(true)}
                                          />
                                          <ButtonSubmit
                                            label={"Ver Estudiantes"}
                                            styles={StylesButtonStudents}
                                            onClick={() =>
                                              handleVisualizeStudents(item.id)
                                            }
                                          />
                                        </motion.div>
                                      )}

                                      {isEditable && (
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                        >
                                          <ButtonSubmit
                                            label={"Cancelar"}
                                            styles={StylesButtonCancel}
                                            onClick={() => {
                                              handleEditable(false);
                                              handleResetInput(item.id);
                                            }}
                                          />
                                          <ButtonSubmit
                                            label={"Listo"}
                                            styles={StylesButtonReady}
                                            onClick={() => {
                                              handleEditPetition(item.id, inputValues[item.id] || item.nombre_grupo);
                                              handleEditable(false);
                                            }}
                                          />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </motion.div>
                                </motion.div>
                              )}
                            </AnimatePresence>
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
        {activeGroup && (
          <div className="element-professor-container student-element">
            <div className="settings-table-title">
              <h2>Estudiantes</h2>
            </div>
            <div className="student-container">
              <div className="table-options">
                <div style={{ gridColumn: "1 / end" }}>
                  <h3>¿Qué es lo que buscas?</h3>
                  <input
                    type="text"
                    className="group-table-input"
                    onChange={handleStudentSearch}
                  />
                </div>
              </div>
              <div className="student-table">
                <Table
                  data={displayStudentData}
                  theme={theme}
                  sort={studentSort}
                  layout={{ fixedHeader: true }}
                >
                  {(tableList) => (
                    <>
                      <Header>
                        <HeaderRow>
                          <HeaderCellSort sortKey="NOMBRE_ESTUDIANTE">
                            Nombre
                          </HeaderCellSort>
                          <HeaderCell></HeaderCell>
                        </HeaderRow>
                      </Header>
                      <Body>
                        {tableList.map((item) => (
                          <Row>
                            <Cell>{item.nombre_estudiante}</Cell>
                            <Cell>
                              <ButtonSubmit
                                label={<FontAwesomeIcon icon={faTrash} />}
                                styles={{ width: "4rem", height: "3rem" }}
                              />
                            </Cell>
                          </Row>
                        ))}
                      </Body>
                    </>
                  )}
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledGroupProfessorSettings>
  );
}

export default GroupProfessorSettings;
