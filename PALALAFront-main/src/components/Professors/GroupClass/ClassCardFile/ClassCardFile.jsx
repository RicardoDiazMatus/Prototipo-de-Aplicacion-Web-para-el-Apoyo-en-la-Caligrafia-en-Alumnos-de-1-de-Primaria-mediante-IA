import React from "react";
import { StyledClassCardFile } from "./ClassCardFile.styled";
import ButtonSubmit from "../../../Utils/ButtonSubmit/ButtonSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faChild,
  faEdit,
  faEye,
  faFile,
  faMedal,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function ClassCardFile({
  id,
  studentName,
  fileName,
  dateFile,
  professorPunctuation,
  iaPunctuation,
  styles,
  isStudent,
  isEditable,
  isDeletable,
  handleEdit,
  handleDelete,
  handleView,
}) {
  const buttonStyled = {
    backgroundColor: "",
    color: "#FFFFFF",
    width: "5rem",
    height: "5rem",
    fontSize: "1.5rem",
    borderRadius: "2rem",
  };

  return (
    <StyledClassCardFile>
      <div className="cardfile-container">
        <div className="file-preview">
          <lord-icon
            src="https://cdn.lordicon.com/yqiuuheo.json"
            trigger="hover"
            state="hover-swipe"
            colors="primary:#e86830, secondary:#f4dc9c"
            style={{ width: "20rem", height: "20rem" }}
          ></lord-icon>
          {
            //<ButtonSubmit label="Ver" style={buttonWatchStyle}/>
          }
          <div className="file-preview-button">
            <ButtonSubmit
              label={<FontAwesomeIcon icon={faEye} />}
              styles={buttonStyled}
              onClick={handleView}
            />
            {isEditable && (
              <ButtonSubmit
                label={
                  <FontAwesomeIcon
                    icon={faPencil}
                    style={{ paddingLeft: "0.4rem" }}
                  />
                }
                styles={buttonStyled}
                onClick={handleEdit}
              />
            )}
            {isDeletable && (
              <ButtonSubmit
                label={<FontAwesomeIcon icon={faTrash} />}
                styles={buttonStyled}
                onClick={handleDelete}
              />
            )}
          </div>
        </div>
        <div className="cardfile-info">
          <div>
            <FontAwesomeIcon icon={faCalendar} />
            <p>{dateFile}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faMedal} />
            <p>{iaPunctuation}</p>
          </div>
        </div>
      </div>
      <div className="cardfile-info">
        <div className="cardfile-info-text">
          <div>
            <FontAwesomeIcon icon={faFile} />
            <p>{fileName}</p>
          </div>
          {!isStudent && (
            <div>
              <FontAwesomeIcon icon={faChild} />
              <p>{studentName}</p>
            </div>
          )}
        </div>
        <div className="file-preview-button">
          {/*<ButtonSubmit
            label={<FontAwesomeIcon icon={faEye} style={{paddingLeft:"0.4rem"}} />}
            styles={buttonStyled}
        />*/}
          {isEditable && (
            <ButtonSubmit
              label={
                <FontAwesomeIcon
                  icon={faPencil}
                  style={{ paddingLeft: "0.4rem" }}
                />
              }
              styles={buttonStyled}
              onClick={handleEdit}
            />
          )}
          {isDeletable && (
            <ButtonSubmit
              label={
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ paddingLeft: "0.4rem" }}
                />
              }
              styles={buttonStyled}
              onClick={handleDelete}
            />
          )}
        </div>
      </div>
      {/*
            //<ButtonSubmit label="Ver" style={buttonWatchStyle}/>
          <ButtonSubmit label="Comentarios" styles={buttonInfoStyle} />
          <ButtonSubmit label="Ver" styles={buttonInfoStyle} />
          <ButtonSubmit label="Eliminar" styles={buttonInfoStyle} />
        */}
    </StyledClassCardFile>
  );
}

export default ClassCardFile;
