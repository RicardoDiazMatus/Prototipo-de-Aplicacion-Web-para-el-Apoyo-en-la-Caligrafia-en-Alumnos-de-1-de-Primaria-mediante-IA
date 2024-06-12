import React, { useEffect } from "react";
import { StyledClassCard } from "./ClassCard.styled";
import ButtonSubmit from "../../../Utils/ButtonSubmit/ButtonSubmit";
import { useGenerateRandomPastelColour } from "../../../../utils/hooks/hooks";
import { Link } from "react-router-dom";

function ClassCard({
  id,
  groupName,
  professorName,
  numberOfFiles,
  creationDate,
  code,
  numStudents,
  colourGroup,
  isStudent,
}) {
  const { colour, generatePastelColour } = useGenerateRandomPastelColour();
  useEffect(() => {
    generatePastelColour();
  }, []);
  return (
    <StyledClassCard to={"Class/" + id} backgroundcolour={colourGroup}>
      <div className="classcard-principal-container">
        <div className="classcard-principal-container-img">
          <img src="./assets/images/dibujos_lapiz_feliz.svg" />
        </div>
        <div className="classcard-principal-container-info">
          <h3>{groupName}</h3>
          {isStudent && <span>{professorName}</span>}
          {!isStudent && <span>{numberOfFiles} trabajos</span>}
          <span>{creationDate}</span>
        </div>

        {!isStudent && (
          <div className="classcard-principal-container-students">
            <div>
              <h4>{numStudents}</h4>
            </div>
            <div>
              <p>Alumnos</p>
              <p>Inscritos</p>
            </div>
          </div>
        )}
      </div>

      {!isStudent && (
        <div className="classcard-principal-container-code">
          <p>Código: {code}</p>
        </div>
      )}
    </StyledClassCard>
  );
}

export default ClassCard;
