import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledErrorModal = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 5rem 2rem;
  height: 30rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    &:first-child {
      color: #fe5d41;
      font-size: 5rem;
      font-weight: bold;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 7rem;
        height: 7rem;
        border: #fe5d41 solid 0.5rem;
        border-radius: 100%;
      }
    }

    &:last-child {
      display: flex;
      justify-content: space-around;
    }
  }

  @media (min-width: 768px){
    height: 35rem;
    width: 50rem;
  }
`;
