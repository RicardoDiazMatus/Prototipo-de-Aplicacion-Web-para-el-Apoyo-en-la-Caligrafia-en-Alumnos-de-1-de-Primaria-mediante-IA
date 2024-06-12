import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledComments = styled(motion.div)`
  .sfv-comments-displayer {
    height: 20rem;
    border-radius: 1rem;
    overflow-y: scroll;
    border: 0.2rem #ccc solid;
    display: flex;
    flex-direction: column;
  }
  .comment{
    flex-shrink: 0;
    height: 5rem;
    padding-left: 1rem;
    font-weight: lighter;
    font-size: 1rem;
    border-bottom: 0.1rem solid #fe5d41;
    border-left: 0.6rem solid #fe5d41;
    display: flex;
    align-items: center;
  }
`;
