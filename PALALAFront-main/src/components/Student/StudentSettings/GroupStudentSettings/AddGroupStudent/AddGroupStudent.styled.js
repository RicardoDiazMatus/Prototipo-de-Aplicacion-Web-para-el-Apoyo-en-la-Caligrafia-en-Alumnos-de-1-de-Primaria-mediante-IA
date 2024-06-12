import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledAddGroupStudent = styled(motion.div)`
      background-color: #ffffff;
      border-radius: 1rem;
      padding: 5rem 3rem;
      min-height: 30rem;
      width: 90%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;

        input[type="text"] {
          font-size: 1.5rem;
          &:focus {
            border-color: #fe5d41;
            box-shadow: 0 0 0.8rem #fe5d41;
            outline: 0 none;
          }
        }
        &:first-child {
          color: #fe5d41;
          flex-direction: row;
          font-size: 5rem;
          font-weight: bold;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 7rem;
            height: 7rem;
          }
        }

        &:last-child {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      }
      @media (min-width: 768px) {
        width: 50%;
        min-height: 40rem;
      }
    `;