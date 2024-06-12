import { styled } from "styled-components";
import { motion } from "framer-motion";
export const StyledCarrouselSelection = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  position: relative;

  .next,
  .prev {
    position: absolute;
    cursor: pointer;
    font-weight: bold;
    font-size: 3rem;
    color: #fe5d41;
    z-index: 2;
  }

  .next {
    right: -2rem;
  }

  .prev {
    left: -2rem;
  }

  img {
    position: absolute;
    max-height: 100%;
    max-width: 90%;
  }
`;
