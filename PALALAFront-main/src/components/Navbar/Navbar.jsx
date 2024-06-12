import React, { useState, useRef, useEffect } from "react";
import { useOnClickOutside, useSticky } from "../../utils/hooks/hooks";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faUser } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import { StyledNavbar } from "./Navbar.styled";
import Burger from "../Burger/Burger";
import Menu from "../Menu/Menu";
import { StyledLink } from "../../utils/StyledLink";
import Footer from "../Footer/Footer";
import { AnimatePresence } from "framer-motion";
import OverlayModal from "../Utils/OverlayModal/OverlayModal";
import TextCarousel from "../Utils/WordCarousel/TextCarousel";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
// Styles
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex-basis: calc(50% - 1rem);

  & * {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  ${(props) =>
    props.className === "to-left"
      ? css`
          justify-content: start;
        `
      : css`
          justify-content: end;
        `}
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: #ffbe0a;
`;

const StyledDivMenu = styled.div`
  //transform: translateX(-100%);
  width: 5.9rem;
  position: fixed;
  z-index: 3;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0%)" : "translateX(-100%)")};
`;

const StyledIAModalHelp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  background-color: #ffffff;
  padding: 4rem 2rem;
  border-radius: 2rem;
  height: 45rem;
  width: 90%;
  align-items: center;
  h3 {
    text-align: center;
    color: #fe5d41;
  }
  > div {
    display: flex;
    flex-direction: column;
    &:first-of-type {
      flex-grow: 0.5;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    &:last-of-type {
      flex-grow: 0.4;
      text-align: justify;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    p {
      font-weight: lighter;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    width: 70%;
    > div {
      &:first-of-type {
        flex-basis: 50%;
      }
      &:last-of-type {
        flex-basis: 40%;
      }
    }
  }
`;

function Navbar() {
  //Hooks

  const [open, setOpen] = useState(false);
  const [isOverflow, setOverflow] = useState(false);
  const [modal, setModal] = useState(null);
  const { sticky, stickyRef } = useSticky();

  const location = useLocation();
  const node = useRef();
  const hamburgerNode = useRef();
  useOnClickOutside(node, () => setOpen(false), [hamburgerNode]);

  const handleCloseOverlay = () => {
    setModal(null);
    setOverflow(false);
  };

  const lightBulbClick = () => {
    if (location.pathname === "/IA") {
      setModal(
        <TextCarousel
          delay={10000}
          words={[
            <StyledIAModalHelp>
              <motion.h3 className="no-desktop-768">
                Utiliza Nuestras Plantillas
              </motion.h3>
              <motion.div>
                <motion.img src="./assets/images/help1_process1.svg" />
              </motion.div>
              <motion.div>
                <motion.h3 className="desktop-768">
                  Utiliza Nuestras Plantillas
                </motion.h3>
                <motion.p>
                  Descargue nuestras plantillas, complételas y tome una
                  fotografía para cargarlas en este espacio designado.
                </motion.p>
              </motion.div>
            </StyledIAModalHelp>,
            <StyledIAModalHelp>
              <motion.h3 className="no-desktop-768">Ajusta tu Imagen</motion.h3>
              <motion.div>
                <motion.img src="./assets/images/help1_process2.svg" />
              </motion.div>
              <motion.div>
                <motion.h3 className="desktop-768">Ajusta tu Imagen</motion.h3>
                <motion.p>
                  Ajusta tu imagen para que encaje dentro del recuadro. Recuerda
                  que, para que podamos hacer un buen trabajo, asegúrate de que
                  los bordes de tu plantilla sean visibles y estén dentro del
                  área marcada.
                </motion.p>
                <motion.h3>¡Diviértete!</motion.h3>
              </motion.div>
            </StyledIAModalHelp>,
          ]}
        />
      );
      setOverflow(true);
    } else {
      window.open("./assets/docs/manual.pdf", "_blank");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOverflow && (
          <OverlayModal
            handleClose={handleCloseOverlay}
            topposition={window.scrollY}
          >
            {modal}
          </OverlayModal>
        )}
      </AnimatePresence>
      <div style={{ height: "5.3rem" }} />
      <StyledNavbar>
        <StyledDiv className="to-left">
          <div
            ref={hamburgerNode}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Burger setOpen={setOpen} open={open} />
          </div>
          <div className="navbar-logo">
            <img src="../assets/images/Logo_IPN.svg" />
          </div>
          <h3>
            <StyledLink to="/">PALALA</StyledLink>
          </h3>
          <div className="navbar-logo">
            <img src="../assets/images/logoESCOM2x.svg" />
          </div>
        </StyledDiv>
        <StyledDiv className="to-right">
          <Link onClick={lightBulbClick}>
            <StyledFontAwesomeIcon icon={faLightbulb} />
          </Link>
          <Link to="/Login">
            <StyledFontAwesomeIcon icon={faUser} />
          </Link>
        </StyledDiv>
      </StyledNavbar>
      <StyledDivMenu ref={node} open={open}>
        <Menu setOpen={setOpen} open={open} />
      </StyledDivMenu>
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

export default Navbar;
