import React from "react";
import { StyledRegisterFormWrapper } from "./RegisterFormWrapper.styled";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RegisterFormWrapper({ updateCurrentPage }) {
  return (
    <StyledRegisterFormWrapper>
      <FontAwesomeIcon
        className="icon"
        icon={faChevronLeft}
        onClick={updateCurrentPage}
      />
      <div>
        <div>
          <img src="./assets/images/dibujos_lapiz_guino.svg" alt="" />
        </div>
      </div>
    </StyledRegisterFormWrapper>
  );
}

export default RegisterFormWrapper;
