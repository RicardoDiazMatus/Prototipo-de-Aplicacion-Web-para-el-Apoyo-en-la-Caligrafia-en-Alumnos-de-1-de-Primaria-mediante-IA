import React from "react";
import { StyledGroupClassHeader } from "./GroupClassHeader.styled";
import StudentSelectionInput from "../StudentSelection/StudentSelectionInput";
import Select from "react-select";

const options = [
  { value: "name", label: "Nombre Archivo" },
  { value: "iaPunctuation", label: "Puntuación IA" },
  { value: "date", label: "Fecha" },
];

function GroupClassHeader({
  handleAscDescOption,
  handleSortingOption,
  handleStudentNameOption,
  studentNames,
}) {
  return (
    <StyledGroupClassHeader>
      <div className="filter">
        <div className="filter-select">
          <Select
            options={options}
            onChange={(selectedOption) =>
              handleSortingOption(selectedOption.value)
            }
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
            noOptionsMessage={() => "No existen grupos"}
            defaultValue={options[0]}
          />
        </div>
      </div>
      <div className="filter-arrow">
        <input
          type="checkbox"
          id="animation2"
          onChange={(event) => handleAscDescOption(event.target.checked)}
        />
        <label htmlFor="animation2">
          <div className="arrow"></div>
        </label>
      </div>
      <div className="filter-student">
        <StudentSelectionInput
          handleStudentNameOption={handleStudentNameOption}
          studentNames={studentNames}
        />
      </div>
    </StyledGroupClassHeader>
  );
}

export default GroupClassHeader;
