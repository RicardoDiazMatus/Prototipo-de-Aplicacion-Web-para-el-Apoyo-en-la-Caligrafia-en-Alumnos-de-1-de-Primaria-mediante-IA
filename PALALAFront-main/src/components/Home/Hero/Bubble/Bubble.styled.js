import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledBubble = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .icon-ball {
    border-radius: 100%;
    width: fit-content;
    padding: 1rem;
    background-color: #ffbe0a;
  }
`;
