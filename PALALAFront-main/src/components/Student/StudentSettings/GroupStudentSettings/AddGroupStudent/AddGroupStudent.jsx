import React, { useEffect, useState } from "react";
import { StyledAddGroupStudent } from "./AddGroupStudent.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import ButtonSubmit from "../../../../Utils/ButtonSubmit/ButtonSubmit";
import { useSelector } from "react-redux";
import { API_BASE_URL, INSCRIBIR_CLASE_URL } from "../../../../../utils/config";
function AddGroupStudent({handleCancel, handleResult}) {
  const [codeInput, setCodeInput] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const state = useSelector((appState) => appState);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      addGroup();
    }
  }, [errors, submitting]);

  const addGroup = async () => {
    try {
      const requestURL = `${API_BASE_URL}${INSCRIBIR_CLASE_URL}`;
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
        console.log(responseData);
        handleResult(true);
      } else {
        console.error("Error del servidor");
        const responseData = await response.json();
        setErrors({ serverError: responseData.message });
        //console.log("Server dice: ", response.status);
      }
    } catch (error) {
      console.log(error);
      console.error("Error al enviar al servidor");
      setErrors({ sendError: "Error al enviar datos al servidor" });
    }
  };

  const validateCode = (codeInput) => {
    let errors = {};
    if (codeInput.length < 10 || codeInput.length > 10) {
      errors.codeLength = "El código debe ser de 10 caracteres";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateCode(codeInput));
    setSubmitting(true);
  };

  const handleAddGroupInputChange = (e) => {
    setCodeInput(e.target.value);
  };

  return (
    <StyledAddGroupStudent>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <FontAwesomeIcon icon={faChalkboardTeacher} />
        </div>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 style={{ margin: "1rem auto" }}>Agregar Clase</h2>
        <input
          type="text"
          placeholder="Código de Clase"
          style={{ margin: "1rem 0" }}
          name="codeInput"
          value={codeInput}
          onChange={handleAddGroupInputChange}
        />
        <span style={{ margin: "1rem auto" }}>
          Ingresa el Código que te proporcionó tu profesor
        </span>
        {errors &&
          Object.keys(errors).map((items) => (
            <motion.div>
              <motion.p
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1, color: "red", fontWeight: "bold" }}
                exit={{ opacity: 0 }}
              >
                {errors[items]}
              </motion.p>
            </motion.div>
          ))}
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ButtonSubmit label={"Cancelar"} onClick={handleCancel} />
        <ButtonSubmit label={"Aceptar"} onClick={handleSubmit} />
      </motion.div>
    </StyledAddGroupStudent>
  );
}

export default AddGroupStudent;
