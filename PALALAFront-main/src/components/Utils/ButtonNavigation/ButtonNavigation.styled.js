import { styled } from "styled-components";
import { motion } from "framer-motion";

export const StyledButtonNavigation = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.styles?.backgroundColor || "#FE5D41"};
  width: ${(props) => props.styles?.width || "12rem"};
  height: ${(props) => props.styles?.height || "4rem"};
  border-radius: ${(props) => props.styles?.borderRadius || "3rem"};
  border: ${(props) => props.styles?.border || "none"};
  -webkit-box-shadow: 0px 10px 5px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 10px 5px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 10px 5px -1px rgba(0, 0, 0, 0.1);
  font-weight: ${(props) => props.styles?.fontWeight || "bold"};
  font-size: ${(props) => props.styles?.fontSize || "1.5rem"};
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.styles?.hoverBackgroundColor || "#db270d"};
      .navigation-link{
        color: ${(props) => props.styles?.hoverColor || "#ffffff"};
      }
  }
  .navigation-link {
    font-weight: bold;
    text-decoration: none;
    color: ${(props) => props.styles?.color || "#FFFFFF"};
  }
`;
