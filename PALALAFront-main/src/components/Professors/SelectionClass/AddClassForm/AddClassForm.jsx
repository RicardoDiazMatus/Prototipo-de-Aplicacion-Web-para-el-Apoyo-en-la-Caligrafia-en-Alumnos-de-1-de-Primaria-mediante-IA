import React, { useEffect, useState } from "react";
import { StyledAddClassForm } from "./AddClassForm.styled";
import { motion } from "framer-motion";
import ButtonSubmit from "../../../Utils/ButtonSubmit/ButtonSubmit";
import Select from "react-select";
import { useSelector } from "react-redux";
import { API_BASE_URL, CREACION_CLASE_URL } from "../../../../utils/config";
 
const getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
};
const colourOptions = [
  { value: "#FE5D41", label: "Naranja", color: "#FE5D41" },
  { value: "#CF75FF", label: "Morado", color: "#CF75FF" },
  { value: "#FADB39", label: "Amarillo", color: "#FADB39" },
  { value: "#59A6F2", label: "Azul", color: "#59A6F2" },
];
function AddClassForm({ handleCancel, handleOperationSuccessful }) {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [inputFields, setInputFields] = useState({
    groupName: "",
    color: colourOptions[0],
      groupDate: getDate(),
  });
  const state = useSelector((appState) => appState);
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors, submitting]);

  const StylesButton = {
    backgroundColor: "#ffbe0a",
    hoverBackgroundColor: "#E0A600",
  };



  const handleClickCancelButton = () => {
    setInputFields({
      groupName: "",
      color: colourOptions[0],
      groupDate: getDate(),
    });
    handleCancel();
  };

  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const handleChange = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };

  const finishSubmit = async () => {
    try {
      const requestURL = `${API_BASE_URL}${CREACION_CLASE_URL}`;
      const response = await fetch(requestURL, {
        method: "POST",
        headers: {
          Authorization: state.authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName: inputFields.groupName,
          color: inputFields.color.value,
          groupDate: inputFields.groupDate,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        handleOperationSuccessful();
      } else {
        console.error("Error sending form data: ", response.status);
        setErrors({ serverError: "Error del servidor. Inténtelo más tarde." });
      }
    } catch (error) {
      console.error("Error sending form data:", error);
      setErrors({ serverError: "Error del servidor. Inténtelo más tarde." });
    }
  };

  const validateValues = (inputValues) => {
    let errors = {};

    if (inputValues.groupName.length <= 5) {
      errors.groupNameLength =
        "El nombre del grupo debe ser mayor a 5 caracteres.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  const handleColorChange = (selectedOption) => {
    setInputFields({
      ...inputFields, color: selectedOption
    });
  }

  return (
    <StyledAddClassForm
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="class-input-icons">
        <h3>Crear Grupo</h3>
      </div>
      <div className="class-input-icons">
        <motion.input
          className="class-input-field"
          type="text"
          placeholder="Nombre Grupo"
          name="groupName"
          whileFocus={{ borderBottomColor: "#ffbe0a" }}
          value={inputFields.groupName}
          //value={inputFields.email}
          onChange={handleChange}
        />
        {errors.groupNameLength ? (
          <motion.p
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {errors.groupNameLength}
          </motion.p>
        ) : null}
      </div>
      <div className="class-input-icons">
        <div>
          <Select
            
            options={colourOptions}
            value={inputFields.color}
            onChange={handleColorChange}
            styles={{
              option: (baseStyles, state) => ({
                ...baseStyles,
                color: state.isSelected ? "white" : state.data.color,
                backgroundColor: state.isSelected
                  ? state.data.color
                  : state.data.isFocused
                  ? state.data.color
                  : "white",
                ":active": {
                  ...baseStyles[":active"],
                  backgroundColor: !state.data.isDisabled
                    ? state.data.isSelected
                      ? state.data.color
                      : state.data.color
                    : undefined,
                },
                ":hover": {
                  ...baseStyles[":hover"],
                  backgroundColor: "#ddd",
                },
              }),
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused
                  ? "#fe5d41"
                  : state.isSelected
                  ? "#fe5d41"
                  : "#ffbe0a",
                ":hover": {
                  ...baseStyles[":hover"],
                  borderColor: state.isFocused
                    ? "#ffbe0a"
                    : state.isSelected
                    ? "#ffbe0a"
                    : "#fe5d41",
                },
              }),
              input: (baseStyles, state) => ({
                ...baseStyles,
                ...dot(),
              }),
              placeholder: (baseStyles, state) => ({
                ...baseStyles,
                ...dot("#CCC"),
              }),
              singleValue: (baseStyles, state) => ({
                ...baseStyles,
                ...dot(state.data.color),
              }),
            }}
          />
        </div>
      </div>
      <div className="class-input-icons">
        <motion.input
          type="date"
          className="class-input-field inactive-input"
          name="groupDate"
          whileFocus={{ borderBottomColor: "blue" }}
          value={inputFields.groupDate}
          disabled
        />
      </div>
      <div className="class-input-icons">
        <ButtonSubmit label={"Cancelar"} onClick={handleClickCancelButton} />
        <ButtonSubmit
          label={"Crear"}
          styles={StylesButton}
          onClick={handleSubmit}
        />
      </div>
      {errors.serverError ? (
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, color:"red", fontWeight: "bold" }}
        >
          {errors.serverError}
        </motion.p>
      ) : null}
    </StyledAddClassForm>
  );
}

export default AddClassForm;
