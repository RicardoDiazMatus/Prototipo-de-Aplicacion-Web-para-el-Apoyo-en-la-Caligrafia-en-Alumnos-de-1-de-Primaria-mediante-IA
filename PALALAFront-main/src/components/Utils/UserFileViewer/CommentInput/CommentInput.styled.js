import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledCommentInput = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  > div {
    &:first-of-type {
      width: 100%;
      textarea {
        border: none;
        width: 100%;
        font-size: 1.3rem;
        border-radius: 1rem;
        padding: 0.5rem;
        -webkit-box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 1);
        -moz-box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 1);
        box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 1);
      }
      p {
        color: #a8a8a8;
        text-align: right;
      }
    }
    &:last-of-type {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
  @media (min-width: 1024px) {
    gap: 2rem;
    > div {
      &:last-of-type {
        justify-content: flex-end;
        button{
            width: 40%;
        }
      }
    }
  }
`;
