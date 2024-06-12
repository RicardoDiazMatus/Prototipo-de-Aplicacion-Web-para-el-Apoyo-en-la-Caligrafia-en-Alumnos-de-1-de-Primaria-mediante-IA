import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledCarrouselTests = styled(motion.div)`
  display: none;
  padding: 20rem 0;
  height: 100vh;
  background-color: #fe5d41;
  width: 100%;
  > div {
    margin: 0 auto;
    display: flex;
    gap: 10%;
    width: 90%;
    justify-content: space-between;
  }

  .circle-carrousel {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    > div {
      &:first-child {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50rem;
        height: 50rem;
        background-color: #fe5d41;
        border: #ffffff dashed 0.7rem;
        border-radius: 100%;
      }

      &:last-child {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffbe0a;
        width: 40rem;
        height: 40rem;
        border-radius: 100%;
      }
    }
  }

  .info-carrousel {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    width: 100%;
    gap: 3rem;
    > div {
      &:first-child {
        display: flex;
        align-items: center;
        width: 40rem;
        flex-basis: 70%;
        background-color: #ffffff;
        padding: 2rem;
        border-radius: 3rem;
        img {
          border-radius: 3rem;
        }
      }

      &:last-child {
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
        flex-basis: 20%;
        color: #ffffff;
      }
    }
  }
  @media (min-width: 768px) {
    display: flex;
  }
`;
