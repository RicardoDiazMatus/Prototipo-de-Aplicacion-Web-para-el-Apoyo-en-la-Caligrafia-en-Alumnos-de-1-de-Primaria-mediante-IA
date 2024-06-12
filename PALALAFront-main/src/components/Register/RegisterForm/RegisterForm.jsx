import React, { useEffect, useState } from "react";
import { StyledRegisterForm } from "./RegisterForm.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import ButtonSubmit from "../../Utils/ButtonSubmit/ButtonSubmit";
import Checkbox from "../../Utils/Checkbox/Checkbox";
import OverlayModal from "../../Utils/OverlayModal/OverlayModal";
import ErrorModal from "../../Utils/ErrorModal/ErrorModal";
import OkModal from "../../Utils/OkModal/OkModal";
import Loading from "../../Utils/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, CREATE_PROFESSOR_URL, CREATE_STUDENT_URL } from "../../../utils/config";


function RegisterForm({ userSelection }) {
  const [inputFields, setInputFields] = useState({
    userSelection: "",
    firstName: "",
    paternalName: "",
    maternalName: "",
    schoolName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    checkbox: "",
  });

  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  const [modal, setModal] = useState(
    <div style={{ height: "35rem", width: "50rem" }}>
      <Loading
        backgroundcolor="#ffffff"
        loadingInfo={<h2>Procesando tu solicitud</h2>}
      />
    </div>
  );
  const [isOperationSuccesful, setOperationSuccesful] = useState(false);

  const navigate = useNavigate();

  const validateValues = (inputValues) => {
    let errors = {};

    const nameRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñÜü\s]+$/;
    if (
      inputValues.firstName.length === 0 ||
      inputValues.paternalName.length === 0 ||
      inputValues.maternalName.length === 0 ||
      !nameRegex.test(inputValues.firstName) ||
      !nameRegex.test(inputValues.paternalName) ||
      !nameRegex.test(inputValues.maternalName)
    ) {
      errors.name = "Ingrese un nombre válido";
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(inputValues.email)) {
      errors.email = "Ingrese un email válido.";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-])[A-Za-z\d@$!%*?&+-]{8,}$/;
    if (!passwordRegex.test(inputValues.password)) {
      errors.password =
        "La contraseña debe contener al menos 8 caracteres, letras mayúsculas y minúsculas, un dígito (0-9) y un carácter especial (@$!%*?&+-)";
    }
    if (inputValues.schoolName.length < 5) {
      errors.schoolName = "El nombre de la escuela es muy corto o nulo";
    }

    if (inputValues.password !== inputValues.confirmedPassword) {
      errors.confirmedPassword = "Las contraseñas deben coincidir";
    }
    if(!inputValues.checkbox){
      errors.checkTerms = "Acepte los términos y condiciones de nuestra aplicación"
    }

    return errors;
  };

  const handleCheck = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.checked,
    })
  }

  const handleChange = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateValues(inputFields));
    setInputFields({
      ...inputFields,
      userSelection: userSelection,
    });
    setSubmitting(true);
  };

  const finishSubmit = async () => {
    try {
      setOverlayVisibility(true);
      let requestURL = "";
      if (userSelection === 0)
        //student
        requestURL = `${API_BASE_URL}${CREATE_STUDENT_URL}`;
      else if (userSelection === 1)
        //professor
        requestURL = `${API_BASE_URL}${CREATE_PROFESSOR_URL}`;

      const response = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputFields),
      });
      if (response.ok) {
        const responseData = await response.json();
        setOperationSuccesful(true);
        setModal(<OkModal handleNext={() => navigate("/")} />);
        navigate("/");
      } else {
        console.error("Error sending form data:", response.status);
        const responseData = await response.json();
        console.error("Server says: ", responseData);
        let displayData = "";
        Object.keys(responseData).forEach((key) => {
          const value = responseData[key];
          displayData += value + "\n";
        });
        setModal(
          <ErrorModal errText={displayData} handleReturn={handleCloseOverlay} />
        );
      }
    } catch (error) {
      console.error("Error sending form data:", error);
      setModal(<ErrorModal errText={"Error al enviar los datos"} />);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors, submitting]);

  const handleCloseOverlay = () => {
    setOverlayVisibility(false);
    setModal(
      <div style={{ height: "35rem", width: "50rem" }}>
        <Loading
          backgroundcolor="#ffffff"
          loadingInfo={<h2>Procesando tu solicitud</h2>}
        />
      </div>
    );
  };

  return (
    <StyledRegisterForm>
      {isOverlayVisible && (
        <OverlayModal
          handleClose={handleCloseOverlay}
          topposition={window.scrollY}
        >
          {modal}
        </OverlayModal>
      )}

      <div className="register-input-icons">
        <h2>Registro</h2>
      </div>
      <div className="register-input-icons">
        <h3>Nombre Completo</h3>
        <div className="register-input-name">
          <input
            className="register-input-field"
            type="text"
            placeholder="Nombre"
            name="firstName"
            value={inputFields.firstName}
            onChange={handleChange}
          />
          <input
            className="register-input-field"
            type="text"
            placeholder="Apellido Paterno"
            name="paternalName"
            value={inputFields.paternalName}
            onChange={handleChange}
          />
          <input
            className="register-input-field"
            type="text"
            placeholder="Apellido Materno"
            name="maternalName"
            value={inputFields.maternalName}
            onChange={handleChange}
          />
        </div>
        {errors.name ? (
          <p className="register-error-message">{errors.name}</p>
        ) : null}
      </div>
      <div className="register-input-icons">
        <h3>Escuela</h3>
        <div className="register-input">
          <input
            className="register-input-field"
            type="text"
            placeholder="Nombre Escuela"
            name="schoolName"
            value={inputFields.schoolName}
            onChange={handleChange}
          />
          <FontAwesomeIcon className="register-icon" icon={faSchool} />
        </div>
        {errors.schoolName ? (
          <p className="register-error-message">{errors.schoolName}</p>
        ) : null}
      </div>
      <div className="register-input-icons">
        <h3>Correo Electrónico</h3>
        <div className="register-input">
          <input
            className="register-input-field"
            type="email"
            placeholder="Correo Electrónico"
            name="email"
            value={inputFields.email}
            onChange={handleChange}
          />
          <FontAwesomeIcon className="register-icon" icon={faEnvelope} />
        </div>
        {errors.email ? (
          <p className="register-error-message">{errors.email}</p>
        ) : null}
      </div>
      <div className="register-input-icons">
        <h3>Contraseña</h3>
        <div className="register-input">
          <input
            className="register-input-field"
            type="password"
            placeholder="Contraseña"
            name="password"
            value={inputFields.password}
            onChange={handleChange}
          />
          <FontAwesomeIcon className="register-icon" icon={faLock} />
        </div>
        {errors.password ? (
          <p className="register-error-message">{errors.password}</p>
        ) : null}
      </div>
      <div className="register-input-icons">
        <h3>Confirmar Contraseña</h3>
        <div className="register-input">
          <input
            className="register-input-field"
            type="password"
            placeholder="Confirmar Contraseña"
            name="confirmedPassword"
            value={inputFields.confirmedPassword}
            onChange={handleChange}
          />
          <FontAwesomeIcon className="register-icon" icon={faLock} />
        </div>
        {errors.confirmedPassword ? (
          <p className="register-error-message">{errors.confirmedPassword}</p>
        ) : null}
      </div>
      <div className="register-input-icons">
        <Checkbox
          label={
            <div style={{ fontSize: "1rem" }}>
              Estoy de acuerdo con{" "}
              <Link
                to="../assets/docs/terminos_y_condiciones.pdf"
                style={{ fontSize: "1rem", textDecoration: "underline" }}
                target="_blank"
              >
                Términos y Condiciones de Uso
              </Link>
            </div>
          }
          color={"#ffbe0a"}
          name="checkbox"
          func={handleCheck}
        />
        {errors.checkTerms ? (
          <p className="register-error-message">{errors.checkTerms}</p>
        ) : null}
      </div>
      <div className="register-input-icons">
        <ButtonSubmit label={"Enviar"} onClick={handleSubmit} />
      </div>
    </StyledRegisterForm>
  );
}

export default RegisterForm;
