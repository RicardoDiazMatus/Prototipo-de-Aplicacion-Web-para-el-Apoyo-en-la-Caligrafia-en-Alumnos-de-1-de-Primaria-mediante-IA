import React from "react";
import { StyledMenu } from "./Menu.styled";
import { bool } from "prop-types";
import { useGetAuthPayload } from "../../utils/hooks/hooks";
import { setAuthToken } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Menu({ open }) {
  const authPayload = useGetAuthPayload();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  return (
    <StyledMenu open={open}>
      <div>
        <Link to="/">
          <span role="img" aria-label="home">
            &#x1F3E0;
          </span>
          Inicio
        </Link>
        <Link to="/IA">
          <span role="img" aria-label="atom">
            &#x1F9EA;
          </span>
          IA
        </Link>
        {authPayload ? (
          <>
            {authPayload.userType === "alumno" && (
              <Link to="/Student">
                <span role="img" aria-label="books">
                  &#x1F4DA;
                </span>{" "}
                Dashboard
              </Link>
            )}
            {authPayload.userType === "profesor" && (
              <Link to="/Professor">
                <span role="img" aria-label="books">
                  &#x1F4DA;
                </span>{" "}
                Dashboard
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/Login">
              <span role="img" aria-label="books">
                &#x1F4DA;
              </span>
              Dashboard
            </Link>
          </>
        )}

        <Link to="/Media">
          <span role="img" aria-label="media">
            &#x1F4F9;
          </span>
          Multimedia
        </Link>
      </div>
      <div>
        <Link to="/Contact">
          <span role="img" aria-label="contact">
            &#x1f4e9;
          </span>
          Contacto
        </Link>
        <Link to="/AboutUs">
          <span role="img" aria-label="contact">
            &#x2753;
          </span>
          ¿Quiénes Somos?
        </Link>
        <Link onClick={() => (window.open("./assets/docs/manual.pdf", "_blank"))}>
          <span role="img" aria-label="help">
            &#x1F4A1;
          </span>
          Ayuda
        </Link>
        {authPayload === null ? (
          <Link to="/Login">
            <span role="img" aria-label="about us">
              &#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;
            </span>
            Login
          </Link>
        ) : (
          <Link onClick={() => (dispatch(setAuthToken(null)), navigate("/"))}>
            <span role="img" aria-label="about us">
              &#10145;
            </span>
            Logout
          </Link>
        )}
      </div>
    </StyledMenu>
  );
}

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
