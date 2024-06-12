import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledLetterCardDisplay = styled(motion.div)`
  border: #ffffff solid 1rem;
  border-radius: 3rem;
  background-color: #ffbe0a;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  > div {
    display: flex;
    align-items: center;
    &:first-child {
      flex-direction: column;
      flex-basis: 70%;
    }
    &:last-child {
      flex-basis: 20%;
    }
  }

  .clipboard-svg-icon {
    width: 7rem;
    height: 7rem;
  }

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .clipboard-svg-icon {
      width: 25rem;
      height: 25rem;
    }
  }
`;
