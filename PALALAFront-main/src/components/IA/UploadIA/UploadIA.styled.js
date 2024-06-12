import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledUploadIA = styled(motion.form)`
  margin-top: 1rem;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40rem;
    justify-content: space-evenly;
    border: 0.2rem dashed #fe5d41;
    border-radius: 1rem;
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;

    div:first-of-type {
      display: flex;
      align-items: center;
      color: #fe5d41;
      font-weight: bold;
      p {
        font-size: 2rem;
      }
    }

    .svg-file-icon {
      width: 10rem;
      height: 10rem;
      .fill1{
          transition:  fill 0.3s ease-in-out;

      }
    }

    &:hover {
      background-color: #ffbeb3;
      .svg-file-icon {
        width: 10rem;
        height: 10rem;
        .fill1 {
          fill: #ffbeb3;
        }
      }
    }
  }

  input[type="file"] {
    display: none;
  }
`;
