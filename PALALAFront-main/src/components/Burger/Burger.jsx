import React from "react";
import { StyledBurger } from "./Burget.styled";
import { bool, func } from "prop-types"
//par: value & function
function Burger({ open, setOpen, color="#CCCCCC" }){ 
    return(
        <StyledBurger open={open} onClick={() => setOpen(!open)} color={color}>
            <div />
            <div />
            <div />
        </StyledBurger>
    );
}

Burger.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
  };

export default Burger;

