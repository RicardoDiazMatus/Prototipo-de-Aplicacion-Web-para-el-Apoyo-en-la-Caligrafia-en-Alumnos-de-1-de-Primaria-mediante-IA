import React, { useState } from "react";
import { StyledStudentNavbar } from "./StudentNavbar.styled";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faAtom,
  faChartPie,
  faFile,
  faGear,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSticky } from "../../../utils/hooks/hooks";
import { useNavigate } from "react-router-dom";
function StudentNavbar() {
  const [activeLink, setActiveLink] = useState(0);
  const { sticky, stickyRef } = useSticky();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const links = [
    { to: "/Student", icon: faHome },
    { to: "/Student/Files", icon: faFile },
    { to: "/Student/Calligraphy", icon: faAtom },
    { to: "/Student/Stadistics", icon: faChartPie },
    { to: "/Student/Settings", icon: faGear },
  ];

  return (
    <StyledStudentNavbar>
      <div
        className={`top-student-navbar student-navbar ${
          sticky ? " sticky-top" : ""
        }`}
        ref={stickyRef}
      >
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <div onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to={"/"} style={{ color: "#000000" }}>
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </div>
        </div>
        <div className="student-navbar-profile-icon">
        <Link to={"/Student/Settings"} style={{ color: "#000000" }}>
          <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </div>
      <div
        style={{
          height: sticky ? `${stickyRef.current?.clientHeight}px` : "0px",
        }}
      />
      <div className="student-container">
        <Outlet />
      </div>
      <div className={`bottom-student-navbar student-navbar sticky-bottom`}>
        {links.map((link, index) => (
          <Link
            to={link.to}
            className={pathname === link.to ? "selected" : ""}
            onClick={() => handleLinkClick(index)}
            key={index}
          >
            <div className={link.icon === faAtom ? "ia-icon" : null}>
              <FontAwesomeIcon icon={link.icon} />
            </div>
          </Link>
        ))}
      </div>
      <div
        style={{
          height: `${stickyRef.current?.clientHeight}px`,
        }}
      />
    </StyledStudentNavbar>
  );
}
export default StudentNavbar;
