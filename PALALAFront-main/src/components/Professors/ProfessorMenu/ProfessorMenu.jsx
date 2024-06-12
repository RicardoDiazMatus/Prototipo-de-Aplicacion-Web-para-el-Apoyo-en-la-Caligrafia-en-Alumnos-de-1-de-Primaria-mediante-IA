import React from "react";
import { StyledProfessorMenu } from "./ProfessorMenu.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faGraduationCap,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useSticky } from "../../../utils/hooks/hooks";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  .added-height {
    transition: all 0.3s ease-in-out;
    @media (min-width: 768px) {
      width: ${(props) => (props.open ? "30rem" : "7rem")};
    }
  }
`;

function ProfessorMenu({ open }) {
  const { sticky, stickyRef } = useSticky();
  return (
    <StyledDiv
      open={open}
      height={sticky ? `${stickyRef.current?.clientHeight}px` : "0px"}
    >
      <StyledProfessorMenu open={open} sticky={sticky} ref={stickyRef}>
        <div>
          <Link to={"/"}>
            <div className="menu-professor-element">
              <div className="menu-professor-icon">
                <FontAwesomeIcon icon={faHome} />
              </div>
              <div className="menu-professor-title">
                <h3>Inicio</h3>
              </div>
            </div>
          </Link>
          <Link to={"/Professor"}>
            <div className="menu-professor-element">
              <div className="menu-professor-icon">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <div className="menu-professor-title">
                <h3>Clases</h3>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link to={"/Professor/Settings"}>
            <div className="menu-professor-element">
              <div className="menu-professor-icon">
                <FontAwesomeIcon icon={faGear} />
              </div>
              <div className="menu-professor-title">
                <h3>Settings</h3>
              </div>
            </div>
          </Link>
        </div>
      </StyledProfessorMenu>
      <div className="added-height" />
    </StyledDiv>
  );
}

export default ProfessorMenu;
