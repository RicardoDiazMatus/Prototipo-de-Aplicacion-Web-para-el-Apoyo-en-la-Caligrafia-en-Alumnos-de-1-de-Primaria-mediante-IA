import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledLetterAnimation = styled(motion.div)`
display: none;
  @media (min-width: 768px) {
    padding-top: 20rem;
    display: flex;
    justify-content: center;
    background-color: #FE5D41;
    width: 100%;
    position: relative;
    .letter-line-animation{
        position: relative;
    }
    .letters-container {
      display: flex;
      color: #FFFFFF;
      justify-content: space-between;
      width: 80%;
      font-size: 14.3rem;
      font-weight: bold;
    }
  }
`;
