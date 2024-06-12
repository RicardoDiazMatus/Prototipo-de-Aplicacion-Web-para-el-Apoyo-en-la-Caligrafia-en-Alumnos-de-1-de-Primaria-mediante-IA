import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledStudentStadistics = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 90%;

  margin: 2rem auto;

  .student-stadistics-title {
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;
      flex-direction: column;
      &:last-child {
        width: 10rem;
        img {
          max-height: 100%;
          max-width: 100%;
        }
      }
    }
  }
  .student-stadistics-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 100%;
    flex-grow: 1;
    .student-charts {
      width: 100%;
      height: 20rem;
    }
  }

  @media (min-width: 768px) {
    .student-stadistics-options {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      flex-grow: 1;
      .student-charts {
        width: 100%;
        height: 50rem;
      }
    }
  }
`;
