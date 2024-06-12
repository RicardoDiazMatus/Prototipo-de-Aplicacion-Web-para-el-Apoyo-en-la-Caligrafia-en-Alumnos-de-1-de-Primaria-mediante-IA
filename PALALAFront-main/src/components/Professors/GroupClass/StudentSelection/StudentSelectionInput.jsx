import React, { useState } from "react";
import { StyledStudentSelectionInput } from "./StudentSelectionInput.styled";
import Select from "react-select";
import { color } from "framer-motion";


function StudentSelectionInput({ handleStudentNameOption, studentNames }) {
  const [options, setOptions] = useState(
    studentNames.map((item) => ({ value: item, label: item }))
  );
  return (
    <StyledStudentSelectionInput>
      <Select
        options={options}
        className="select-selection-input"
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
            borderColor: state.isFocused ? "#ffbe0a" : "#fe5d41",
            "&:hover": {
              cursor: "pointer",
            },
          }),
        }}
        noOptionsMessage={()  => "No existen alumnos con ese nombre"}
        placeholder="Estudiantes"
        isClearable={true}
        onChange={(selectedOption) => selectedOption ? handleStudentNameOption(selectedOption.value) : handleStudentNameOption("")}
      />
    </StyledStudentSelectionInput>
  );
}

export default StudentSelectionInput;
