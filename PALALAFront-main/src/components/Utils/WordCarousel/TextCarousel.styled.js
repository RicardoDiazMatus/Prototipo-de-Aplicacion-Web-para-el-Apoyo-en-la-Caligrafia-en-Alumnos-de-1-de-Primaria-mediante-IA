import { styled } from "styled-components";
import { motion } from "framer-motion";
export const StyledTextCarousel = styled(motion.div)`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 100%;
  color: ${(props) => props.color};

  > div {
    width: 100%;
    justify-content: center;
    display: flex;
    position: absolute;
  }
`;
