import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledCardNavigation = styled(motion.div)`
  width: 100%;
  > div {
    width: 100% !important;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 1rem;

    height: 13rem;
    cursor: pointer;
    color: ${(props) =>
      props.imgbackgroundcolor ? props.imgbackgroundcolor : "#000000"};
    background-color: ${(props) =>
      props.backgroundcolor ? props.backgroundcolor : "transparent"};
    > div {
      &:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 7rem;
        padding: 0.5rem;
        border-radius: 1rem;
        background-color: ${(props) =>
          props.imgbackgroundcolor ? props.imgbackgroundcolor : "transparent"};
        img {
          max-width: 90%;
          max-height: 90%;
        }
      }
      &:last-child {
      }
    }
  }

  @media (min-width: 720px) {
    > div {
      width: 26rem;
      height: 30rem;

      > div {
        &:first-child {
          width: 50%;
        }
      }
    }
  }
`;
