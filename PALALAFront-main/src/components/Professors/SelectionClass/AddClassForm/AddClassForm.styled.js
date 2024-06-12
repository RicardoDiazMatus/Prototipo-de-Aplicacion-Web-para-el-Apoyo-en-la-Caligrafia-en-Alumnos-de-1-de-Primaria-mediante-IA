import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledAddClassForm = styled(motion.div)`
    width: 34rem;
    height: 40rem;
    background-color: #FFFFFF;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
.class-input-icons{
    width: 90%;
    &:last-of-type{
        display: flex;
        justify-content: space-around;
    }
}
  .class-input-field {
    color: #aaaaaa;
    border: none;
    border-bottom: 0.3rem solid #aaaaaa;
    width: 100%;
    font-size: 1.4rem;
    padding: 1rem 0rem;
    outline: none;
  }

  .inactive-input{
    background-color: #e6e6e6;
  }

  @media (min-width: 768px){
    width: 50rem;
  }
`;
