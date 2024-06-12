import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledMenuIA = styled(motion.div)`
  height: 100%;
  width: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fe5d41;
  .menu-ia-results {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 90%;
    overflow-y: scroll;
    -webkit-box-shadow: inset 0px 0px 29px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: inset 0px 0px 29px 0px rgba(0, 0, 0, 0.5);
    box-shadow: inset 0px 0px 29px 0px rgba(0, 0, 0, 0.5);
    .menu-ia-result {
      display: block;
      text-align: center;
      font-size: 2rem;
      text-transform: uppercase;
      padding: 2rem;
      font-weight: bold;
      letter-spacing: 0.5rem;
      color: #ffffff;
      border-top: #ffffff solid 0.1rem;
      border-bottom: #ffffff solid 0.1rem;
      text-shadow: 0.2rem 1px 5px #000000;
    }
  }
  .menu-ia-buttons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;
