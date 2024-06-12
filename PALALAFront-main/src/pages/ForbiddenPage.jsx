import { AnimatePresence, animate, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import ButtonSubmit from "../components/Utils/ButtonSubmit/ButtonSubmit";
import { useNavigate } from "react-router-dom";

function ForbiddenPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  const StyledForbiddenPage = styled(motion.div)`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffbe0a;
    height: 100vh;
    gap: 2rem;
    > div {
      &:first-child {
        position: relative;
        display: flex;
        align-items: center;
        width: 40rem;

        img {
          z-index: 2;
          max-width: 100%;
        }
        &:after {
          content: "403";
          color: #fe5d41;
          z-index: 1;
          font-size: 25rem;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
      }
      &:last-child {
        width: 100%;
        display: flex;

        flex-direction: column;
        align-items: center;
        justify-content: center;
        > * {
          padding: 1rem 0;
        }
      }
    }

    @media (min-width: 768px) {
      > div {
        &:first-child {
          &:after {
            font-size: 50rem;
          }
        }
      }
    }
  `;

  return (
    <AnimatePresence>
      <StyledForbiddenPage>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img src="/assets/images/dibujos_lapiz_llorando.svg" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1>Error 403</h1>
          <h2>Acceso Prohibido</h2>
          <h3>No tienes permisos para visualizar esto</h3>
          <div>
            <ButtonSubmit
              label={"Regresar a Inicio"}
              onClick={handleButtonClick}
              styles={{ width: "20rem", height: "5rem", borderRadius: "1rem" }}
            />
          </div>
        </motion.div>
      </StyledForbiddenPage>
    </AnimatePresence>
  );
}

export default ForbiddenPage;
