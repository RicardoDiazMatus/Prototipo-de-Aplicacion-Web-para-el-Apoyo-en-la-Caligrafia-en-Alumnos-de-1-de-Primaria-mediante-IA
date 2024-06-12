import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledSaveModal = styled(motion.div)`
  display: flex;
  background-color: #ffffff;
  border-radius: 2rem;
  padding: 2rem;
  flex-direction: column;
  width: 90%;
  align-items: center;

  .save-modal-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      font-size: 4rem;
      color: #fe5d41;
    }
  }
  .save-modal-name {
    width: 100%;
    
  }

  .save-modal-name, .groups-add{
    input {
      appearance: none;
      height: 3.5rem;
      font-size: 1.2rem;
      width: 100%;
      border-style: none;
      border-radius: 0.5rem;
      
      border: 0.1rem solid rgba(254, 93, 65, 1);
      &:focus {
        outline: #ffbe0a solid 0.1rem;
      }
    }
  }

  .save-modal-groups {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 1rem 0 4rem 0;
    gap: 2rem;
    .groups-select {
      flex-basis: 50%;
    }
    .groups-add {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-basis: 50%;
    }
  }

  .save-modal-buttons{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  @media (min-width: 1024px){
    width: 50%;
  }
`;
