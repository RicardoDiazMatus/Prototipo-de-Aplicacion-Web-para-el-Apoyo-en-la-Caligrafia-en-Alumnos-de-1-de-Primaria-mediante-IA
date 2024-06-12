import React, { useRef, useState } from "react";
import { StyledProfessorNavbar } from "./ProfessorNavbar.styled";
import { Link, Outlet } from "react-router-dom";
import Burger from "../../Burger/Burger";
import { useOnClickOutside, useSticky } from "../../../utils/hooks/hooks";
import ProfessorMenu from "../ProfessorMenu/ProfessorMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function ProfessorNavbar() {
  const [open, setOpen] = useState(false);
  const { sticky, stickyRef } = useSticky();

  const node = useRef();
  const hamburgerNode = useRef();
  useOnClickOutside(node, () => setOpen(false), [hamburgerNode]);

  return (
    <StyledProfessorNavbar>
      <div
        className={`navbar-professor${sticky ? " sticky" : ""}`}
        ref={stickyRef}
      >
        <div>
          <div ref={hamburgerNode}>
            <Burger setOpen={setOpen} open={open} color="#FE5D41" />
          </div>
          <div>
            <Link to={"/"} style={{ textDecoration: "none", color: "#FE5D41" }}>
              <h3>PALALA</h3>
            </Link>
          </div>
        </div>
        <div>
          <Link to={"/Professor/Settings"}>
            <div className="navbar-profile-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </Link>
        </div>
      </div>
      <div
        style={{
          height: sticky ? `${stickyRef.current?.clientHeight}px` : "0px",
        }}
      />
      <div className="professor-content">
        <div ref={node} open={open}>
          <ProfessorMenu setOpen={setOpen} open={open} />
        </div>
        <div className="professor-content-principal">
          <Outlet />
        </div>
      </div>
    </StyledProfessorNavbar>
  );
}

export default ProfessorNavbar;
