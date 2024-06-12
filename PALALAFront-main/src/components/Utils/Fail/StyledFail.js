import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledFail = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffd9d9 ;
  border-radius: 3rem;
  width: 100%;
  color: #ff7f7f;

    >div{
        &:first-of-type{
            font-size: 5rem;
        }
    }

  .fail-file-info {
    display: flex;
    margin-top: 5rem;
    align-items: center;
    text-align: center;
    flex-direction: column;
    gap: 3rem;
    font-weight: bold;
  }
`;
