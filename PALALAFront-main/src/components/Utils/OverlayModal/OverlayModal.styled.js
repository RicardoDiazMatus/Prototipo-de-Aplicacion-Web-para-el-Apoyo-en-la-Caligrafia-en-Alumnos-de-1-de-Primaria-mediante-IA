import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledOverlayModal = styled(motion.div)`
  content: "";
  position: absolute;
  top: ${(props) => props.topposition ? props.topposition+"px" : 0};
  left: 0;
  z-index: 4;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    //width: 10rem;
    //height: 10rem;
  }

  .exit-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 2rem;
    right: 2rem;
    background-color: #ffbe0a;
    border-radius: 100%;
    width: 3rem;
    height: 3rem;
    -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    &:hover{
      cursor: pointer;
    }
  }
`;
