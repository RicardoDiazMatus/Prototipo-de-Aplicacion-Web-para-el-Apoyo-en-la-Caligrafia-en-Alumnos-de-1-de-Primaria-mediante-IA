import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledLastFile = styled(motion.div)`
  width: 100%;
  display: flex;
  height: 30rem;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  .stadistics-file-card {
    display: flex;
    -webkit-box-shadow: 0px 0px 22px -4px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 22px -4px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 22px -4px rgba(0, 0, 0, 0.75);
    border-radius: 1rem;
    width: 100%;
    min-height: 13rem;
    lord-icon {
      width: 7rem;
      height: 100%;
    }
    div {
      &:first-of-type {
        border-radius: 1rem 0 0 1rem;
        background-color: #ffbe0a;
      }
      &:last-of-type {
        flex-grow: 1;
        padding: 1rem 1rem 1rem 2rem;
        > div {
          display: flex;
          padding: 1rem 0rem;
          background-color: transparent;
          justify-content: space-between;
        }
      }
    }
  }

  .stadistics-comment-card {
    display: flex;
    align-items: center;
    -webkit-box-shadow: 0px 0px 22px -4px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 22px -4px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 22px -4px rgba(0, 0, 0, 0.75);
    border-radius: 1rem;
    width: 100%;
    min-height: 13rem;
    > div{
      height: 10rem;
      display: flex;
      align-items: center;
      padding: 0rem 0.5rem;
      &:last-of-type{
        padding: 1rem 1rem 1rem 2rem;
        align-items: flex-start;
        justify-content: space-evenly;
        flex-direction: column;
      }
    }
    lord-icon {
        border-radius: 100%;
        background-color: #ffbe0a;
      width: 7rem;
      height: 7rem;
    }
  }
  @media (min-width: 768px){
    flex-direction: row;
    height: 20rem;
  }
`;
