import React, { useState } from "react";
import { StyledRegisterSelection } from "./RegisterSelection.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faHome,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import CarrouselSelection from "../CarrouselSelection/CarrouselSelection";
import ButtonSubmit from "../../Utils/ButtonSubmit/ButtonSubmit";
import { Link } from "react-router-dom";
import OverlayModal from "../../Utils/OverlayModal/OverlayModal";

function RegisterSelection({ updateUserValue, updateCurrentPage }) {
  const [isOverflow, setOverflow] = useState(false);
  const [modal, setModal] = useState(
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: "1rem", textAlign: "center", backgroundColor: "#FFFFFF", borderRadius: "1rem", height: "25rem", width: "38rem", padding: "3rem"}}>
      <h2 style={{color: "#FE5D41"}}>Registro</h2>
      <p style={{fontWeight: "lighter"}}>
        Selecciona tu categoría de usuario: si eres estudiante, elige la imagen
        de la niña; si eres profesor, selecciona la imagen del profesor.
      </p>
    </div>
  );

  const handleOverlay = () => {
    setOverflow(!isOverflow);
  };

  return (
    <StyledRegisterSelection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isOverflow && (
        <OverlayModal handleClose={() => handleOverlay(false)}>
          {modal && modal}
        </OverlayModal>
      )}
      <div className="register-selection-nav">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <h3>Nuevo Usuario</h3>
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={faLightbulb}
          onClick={handleOverlay}
        />
      </div>
      <div className="register-selecion-carousel">
        <CarrouselSelection updateUserValue={updateUserValue} />
      </div>
      <div className="register-selection-button">
        <ButtonSubmit label="Siguiente" onClick={() => updateCurrentPage(2)} />
      </div>
    </StyledRegisterSelection>
  );
}

export default RegisterSelection;
