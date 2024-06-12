import React, { useEffect, useState } from "react";
import { StyledProfileStudentSettings } from "./ProfileStudentSettings.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonSubmit from "../../../Utils/ButtonSubmit/ButtonSubmit";
import { AnimatePresence, motion } from "framer-motion";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useGetAuthPayload } from "../../../../utils/hooks/hooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  API_BASE_URL,
  GET_STUDENT_BY_ID_URL,
  UPDATE_STUDENT_URL,
} from "../../../../utils/config";

function ProfileStudentSettings() {
  const [isEditable, setIsEditable] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [originalInputFields, setOriginalInputFields] = useState({
    userSelection: 1,
    name: "",
    paternal: "",
    maternal: "",
    school: "",
    email: "",
    password: "",
  });
  const [inputFields, setInputFields] = useState();

  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);
  const [recharge, setRecharge] = useState(true);

  const authPayload = useGetAuthPayload();
  const state = useSelector((appState) => appState);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const requestURL = `${API_BASE_URL}${GET_STUDENT_BY_ID_URL}/${authPayload.id}`;
        const response = await fetch(requestURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //"X-Jsio-Token": "4fc7f1d12d85bc37cf4d64295cda3e6a",
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          setOriginalInputFields({
            userSelection: 1,
            name: responseData[0].nombre,
            paternal: responseData[0].apellido_paterno,
            maternal: responseData[0].apellido_materno,
            school: responseData[0].escuela,
            email: responseData[0].email,
            password: "",
          });
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
        }
      } catch (error) {
        console.log("Error while sending data: ", error);
      }
    };
    if (recharge) {
      setRecharge(false);
    }
    fetchStudentProfile();
  }, [authPayload.id, recharge]);

  useEffect(() => {
    setInputFields(originalInputFields);
  }, [originalInputFields]);

  const validateValues = (inputValues) => {
    let errors = {};

    const nameRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñÜü\s]+$/;
    if (
      inputValues.name.length === 0 ||
      inputValues.paternal.length === 0 ||
      inputValues.maternal.length === 0 ||
      !nameRegex.test(inputValues.name) ||
      !nameRegex.test(inputValues.paternal) ||
      !nameRegex.test(inputValues.maternal)
    ) {
      errors.name = "Ingrese un nombre válido";
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(inputValues.email)) {
      errors.email = "Ingrese un email válido.";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-])[A-Za-z\d@$!%*?&+-]{8,}$/;
    if (inputValues.password !== "") {
      if (!passwordRegex.test(inputValues.password)) {
        errors.password =
          "La contraseña debe contener al menos 8 caracteres, letras mayúsculas y minúsculas, un dígito (0-9) y un carácter especial (@$!%*?&+-)";
      }
    }

    if (inputValues.school.length < 5) {
      errors.school = "El nombre de la escuela es muy corto o nulo";
    }

    return errors;
  };

  const handleChange = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value ?? e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  const handleEditable = (value) => {
    setIsEditable(value);
  };

  const handleResetInput = () => {
    setSubmitting(false);
    setErrors({});
    setInputFields(originalInputFields);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const finishSubmit = async () => {
    try {
      let requestURL = `${API_BASE_URL}${UPDATE_STUDENT_URL}/${authPayload.id}`;
      const response = await fetch(requestURL, {
        method: "PUT",
        headers: {
          Authorization: state.authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputFields),
      });
      if (response.ok) {
        const responseData = await response.json();
        setRecharge(true);
        navigate("/Student");
      } else {
        console.error("Error sending form data:", response.status);
        const responseData = await response.json();
        console.error("Server says: ", responseData);
      }
    } catch (error) {
      console.error("Error sending form data from client:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors, submitting]);

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

  return (
    <StyledProfileStudentSettings>
      <h2>Mi Perfil</h2>
      {inputFields && (
        <div className="profile-setting-container">
          <div className="profile-setting-header">
            <div>
              <h3>Esto es Una breve vista de tu perfil.</h3>
            </div>
          </div>
          <div className="profile-setting-body">
            <div className="profile-setting-inputs-container">
              <div className="profile-setting-input">
                <label htmlFor="name">Nombre</label>
                <motion.input
                  animate={isEditable ? "editable" : "notEditable"}
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
                  value={inputFields.name}
                  disabled={!isEditable}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-setting-input">
                <label htmlFor="maternal">Apellido Paterno</label>
                <motion.input
                  animate={isEditable ? "editable" : "notEditable"}
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
                  name="paternal"
                  id="paternal"
                  value={inputFields.paternal}
                  disabled={!isEditable}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-setting-input">
                <label htmlFor="paternal">Apellido Materno</label>
                <motion.input
                  animate={isEditable ? "editable" : "notEditable"}
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
                  name="maternal"
                  id="maternal"
                  value={inputFields.maternal}
                  disabled={!isEditable}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="profile-setting-input">
              <label htmlFor="email">Correo Electrónico</label>
              <motion.input
                animate={isEditable ? "editable" : "notEditable"}
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
                name="email"
                id="email"
                value={inputFields.email}
                disabled={!isEditable}
                onChange={handleChange}
              />
            </div>
            {isEditable && (
              <div className="profile-setting-input">
                <label htmlFor="password">Modificar Contraseña</label>
                <p style={{ fontSize: "1.2rem" }}>
                  Al dejar la contraseña sin valor, no se actualizará en sistema
                </p>
                <motion.input
                  animate={isEditable ? "editable" : "notEditable"}
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
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  value={inputFields.password}
                  disabled={!isEditable}
                  onChange={handleChange}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  className="icon-show-password"
                  onMouseDown={togglePasswordVisibility}
                  onMouseUp={togglePasswordVisibility}
                />
              </div>
            )}
            <div className="profile-setting-input">
              <label htmlFor="school">Escuela</label>
              <motion.input
                animate={isEditable ? "editable" : "notEditable"}
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
                name="school"
                id="school"
                value={inputFields.school}
                disabled={!isEditable}
                onChange={handleChange}
              />
            </div>
            <div>
              <AnimatePresence>
                {isEditable && errors
                  ? Object.keys(errors).map((key) => (
                      <motion.p
                        key={key}
                        className="setting-error"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {errors[key]}
                      </motion.p>
                    ))
                  : null}
              </AnimatePresence>
            </div>
          </div>

          <div className="profile-setting-buttons">
            {
              //translate, scale, rotate, skew.
            }
            <AnimatePresence>
              {!isEditable && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, rotateY: 360 }}
                >
                  <ButtonSubmit
                    label={"Editar"}
                    styles={StylesButtonEditable}
                    onClick={() => handleEditable(true)}
                  />
                </motion.div>
              )}

              {isEditable && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ButtonSubmit
                    label={"Cancelar"}
                    styles={StylesButtonCancel}
                    onClick={() => {
                      handleEditable(false);
                      handleResetInput();
                    }}
                  />
                  <ButtonSubmit
                    label={"Listo"}
                    styles={StylesButtonReady}
                    onClick={handleSubmit}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </StyledProfileStudentSettings>
  );
}

export default ProfileStudentSettings;
