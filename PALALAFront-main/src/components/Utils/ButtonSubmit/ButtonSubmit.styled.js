import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledButtonSubmit = styled(motion.button)`
  background-color: ${(props) => props.styles?.backgroundColor || "#FE5D41"};
  width: ${(props) => props.styles?.width || "12rem"};
  height: ${(props) => props.styles?.height || "4rem"};
  border-radius: ${(props) => props.styles?.borderRadius || "3rem"};
  border: ${(props) => props.styles?.border || "none"};
  -webkit-box-shadow: 0px 10px 5px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 10px 5px -1px rgba(0, 0, 0, 0.1);
  box-shadow: ${(props) => props.styles?.boxshadow || "0px 10px 5px -1px rgba(0, 0, 0, 0.1)"};
  transition: background-color 0.3s ease-in-out;
  font-weight: ${(props) => props.styles?.fontWeight || "bold"};
  font-size: ${(props) => props.styles?.fontSize || "1.5rem"};
  padding: 0.5rem;
  text-decoration: none;
  color: ${(props) => props.styles?.color || "#FFFFFF"};
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.styles?.hoverBackgroundColor || "#db270d"};
      color: ${(props) =>
      props.styles?.hoverColor || "#ffffff"};
  }
`;
