import React, { useEffect, useState } from "react";
import { StyledLoginForm } from "./LoginForm.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import ButtonSubmit from "../../Utils/ButtonSubmit/ButtonSubmit";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../../../redux/actions/actions";
import { Link, Navigate } from "react-router-dom";
import Loading from "../../Utils/Loading/Loading";
import ErrorModal from "../../Utils/ErrorModal/ErrorModal";
import OverlayModal from "../../Utils/OverlayModal/OverlayModal";
import { API_BASE_URL, LOGIN_URL} from "../../../utils/config";

//require ("dotenv").config();
function LoginForm() {
  //States
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);

  const [navigateToNewPage, setNavigateToNewPage] = useState(false);
  const [modal, setModal] = useState(
    <div style={{ height: "35rem", width: "50rem" }}>
      <Loading
        backgroundcolor="#ffffff"
        loadingInfo={<h2>Procesando tu solicitud</h2>}
      />
    </div>
  );
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  //Hooks
  const auth = useSelector((appState) => appState.authToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors, submitting]);

  const validateValues = (inputValues) => {
    let errors = {};

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
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  const finishSubmit = async () => {
    try {
      setOverlayVisibility(true);
      const requestURL = `${API_BASE_URL}${LOGIN_URL}`;
      const response = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputFields),
      });
      if (response.ok) {
        const responseData = await response.json();
        dispatch(setAuthToken(responseData.accessToken));
        setNavigateToNewPage(true);
      } else {
        console.error("Error sending form data:", response.status);
        const responseData = await response.json();
        let displayData = "";
        Object.keys(responseData).forEach((key) => {
          const value = responseData[key];
          displayData += value + "\n";
        });
        setModal(
          <ErrorModal errText={displayData} handleReturn={handleCloseOverlay} />
        );
        console.error("Server says: ", responseData);
      }
    } catch (error) {
      console.error("Error sending form data:", error);
      setModal(<ErrorModal errText={"Error al enviar datos"} handleReturn={handleCloseOverlay} />);
    }
  };

  const handleChange = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value ?? e.target.checked,
    });
  };

  if (navigateToNewPage) {
    return <Navigate to="/" />;
  }

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
    <StyledLoginForm>
      {isOverlayVisible && (
        <OverlayModal
          handleClose={handleCloseOverlay}
          topposition={window.scrollY}
        >
          {modal}
        </OverlayModal>
      )}
      <div className="login-input-icons">
        <h1>Login</h1>
      </div>
      <div className="login-input-icons">
        <input
          className="login-input-field"
          type="email"
          placeholder="Correo Electrónico"
          name="email"
          value={inputFields.email}
          onChange={handleChange}
        />
        <FontAwesomeIcon className="login-icon" icon={faEnvelope} />
      </div>
      {errors.email ? (
        <p className="register-error-message">{errors.email}</p>
      ) : null}
      <div className="login-input-icons">
        <input
          className="login-input-field"
          type="password"
          placeholder="Contraseña"
          name="password"
          value={inputFields.password}
          onChange={handleChange}
        />
        <FontAwesomeIcon className="login-icon" icon={faLock} />
      </div>
      {errors.password ? (
        <p className="register-error-message">{errors.password}</p>
      ) : null}
      <p>
        ¿No tienes una cuenta? <Link to="/Register">Crea una aquí</Link>
      </p>

      <div className="login-input-icons">
        <ButtonSubmit label={"Entrar"} onClick={handleSubmit} />
      </div>
    </StyledLoginForm>
  );
}

export default LoginForm;
