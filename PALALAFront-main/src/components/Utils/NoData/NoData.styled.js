import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledNoData = styled(motion.div)`
  background-color: #eeeeee;
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  height: ${(props) => props.height};

  > div {
    width: ${(props) => props.widthimg};
    display: flex;
    justify-content: center;
  }
`;
