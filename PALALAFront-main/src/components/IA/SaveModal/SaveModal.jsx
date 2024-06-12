import React, { useEffect, useState } from "react";
import { StyledSaveModal } from "./SaveModal.styled";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import ButtonSubmit from "../../Utils/ButtonSubmit/ButtonSubmit";
import { useGetAuthPayload } from "../../../utils/hooks/hooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, GUARDAR_ARCHIVO_URL, MUESTRA_CLASES_ALUM_URL } from "../../../utils/config";

function SaveModal({ serverImageName, image, punctuation, handleClose}) {
  const [rechargeItems, setRechargeItems] = useState(false);
  const [groups, setGroups] = useState([]);
  const [options, setOptions] = useState([]);
  const [fileName, setFileName] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [errors, setErrors] = useState({});
  const [codeErrors, setCodeErrors] = useState({});
  const [codeSubmitting, setCodeSubmitting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const authPayload = useGetAuthPayload();
  const state = useSelector((appState) => appState);
  const navigate = useNavigate();
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
          const options = responseData.map((item) => ({
            value: item.id_grupo,
            label: item.nombre_grupo,
          }));
          setOptions(options);
          setGroups(responseData);
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
          console.log("Server says: " + responseData.message);
        }
      } catch (error) {
        console.log("Error while sending data: ", error);
      }
    };
    if (rechargeItems) {
      setRechargeItems(false);
    }
    fetchStudentGroups();
  }, [rechargeItems]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      saveFile();
    }
  }, [errors, submitting]);

  useEffect(() => {
    if (Object.keys(codeErrors).length === 0 && codeSubmitting) {
      addGroup();
    }
  }, [codeErrors, codeSubmitting]);

  const validateInputs = (fileName) => {
    let errors = {};
    if (fileName.length === 0) {
      errors.nameLength = "El nombre no puede estar vacío";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInputs(fileName));
    setSubmitting(true);
  };

  const validateCode = (codeInput) => {
    let errors = {};
    if (codeInput.length < 10 || codeInput.length > 10) {
      errors.codeLength = "El código debe ser de 10 caracteres";
    }

    return errors;
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setCodeErrors(validateCode(codeInput));
    setCodeSubmitting(true);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedGroups(selectedOptions);
  };

  const handleNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCodeInput(e.target.value);
  };

  const saveFile = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("image", blob, "image.png");
      console.log(`SN: ${serverImageName}`);
      console.log(`FN: ${fileName}`);
      console.log(`ID: ${selectedGroups.map(groups => groups.value)}`);
      console.log(`P: ${punctuation}`);
      const dataJSON = {
        nombre_original: serverImageName,
        nombre_archivo: fileName,
        id_grupos: selectedGroups.map(groups => groups.value),
        puntuacion: punctuation
      };
      formData.append("dataJSON", JSON.stringify(dataJSON));

      const requestURL = `${API_BASE_URL}${GUARDAR_ARCHIVO_URL}`;
      const serverResponse = await fetch(requestURL, {
        method: "POST",
        headers: {
          Authorization: state.authToken,
        },
        body: formData,
      });
      if (serverResponse.ok) {
        const responseData = await serverResponse.json();
        navigate("/Student/Files")
        
      } else {
        console.error("Error del servidor");
        const responseData = await serverResponse.json();
        setErrors({ serverError: responseData.message });
        //console.log("Server dice: ", response.status);
      }
    } catch (error) {
      console.error("Error al enviar al servidor");
      console.log(error);
      setErrors({ sendError: "Error al enviar datos al servidor" });
    }
  };

  const addGroup = async () => {
    try {
      const requestURL = `${API_BASE_URL}/inscribir-clase`;
      const response = await fetch(requestURL, {
        method: "POST",
        headers: {
          Authorization: state.authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo_grupo: codeInput,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        setErrors({});
        setRechargeItems(true);
      } else {
        console.error("Error del servidor");
        const responseData = await response.json();
        setCodeErrors({ serverError: responseData.message });
        //console.log("Server dice: ", response.status);
      }
    } catch (error) {
      console.error("Error al enviar al servidor");
      setCodeErrors({ sendError: "Error al enviar datos al servidor" });
    }
  };

  return (
    <StyledSaveModal>
      <motion.div className="save-modal-title">
        <FontAwesomeIcon icon={faSave} className="icon" />
        <h3>Guardar Archivo</h3>
      </motion.div>
      <motion.div className="save-modal-name">
        <input
          type="text"
          placeholder="Nombre del Archivo"
          style={{ margin: "1rem 0" }}
          name="fileNameInput"
          value={fileName}
          onChange={handleNameChange}
        />
      </motion.div>
      <motion.div className="save-modal-groups">
        <motion.div className="groups-select">
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
            value={selectedGroups}
          />
        </motion.div>
        <motion.div className="groups-add">
          <input
            type="text"
            placeholder="Código del Grupo"
            style={{ margin: "1rem 0" }}
            name="codeInput"
            value={codeInput}
            onChange={handleCodeChange}
          />
          <ButtonSubmit
            label={"Agregar Grupo"}
            styles={{ height: "3rem", fontSize: "1.3rem" }}
            onClick={handleCodeSubmit}
          />
          <motion.div>
            {codeErrors &&
              Object.keys(codeErrors).map((items) => (
                <motion.div>
                  <motion.p
                    initial={{ x: -40, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      color: "red",
                    }}
                    exit={{ opacity: 0 }}
                    style={{ fontSize: "1rem", textAlign: "center" }}
                  >
                    {codeErrors[items]}
                  </motion.p>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div className="save-modal-buttons">
        <ButtonSubmit label={"Cancelar"} onClick={handleClose} />
        <ButtonSubmit label={"Guardar"} onClick={handleSubmit} />
      </motion.div>
      <motion.div style={{ marginTop: "2rem" }}>
        {errors &&
          Object.keys(errors).map((items) => (
            <motion.div>
              <motion.p
                initial={{ x: -40, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  color: "red",
                }}
                exit={{ opacity: 0 }}
                style={{ fontSize: "1.2rem", textAlign: "center" }}
              >
                {errors[items]}
              </motion.p>
            </motion.div>
          ))}
      </motion.div>
    </StyledSaveModal>
  );
}

export default SaveModal;
